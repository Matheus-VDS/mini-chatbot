// ==========================================
// Função para chamar APIs de IA
// ==========================================
async function callModel({ apiKey, model, prompt }) {
  const isGemini = model.startsWith('gemini');

  if (isGemini) {
    // Endpoint oficial do Gemini
    const url = `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${encodeURIComponent(apiKey)}`;

    const geminiBody = {
      contents: [{
        role: "user",
        parts: [{ text: prompt }]
      }]
    };

    const res = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(geminiBody)
    });

    if (!res.ok) {
      const text = await res.text();
      throw new Error(`Erro HTTP ${res.status}: ${text.slice(0, 400)}`);
    }

    const data = await res.json();
    // Resposta vem em candidates[0].content.parts[0].text
    const content = data?.candidates?.[0]?.content?.parts?.[0]?.text || "";
    return content.trim();
  }

  // ========================
  // Caso seja OpenAI normal
  // ========================
  const endpoint = "https://api.openai.com/v1/chat/completions";

  const body = {
    model,
    messages: [
      { role: "system", content: "Você é um assistente útil e conciso. Responda em português do Brasil quando o usuário falar em PT-BR." },
      { role: "user", content: prompt }
    ],
    temperature: 0.7
  };

  const res = await fetch(endpoint, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${apiKey}`
    },
    body: JSON.stringify(body)
  });

  if (!res.ok) {
    const text = await res.text();
    throw new Error(`Erro HTTP ${res.status}: ${text.slice(0, 400)}`);
  }

  const data = await res.json();
  const content = data?.choices?.[0]?.message?.content || "";
  return content.trim();
}

// ==========================================
// Elementos da DOM
// ==========================================
const elements = {
  apiKey: document.getElementById('apiKey'),
  model: document.getElementById('model'),
  question: document.getElementById('question'),
  askBtn: document.getElementById('askBtn'),
  clearBtn: document.getElementById('clearBtn'),
  copyBtn: document.getElementById('copyBtn'),
  themeToggle: document.getElementById('themeToggle'),
  status: document.getElementById('status'),
  resultCard: document.getElementById('resultCard'),
  lastQuestion: document.getElementById('lastQuestion'),
  answer: document.getElementById('answer'),
  errorBox: document.getElementById('errorBox'),
  charCount: document.getElementById('charCount')
};

// ==========================================
// Estado da aplicação
// ==========================================
let lastAnswer = '';

// ==========================================
// Utilitários
// ==========================================
function showStatus(message) {
  elements.status.textContent = message;
}

function showError(message) {
  elements.errorBox.textContent = message;
  elements.errorBox.classList.remove('hidden');
  elements.resultCard.classList.add('hidden');
}

function hideError() {
  elements.errorBox.classList.add('hidden');
}

function showResult(question, answer) {
  elements.lastQuestion.textContent = question;
  elements.answer.textContent = answer;
  elements.resultCard.classList.remove('hidden');
  elements.copyBtn.disabled = false;
  lastAnswer = answer;
}

function showToast(message) {
  const toast = document.createElement('div');
  toast.className = 'toast';
  toast.textContent = message;
  document.body.appendChild(toast);
  
  // Trigger animation
  setTimeout(() => toast.classList.add('show'), 10);
  
  // Remove after 3 seconds
  setTimeout(() => {
    toast.classList.remove('show');
    setTimeout(() => document.body.removeChild(toast), 250);
  }, 3000);
}

function updateCharCount() {
  const count = elements.question.value.length;
  elements.charCount.textContent = count.toLocaleString();
}

// ==========================================
// Local Storage
// ==========================================
function loadSettings() {
  const savedApiKey = localStorage.getItem('aiAssistant_apiKey');
  const savedModel = localStorage.getItem('aiAssistant_model');
  const savedTheme = localStorage.getItem('aiAssistant_theme');

  if (savedApiKey) elements.apiKey.value = savedApiKey;
  if (savedModel) elements.model.value = savedModel;
  if (savedTheme === 'light') document.documentElement.classList.add('light');
}

function saveSettings() {
  localStorage.setItem('aiAssistant_apiKey', elements.apiKey.value);
  localStorage.setItem('aiAssistant_model', elements.model.value);
}

// ==========================================
// Event Handlers
// ==========================================
async function handleAsk() {
  const apiKey = elements.apiKey.value.trim();
  const model = elements.model.value;
  const question = elements.question.value.trim();

  // Validações
  if (!apiKey) {
    showError('Por favor, insira sua API Key.');
    return;
  }

  if (!question) {
    showError('Por favor, digite uma pergunta.');
    return;
  }

  // Salvar configurações
  saveSettings();
  hideError();

  // Estado de carregamento
  elements.askBtn.disabled = true;
  elements.askBtn.innerHTML = `
    <svg class="icon animate-spin" viewBox="0 0 24 24" aria-hidden="true">
      <circle cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4" fill="none" opacity="0.25"></circle>
      <path fill="currentColor" opacity="0.75" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
    </svg>
    Gerando...
  `;
  
  showStatus('Enviando pergunta para a IA...');

  try {
    const answer = await callModel({ apiKey, model, prompt: question });
    
    if (!answer) {
      throw new Error('A IA retornou uma resposta vazia.');
    }

    showResult(question, answer);
    showStatus('Resposta gerada com sucesso!');
    
  } catch (error) {
    console.error('Erro ao chamar a IA:', error);
    showError(`Erro: ${error.message}`);
    showStatus('');
  } finally {
    // Restaurar botão
    elements.askBtn.disabled = false;
    elements.askBtn.innerHTML = `
      <svg class="icon" viewBox="0 0 24 24" aria-hidden="true">
        <path d="M2 21l21-9L2 3v7l15 2-15 2v7z"></path>
      </svg>
      Perguntar
    `;
  }
}

function handleClear() {
  elements.question.value = '';
  elements.resultCard.classList.add('hidden');
  elements.copyBtn.disabled = true;
  hideError();
  showStatus('');
  updateCharCount();
  elements.question.focus();
}

async function handleCopy() {
  if (!lastAnswer) return;

  try {
    await navigator.clipboard.writeText(lastAnswer);
    showToast('Resposta copiada para a área de transferência!');
  } catch (error) {
    console.error('Erro ao copiar:', error);
    showToast('Erro ao copiar. Tente selecionar o texto manualmente.');
  }
}

function handleThemeToggle() {
  const isLight = document.documentElement.classList.toggle('light');
  localStorage.setItem('aiAssistant_theme', isLight ? 'light' : 'dark');
  
  const icon = elements.themeToggle.querySelector('span[aria-hidden="true"]');
  icon.textContent = isLight ? '☀️' : '🌗';
}

// ==========================================
// Event Listeners
// ==========================================
document.addEventListener('DOMContentLoaded', function() {
  // Carregar configurações salvas
  loadSettings();
  
  // Event listeners dos botões
  elements.askBtn.addEventListener('click', handleAsk);
  elements.clearBtn.addEventListener('click', handleClear);
  elements.copyBtn.addEventListener('click', handleCopy);
  elements.themeToggle.addEventListener('click', handleThemeToggle);
  
  // Contador de caracteres
  elements.question.addEventListener('input', updateCharCount);
  
  // Atalho Ctrl+Enter para enviar
  elements.question.addEventListener('keydown', function(e) {
    if (e.ctrlKey && e.key === 'Enter') {
      e.preventDefault();
      handleAsk();
    }
  });

  // Salvar configurações quando mudarem
  elements.apiKey.addEventListener('input', saveSettings);
  elements.model.addEventListener('change', saveSettings);
  
  // Inicializar contador de caracteres
  updateCharCount();
  
  console.log('Assistente de IA carregado com sucesso!');
});

// Adicionar CSS para animação de loading
const style = document.createElement('style');
style.textContent = `
  .animate-spin {
    animation: spin 1s linear infinite;
  }
  
  @keyframes spin {
    from { transform: rotate(0deg); }
    to { transform: rotate(360deg); }
  }
`;
document.head.appendChild(style);
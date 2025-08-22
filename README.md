# 🤖 Mini Chatbot IA

Um chatbot simples e intuitivo que utiliza a API da OpenAI para responder perguntas dos usuários. Interface clean e responsiva construída com HTML, CSS e JavaScript vanilla.

## ✨ Funcionalidades

- 💬 Interface de chat simples e intuitiva
- 🔑 Configuração segura da API Key
- 🧠 Seleção de modelos de IA (GPT-4.1 Nano)
- ⚡ Respostas em tempo real
- 🎨 Design responsivo e moderno
- 🚨 Tratamento completo de erros
- 🔄 Estados visuais de carregamento

## 🚀 Como usar

1. **Clone o repositório**
   ```bash
   git clone https://github.com/Matheus-VDS/mini-chatbot.git
   cd mini-chatbot
   ```

2. **Abra o arquivo `index.html`**
   - Basta abrir o arquivo diretamente no navegador
   - Ou use um servidor local como Live Server (VS Code)

3. **Configure sua API Key**
   - Insira sua chave da API da OpenAI no campo dedicado
   - A chave é armazenada temporariamente apenas durante a sessão

4. **Comece a conversar**
   - Digite sua pergunta no campo de texto
   - Clique em "Perguntar" e aguarde a resposta da IA

## 🛠️ Tecnologias utilizadas

- **HTML5** - Estrutura da aplicação
- **CSS3** - Estilização e layout responsivo
- **JavaScript ES6+** - Lógica da aplicação e integração com API
- **OpenAI API** - Processamento de linguagem natural

## 📁 Estrutura do projeto

```
mini-chatbot/
├── index.html      # Estrutura principal da aplicação
├── style.css       # Estilos e layout responsivo
└── script.js       # Lógica da aplicação e integração com API
```

## ⚙️ Requisitos funcionais implementados

### ✅ Interface completa
- Cabeçalho com título e configurações
- Campo seguro para API Key
- Seleção de modelo de IA
- Área principal de interação

### ✅ Sistema de perguntas e respostas
- Input responsivo para perguntas
- Botão de envio com feedback visual
- Área dedicada para exibição das respostas

### ✅ Estados visuais
- Loading animado durante processamento
- Botões desabilitados durante carregamento
- Feedback visual claro para todas as ações

### ✅ Tratamento de erros
- Validação de API Key obrigatória
- Validação de pergunta não vazia
- Mensagens de erro amigáveis
- Tratamento de erros de conexão

### ✅ Integração robusta com API
- Requisições POST configuradas corretamente
- Uso de async/await para operações assíncronas
- Processamento adequado das respostas

## 🔧 Configuração da API

Para usar este chatbot, você precisará de uma chave da API da OpenAI:

1. Acesse [platform.openai.com](https://platform.openai.com)
2. Crie uma conta ou faça login
3. Vá para "API Keys" e gere uma nova chave
4. Cole a chave no campo correspondente na aplicação

> **⚠️ Importante**: Mantenha sua API Key segura e nunca a compartilhe publicamente.

## 📱 Responsividade

A aplicação foi desenvolvida com foco em:
- Layout responsivo que se adapta a diferentes tamanhos de tela
- Interface otimizada para desktop
- Elementos centralizados e bem organizados
- Boa usabilidade em dispositivos móveis

## 🤝 Contribuição

Contribuições são bem-vindas! Sinta-se à vontade para:

1. Fazer fork do projeto
2. Criar uma branch para sua feature (`git checkout -b feature/AmazingFeature`)
3. Commit suas mudanças (`git commit -m 'Add some AmazingFeature'`)
4. Push para a branch (`git push origin feature/AmazingFeature`)
5. Abrir um Pull Request

import { PerguntaIA } from "./types.ts";

const askBtn = document.getElementById("askBtn");
const inputPergunta = document.getElementById("userInput");
const apiKeyInput = document.getElementById("apiKey");
const modelSelect = document.getElementById("modelSelect");
const respostaDiv = document.getElementById("response");
const loadingDiv = document.getElementById("loading");
const errorDiv = document.getElementById("error");

askBtn.addEventListener("click", async () => {
  const pergunta = inputPergunta.value.trim();
  const apiKey = apiKeyInput.value.trim();
  const modelo = modelSelect.value;

  respostaDiv.classList.add("hidden");
  errorDiv.classList.add("hidden");

  if (!apiKey) {
    errorDiv.textContent = "Insira sua API Key!";
    errorDiv.classList.remove("hidden");
    return;
  }
  if (!pergunta) {
    errorDiv.textContent = "Digite uma pergunta!";
    errorDiv.classList.remove("hidden");
    return;
  }

  askBtn.disabled = true;
  loadingDiv.classList.remove("hidden");

  try {
    const resposta = await PerguntaIA(pergunta, apiKey, modelo);
    respostaDiv.textContent = resposta;
    respostaDiv.classList.remove("hidden");
  } catch (err) {
    errorDiv.textContent = "Erro ao conectar com a IA.";
    errorDiv.classList.remove("hidden");
  } finally {
    askBtn.disabled = false;
    loadingDiv.classList.add("hidden");
  }
});
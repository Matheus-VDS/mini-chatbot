export async function PerguntaIA(pergunta: string, apiKey: string, modelo: string): Promise<string> {
  const resposta = await fetch("https://api.openai.com/v1/chat/completions", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${apiKey}`
    },
    body: JSON.stringify({
      model: modelo,
      messages: [{ role: "user", content: pergunta }]
    })
  });

  if (!resposta.ok) throw new Error("Erro na API");

  const dados = await resposta.json();
  return dados.choices[0].message.content;
}
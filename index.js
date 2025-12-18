const http = require("http");
const WebSocket = require("ws");

// Servidor HTTP (necessário na Discloud)
const server = http.createServer((req, res) => {
  res.writeHead(200, { "Content-Type": "text/plain" });
  res.end("WebSocket online");
});

// WebSocket usando o mesmo servidor
const wss = new WebSocket.Server({ server });

wss.on("connection", (ws) => {
  console.log("Cliente conectado");

  ws.on("message", (data) => {
    const msg = data.toString();
    console.log("Mensagem recebida:", msg);

    // Resposta padrão em JSON
    ws.send(JSON.stringify({
      ok: true,
      recebido: msg,
      timestamp: Date.now()
    }));
  });

  ws.on("close", () => {
    console.log("Cliente desconectou");
  });
});

// Porta que a Discloud fornece
const PORT = process.env.PORT || 8080;
server.listen(PORT, () => {
  console.log("Servidor rodando na porta", PORT);
});

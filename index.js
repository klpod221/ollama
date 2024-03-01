const express = require("express");
const { Ollama } = require("@langchain/community/llms/ollama");

const ollama = new Ollama({
  baseUrl: "http://localhost:11434",
  model: "llama2",
});

const app = express();
app.use(express.json());

app.get("/", async (req, res) => {
  res.sendFile(__dirname + "/index.html");
});

// api that takes a question and returns an answer
app.post("/ask", async (req, res) => {
  const question = req.body.question;

  const answer = await ollama.call(question);

  return res.json({ answer });
});

app.listen(3000, () => {
  console.log("Server is running on port 3000");
});

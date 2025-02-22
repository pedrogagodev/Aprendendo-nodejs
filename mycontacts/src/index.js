import("express-async-errors");
import express from "express";
import { router } from "./routes.js";

const app = express();

console.log("Iniciando o servidor...");

app.use(express.json());

app.get('/test', (req, res) => {
    res.json({ message: 'Tudo certo!' });
  });
  
app.use(router);
app.use((error, request, response, next) => {
    console.log("### Express Async")
	console.log(error);
    response.status(500).json({ error: "Internal Server Error" })
});

app.listen(3000, () => console.log("Server started in http://localhost:3000"));

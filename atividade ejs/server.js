const port = 8080;

//Express
const express = require("express");
const app = express();
app.set('view engine', 'ejs');
app.use(express.urlencoded({ extended: true }));

app.get("/index", (request, response) => {
response.render("index");
});

app.post("/informacoes", (request, response) => {
    const dados = request.body;
    console.log(dados)
    response.render("informacoes", {...dados });
});

app.use((request, response, next) => {
response.status(404).send("<h1>Página não encontrada.</h1>");
})

app.listen(port, () => {
console.log(`Servidor funcionando na porta: ${port}`);
});

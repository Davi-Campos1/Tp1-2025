const express = require('express');
const app = express();
const port = 3000;

app.set('view engine', 'ejs');

app.use(express.urlencoded({ extended: true }));

app.get('/', (req, res) => {
    res.render('index');
});


app.post('/enviar', (req, res) => {
    const nome = req.body.nomezinho; 
    const sobrenome = req.body.sobrenome;
    const cidade = req.body.cidade;

    const dadosUsuario = `${nome} ${sobrenome} de ${cidade}`;

    res.render('resposta', { dados: dadosUsuario });
});

app.listen(port, () => {
    console.log(`Servidor rodando em http://localhost:${port}`);
});

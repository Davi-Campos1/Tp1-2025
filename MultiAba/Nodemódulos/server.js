const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;

app.set('view engine', 'ejs'); 
app.set('views', './views');

app.get('/', (req, res) => {
    res.render('index', { 
        pageTitle: 'Página Inicial',
    });
});

app.get('/sobre', (req, res) => {
    res.render('sobre', { 
        pageTitle: 'Sobre a Aplicação',
        content: 'Este é um exemplo de servidor Express com EJS para renderizar múltiplos arquivos HTML conectados.'
    });
});

app.get('/contato', (req, res) => {
    res.render('contato', { 
        pageTitle: 'Entre em Contato',
    });
});

app.listen(PORT, () => {
    console.log(`Servidor rodando em http://localhost:${PORT}`);

});

const port = 8000;
const http = require('http');

server = http.createServer((req, res) => {

    const dataHoraAtual = new Date();
    const mensagem = `A data e hora atuais do servidor são: ${dataHoraAtual.toLocaleString('pt-BR')}`;
    res.writeHead(200, {
        "Content-Type": "text/html"
    });

    res.write(`<h1>${mensagem}</h1>`);
    res.end();
})
server.listen(port, () => {
    console.log(`Servidor funcionando na porta: ${port}`);
});

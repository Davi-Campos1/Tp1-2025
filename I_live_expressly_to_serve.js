const express = require('express')
const app = express()
app.use(express.urlencoded({ extended: true }))

app.get('/', (req, res) => {
    res.send('Página inicial')
})

app.get('/sobre', (req, res) => {
    res.send('Servidor Criado com Express!')
})

app.get('/hora', (req, res) => {
    const date = new Date()
    const horas = date.getHours()
    const minutos = date.getMinutes()

    res.send('hora atual: ' + horas + ":" + minutos);
})

app.get('/saudacao/:nome', (req, res) => {

    res.send('Olá, ' + req.params.nome)
})

app.listen(3000, () => {
    console.log("rodando na porta 3000")
})

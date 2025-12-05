const express = require('express');
const cookieParser = require('cookie-parser');
const app = express();
const port = 3000;


app.use(express.urlencoded({ extended: true })); 
app.use(cookieParser()); 


const activeGames = {};


const generateSessionId = () => Math.random().toString(36).substring(2) + Date.now().toString(36);


const renderPage = (message = null, type = 'info', lastGuess = '') => {
    let messageHtml = '';
    
    if (message) {
        const colorClass = type === 'success' ? 'bg-green-100 text-green-700 border-green-400' : 
                           type === 'error' ? 'bg-red-100 text-red-700 border-red-400' : 
                           'bg-blue-100 text-blue-700 border-blue-400';
        
        messageHtml = `
            <div class="p-4 mb-4 border rounded-lg ${colorClass}">
                <p class="font-bold">${message}</p>
            </div>
        `;
    }

    return `
    <!DOCTYPE html>
    <html lang="pt-BR">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Adivinhe o Número</title>
        <script src="https://cdn.tailwindcss.com"></script>
    </head>
    <body class="bg-gray-100 min-h-screen flex items-center justify-center">
        <div class="bg-white p-8 rounded-lg shadow-lg max-w-md w-full text-center">
            <h1 class="text-3xl font-bold text-gray-800 mb-2">Adivinhe o Número</h1>
            <p class="text-gray-600 mb-6">Eu pensei em um número entre <span class="font-bold">1 e 100</span>.</p>
            
            ${messageHtml}

            <form action="/" method="POST" class="space-y-4">
                <div>
                    <input type="number" name="palpite" placeholder="Seu palpite (1-100)" required min="1" max="100" value="${lastGuess}"
                        class="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 text-center text-lg">
                </div>
                <button type="submit" 
                    class="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded transition duration-200">
                    Enviar Palpite
                </button>
            </form>
            
            ${type === 'success' ? 
                '<div class="mt-4"><a href="/" class="text-blue-500 hover:underline">Jogar Novamente</a></div>' : ''}
        </div>
    </body>
    </html>
    `;
};


app.get('/', (req, res) => {
    let userId = req.cookies.userId;

    
    if (!userId || !activeGames[userId]) {
        userId = generateSessionId();
        const secretNumber = Math.floor(Math.random() * 100) + 1;
        
        
        activeGames[userId] = secretNumber;
        
      
        res.cookie('userId', userId, { httpOnly: true });
        
        console.log(`Novo jogo iniciado. Usuário: ${userId}, Número: ${secretNumber}`); 
    }

    res.send(renderPage());
});


app.post('/', (req, res) => {
    const userId = req.cookies.userId;
    const palpite = parseInt(req.body.palpite);

   
    if (!userId || activeGames[userId] === undefined) {
        return res.redirect('/');
    }

    const secretNumber = activeGames[userId];
    let message = '';
    let type = 'error';

    
    if (isNaN(palpite)) {
        message = 'Por favor, insira um número válido.';
    } else if (palpite === secretNumber) {
        message = `Parabéns! Você acertou. O número era ${secretNumber}. O jogo foi reiniciado.`;
        type = 'success';
        
       
        activeGames[userId] = Math.floor(Math.random() * 100) + 1;
        console.log(`Usuário ${userId} ganhou. Novo número: ${activeGames[userId]}`);
    } else if (palpite > secretNumber) {
        message = `Você chutou ${palpite}. É muito ALTO! Tente um número menor.`;
    } else {
        message = `Você chutou ${palpite}. É muito BAIXO! Tente um número maior.`;
    }

    
    res.send(renderPage(message, type, type === 'success' ? '' : palpite));
});

app.listen(port, () => {
    console.log(`Servidor rodando em http://localhost:${port}`);
});

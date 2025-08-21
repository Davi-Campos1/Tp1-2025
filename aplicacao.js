const readline = require('readline');

// Cria a interface para ler entradas do usuário
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

// Função para solicitar e validar entrada numérica
function solicitarValor(mensagem, callback) {
    rl.question(mensagem, (input) => {
        const valor = parseFloat(input.replace(',', '.'));

        if (isNaN(valor) || valor <= 0) {
            console.log('Por favor, informe um número válido maior que zero.\n');
            solicitarValor(mensagem, callback); // Solicita novamente
        } else {
            callback(valor);
        }
    });
}

// Função para calcular e exibir os rendimentos
function calcularRendimentos(saldoInicial, taxa, meses) {
    let saldo = saldoInicial;

    console.log(); // Linha em branco

    for (let i = 1; i <= meses; i++) {
        const rendimento = saldo * (taxa / 100);
        saldo += rendimento;

        console.log(`No ${i}º mês a aplicação rendeu R$ ${rendimento.toFixed(2)} e o total aplicado passou a ser R$ ${saldo.toFixed(2)}`);
    }

    console.log(`O saldo final da aplicação será de R$ ${saldo.toFixed(2)}\n`);
}

// Fluxo principal
function iniciar() {
    solicitarValor('Informe o saldo inicial (ex: 1000): ', (saldo) => {
        solicitarValor('Informe a taxa de rendimento mensal (%) (ex: 1.5): ', (taxa) => {
            solicitarValor('Informe a quantidade de meses da aplicação: ', (meses) => {
                calcularRendimentos(saldo, taxa, meses);
                rl.close();
            });
        });
    });
}

iniciar();

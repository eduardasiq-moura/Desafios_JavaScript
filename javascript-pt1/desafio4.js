// Implemente um jogo simples de "Pedra, Papel, Tesoura" onde o usuário joga contra o computador.

const readline = require("readline");

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

function jogar() {
    let opcoes = ["pedra", "papel", "tesoura"];
    
    rl.question("Escolha pedra, papel ou tesoura: ", (usuario) => {
        usuario = usuario.trim().toLowerCase();
        
        if (!opcoes.includes(usuario)) {
            console.log("Escolha inválida! Tente novamente.");
            rl.close();
            return;
        }
        
        let numeroAleatorio = Math.floor(Math.random() * 3);
        let computador = opcoes[numeroAleatorio];
        
        console.log("Computador escolheu: " + computador);
        
        if (usuario === computador) {
            console.log("Empate!");
        } else if ((usuario === "pedra" && computador === "tesoura") || 
                   (usuario === "tesoura" && computador === "papel") || 
                   (usuario === "papel" && computador === "pedra")) {
            console.log("Você ganhou!");
        } else {
            console.log("Você perdeu!");
        }
        
        rl.close();
    });
}

jogar();

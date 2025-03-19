// Crie uma função que verifica se um número é primo.

const num = 6;

function primo(num) {
    if (isNaN(num) || num < 2 || !Number.isInteger(num)) {
        return "valor invalido detectado";
    }

    for (let i = 2; i <= Math.sqrt(num); i++) {
        if (num % i === 0) {
            return false;
        }
    }
    return true;
}


console.log('Número primo? ' + primo(num));  // Testa com o número 2

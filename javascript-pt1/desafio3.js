// Uma palavra ou frase é considerada um palíndromo quando pode ser lida da mesma forma de trás para frente, ignorando espaços e acentos

const str = 'a base do teto desaba';

function verificacao(str) {
   
    const verf = str
        .toLowerCase()
        .normalize('NFD')
        .replace(/[\u0300-\u036f\s]/g, '')

    return verf == [...verf].reverse().join('')
}

console.log(verificacao(str)); 

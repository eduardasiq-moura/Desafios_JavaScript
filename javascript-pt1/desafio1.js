// Escreva uma função que recebe um array de números e retorna a soma de todos os seus elementos.

    const num = [3, -1]

    function soma(num){

        if (!num.every(n => typeof n == 'number')) {
            return 'Valor inválido detectado';}

        return num.reduce((acc, num) => acc + num, 0)
    }

    console.log('Números: ' + num)
    console.log('Soma dos Números: ' + soma(num))

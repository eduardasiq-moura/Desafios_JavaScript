//Criar uma API simples usando apenas o módulo http do Node.js, sem utilizar frameworks como Express.

const { createServer } = require('node:http'); 
const { URL } = require('node:url');

const hostname = '127.0.0.1'; 
const port = 3000; 

let counter = 0; 

const isPrime = (num) => {
    if (num < 2) return false;
    for (let i = 2; i <= Math.sqrt(num); i++) {
        if (num % i === 0) return false;
    }
    return true;
};

const server = createServer((request, response) => { 
    response.setHeader('Content-Type', 'application/json');

    try {
        const url = new URL(request.url, `http://${hostname}:${port}`);

        if (request.method === 'GET' && url.pathname === '/health-check') {
            response.statusCode = 200;
            response.end(JSON.stringify({ Success: true, 
                timestamp: new Date().toISOString() 
            }));
            return;
        }

        if (request.method === 'GET' && url.pathname === '/is-prime-number') {
            const numberParam = url.searchParams.get('number');
            const number = Number(numberParam);

            if (!numberParam || isNaN(number) || number < 1) {
                response.statusCode = 400;
                response.end(JSON.stringify({ error: "Invalid input" }));
                return;
            }

            response.statusCode = 200;
            response.end(JSON.stringify({ isPrime: isPrime(number) }));
            return;
        }

        if (request.method === 'POST' && url.pathname === '/count') {
            let body = '';

            request.on('data', (chunk) => {
                body += chunk;
            });

            request.on('end', () => {
                try {
                    const { incrementBy } = JSON.parse(body);

                    if (!Number.isInteger(incrementBy) || incrementBy < 1) {
                        response.statusCode = 400;
                        response.end(JSON.stringify({ error: "Invalid input" }));
                        return;
                    }

                    counter += incrementBy; // Incrementa o contador
                    response.statusCode = 200;
                    response.end(JSON.stringify({ counter }));
                } catch (error) {
                    response.statusCode = 400;
                    response.end(JSON.stringify({ error: "Invalid JSON format" }));
                }
            });

            return;
        }

        response.statusCode = 404;
        response.end(JSON.stringify({ error: "Rota não encontrada" }));

    } catch (error) {
        response.statusCode = 500;
        response.end(JSON.stringify({ error: "Erro interno do servidor" }));
    }
});

server.listen(port, hostname, () => {
    console.log(`Servidor rodando em http://${hostname}:${port}/`);
});

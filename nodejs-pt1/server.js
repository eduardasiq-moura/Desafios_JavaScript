const { createServer } = require('node:http'); // cria o servidor http
const { URL } = require('node:url'); // classe URL do módulo url para manipular URLs

const hostname = '127.0.0.1'; //definindo servidor
const port = 3000; // definindo porta

const server = createServer((request, response) => { //criando servidor - req(dados de requisição) - res(manda a resposta)
    response.setHeader('Content-Type', 'application/json');//define que as res vão ser JSON

    try {
        const url = new URL(request.url, `http://${hostname}:${port}`);//cria o obj URL

        if (request.method === 'GET' && url.pathname === '/hello') {
            const queryParams = Object.fromEntries(url.searchParams.entries());

            response.statusCode = 200;
            response.end(JSON.stringify({ message: `Hello ${queryParams.name || 'stranger'}` }));
        } else if (request.method === 'POST' && url.pathname === '/goodbye') {
            let body = '';

            request.on('data', chunk => {
                body += chunk.toString();
            });

            request.on('end', () => {
                try {
                    const parsedBody = body.length > 0 ? JSON.parse(body) : {};

                    response.statusCode = 200;
                    response.end(JSON.stringify({ message: `Goodbye ${parsedBody.name || 'stranger'}` }));
                } catch (error) {
                    response.statusCode = 400;
                    response.end(JSON.stringify({ error: "Invalid JSON body" }));
                }
            });

        } else {
            response.statusCode = 404;
            response.end(JSON.stringify({ error: 'Route not found' }));
        }
    } catch (error) {
        console.error(error)
        response.statusCode = 500;
        response.end(JSON.stringify({ error: 'Internal Server Error' }));
    }
});

server.listen(port, hostname, () => {
    console.log(`Server running at http://${hostname}:${port}/`);
});
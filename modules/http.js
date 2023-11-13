const http = require('http')

const port = 3000;

const server = http.createServer((req,res) =>{
	if(req.url == '/'){
		res.writeHead(200,{'Content-Type':'text/html'});
		res.end('<h1>Página Home</h1>');
	}

	if(req.url == '/users'){
		const users = 
		[{
			name: 'Welker',
			email: 'welker@icloud.com'
		},
		{
			name: 'Joe',
			email: 'joe@gmail.com'
		}];

		res.writeHead(200,{"Content-Type":"application/json"});
		res.end(JSON.stringify(users))
	}
});

server.listen(port,() =>console.log(`Rodando na porta ${port}`))
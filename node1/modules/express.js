const express = require('express')

const app = express()

app.get('/',(req,res)=>{
	res.contentType('application/html');
	res.status(200).send('<h1>Home express</h1>');
});

app.get('/users',(req,res) =>{
	const users = [
		{
			name: 'Welker',
			email: 'welker@icloud.com'
		},
		{
			name: 'Joe',
			email: 'joe@gmail.com'
		}
	];

	res.status(200).json(users)
});

const port = 3000;

app.listen(port,() => console.log('rodando com express'));
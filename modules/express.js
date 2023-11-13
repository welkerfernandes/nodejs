const express = require('express')

const app = express()

app.get('/',(req,res)=>{
	res.status(200).send('<h1>Home express</h1>')
});

const port = 3000;

app.listen(port,() => console.log('rodando com express'));
const expess = require('express')
const app = expess()
const port = 3000

app.get('/',(req,res) =>{
	res.send('app get')
});

app.post('/',(req,res) =>{
	res.send('App Post')
})

app.delete('/',(req,res) =>{
	res.send('app delete')
})


app.listen(port,() => {
	console.log('Olá Mundo')
})
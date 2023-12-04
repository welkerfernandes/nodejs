const express = require('express')
const session = require('express-session')
const bodyParser = require('body-parser')
const port = 3000
var path = require('path')
const app = express()

var login = 'admin'
var password = '123'
app.engine('html',require('ejs').renderFile)
app.set('view engine','html')
app.use('/public',express.static(path.join(__dirname,'public')))
app.set('views',path.join(__dirname,'/views'))
app.use(session({
	secret:'qualquercoisa',
	resave:false,
	saveUninitialized:true
}))
app.use(bodyParser.urlencoded({extended:true}))
app.get('/',(req,res)=>{

	if(req.session.login){

		res.render('logado')
		console.log(`meu usuario logado é ${req.session.login}`)
	}else{
		res.render('index')
	}
})


app.post('/',(req,res)=>{

	if(req.body.password === password && req.body.login === login){
		req.session.login = login
		res.render('logado',{login:login})
	}else{
		res.render('index')
	}
})

app.listen(port,()=>{
	console.log('servidor rodando')
})

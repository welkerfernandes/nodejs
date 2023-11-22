//carregando modulos
const express = require('express')
const app = express()
const handlebars = require('express-handlebars')
const bodyparser = require('body-parser')
const admin = require('./routes/admin')
const path = require('path')
const session = require('express-session')
const flash = require('connect-flash')
//configurações
app.use(session({
	secret:"curso",
	resave:true,
	saveUninitialized:true

}))	
app.use(flash())
//middleware entidade que comunica antes do envio da requisição ao servidor
app.use((req,res,next)=>{
	res.locals.success_msg = req.flash('success_msg')
	res.locals.error_msg = req.flash('error_msg')
	next()

})

app.use(bodyparser.urlencoded({extends:true}))
app.use(bodyparser.json())

app.engine('handlebars',handlebars.engine({
	defaultLayout:'main',
	runtimeOptions:{
		allowProtoPropertiesByDefault:true,
		allowProtoMethodsByDefault:true,
	}
}))

app.use(express.static(path.join(__dirname,'public')))
app.set('view engine','handlebars')


//rotas
app.get('/',(req,res)=>{
	res.send('Página principal')
})
app.use('/admin',admin)


//listen server
const port = 3000

app.listen(port,()=>{
	console.log('servidor logado')
})
const expressfunc = require('express')
const app = expressfunc()
const port = 3000
const handlebars = require('express-handlebars')
const bodyparser = require('body-parser')
const Post = require('./models/Post')


//config
	//temnplate engine
		app.engine('handlebars',handlebars.engine({
			defaultLayout:'main',
			runtimeOptions:{
				allowProtoPropertiesByDefault:true,
				allowProtoMethodsByDefault:true,
			}
			
		}))
		app.set('view engine','handlebars')

//
		app.use(bodyparser.urlencoded({extended:false}))
		app.use(bodyparser.json())

app.get('/cad',(req,res)=>{
	res.render('formularios')
})

app.get('/',(req,res)=>{
	Post.findAll({order:[['id','DESC']]}).then((posts)=>{
		res.render('home',{posts:posts})
	})
	
})

app.get('/deletar/:id',(req,res)=>{
	Post.destroy({where:{'id':req.params.id}}).then(()=>{
		res.send('postagem deletada com sucesso')
	}).catch((e)=>{
		console.log(`essa postagem não existe ${e}`)
	})
})

//dado do formulário
app.post('/add',(req,res)=>{
	Post.create({
		titulo: req.body.titulo,
		conteudo: req.body.conteudo,
	}).then(()=>{
		res.redirect('/')
	}).catch((err)=>{
		res.send(`error ${err}`)
	})	

	
})

app.listen(port,()=>{
	console.log('servidor logado')
})
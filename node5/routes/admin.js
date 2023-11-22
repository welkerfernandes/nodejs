const express = require('express')
const router = express.Router()
const bodyparser = require('body-parser')
const Categoria = require('../models/Categoria')

router.get('/',(req,res)=>{
	res.render("admin/index")
})

router.get('/post',(req,res)=>{
	res.send('página de post')
})

router.get('/categorias',(req,res)=>{
	res.render('admin/categorias')
})

router.get('/categorias/add',(req,res)=>{
	res.render('admin/addcategoria')
})

router.use(bodyparser.urlencoded({extended:false}))
router.use(bodyparser.json())

router.post('/categorias/nova',(req,res)=>{

	var erros = []

	if(!req.body.nome || typeof req.body.nome == undefined || req.body.nome == null){
		erros.push({texto:"Nome inválido"})
	}

	if(!req.body.slug || typeof req.body.slug == undefined || req.body.slug == null){
		erros.push({texto:"Slug Inválido"})
	}

	if(req.body.nome.length < 2){
		erros.push({texto:"muito pequeno a categoria"})
	}

	if(erros.length > 0){
		res.render('admin/addcategoria',{erros: erros})
	}else{

		Categoria.create({
			nome:req.body.nome,
			slug:req.body.slug,
		}).then(()=>{
			req.flash('success_msg','Categoria Criada com sucesso')
			res.redirect('/admin/categorias')
		}).catch((err)=>{
			req.flash('error_msg','Erro ao salvar categoria')
			res.redirect('/admin')
		})
	}//fim do else
})

module.exports = router
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
	Categoria.findAll({order:[['id','DESC']]}).then((categoria)=>{
		res.render('admin/categorias',{categoria:categoria})
	})
	
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


router.get('/categorias/edit/:id',(req,res)=>{
	
	Categoria.findOne({where:{id:req.params.id}}).then((categoria)=>{
		
		res.render("admin/editcategorias",{categoria:categoria})
	
	}).catch((err)=>{
		
		console.log(`Categoria não existe ${err}`)
		req.flash('error_msg','Categoria não exite')
		res.redirect('/admin/categorias')
	
	})
	
})



router.post('/categorias/fimedicao',(req,res)=>{
	
	Categoria.findOne({where:{id:req.body.id}}).then((categoria)=>{
		categoria.nome = req.body.nome
		categoria.slug = req.body.slug


		categoria.save().then(()=>{
			console.log('parte do categoria save()')
			req.flash('success_msg','Editado com Sucesso')
			res.redirect('/admin/categorias')
		}).catch((err)=>{
			req.flash('error_msg','erro ao salvar')
			res.redirect('/admin/categorias')
		})

	}).catch((err)=>{
		req.flash('error_msg','Ouve um erro')
		res.redirect('/admin/categorias')
	})

});


router.post('/categorias/deletar', (req,res)=>{
	
	Categoria.findOne({where:{id:req.body.id}}).then((categoria)=>{
		

		categoria.destroy().then(()=>{
			req.flash('success_msg','Deletado')
			res.redirect('/admin/categorias')
		}).catch((err)=>{
			req.flash('error_msg','erro ao tentar deletar')
			res.redirect('/admin/categorias')
		})
	}).catch((err)=>{
		req.flash('error_msg','erro no servidor')
		res.redirect('/admin/categorias')
	})

})

module.exports = router
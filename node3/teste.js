const Sequelize = require('sequelize')
const sequelize = new Sequelize('node','root','',{
	host:'localhost',
	dialect:'mysql',
})

//verifica banco de dados

sequelize.authenticate().then(function(){

	console.log('conectado com sucesso')

}).catch(function(erro){

	console.log(`Falha ao se conectar ${erro}`)

})

//post 

const Postagem = sequelize.define('postagens',{
	titulo:{
		type:Sequelize.STRING
	},
	conteudo:{
		type:Sequelize.TEXT
	}
})

//fazer insert no banco
/*Postagem.create({
	titulo:'PRIMEIRO INSERT',
	conteudo:'primeiro conteudo'
})
*/
//Postagem.sync({force:true})

//users

const Usuario = sequelize.define('users',{
	name:{
		type:Sequelize.STRING
	},
	lastname:{
		type:Sequelize.STRING
	},
	age:{
		type:Sequelize.INTEGER
	},
	email:{
		type:Sequelize.STRING
	}
})

//inser no users
/*
Usuario.create({
	name:'welker',
	lastname:'fernandes',
	age:31,
	email:'welkerfc@icloud.com'
})*/
//Usuario.sync({force:true})


//criar o insert no banco

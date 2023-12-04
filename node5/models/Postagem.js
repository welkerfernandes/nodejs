const db = require('./db')
const Postagem = db.sequelize.define('postagens',{
	titulo:{
		type:db.Sequelize.STRING,
		required:true
	},
	slug:{
		type:db.Sequelize.STRING,
		required:true
	},
	descricao:{
		type:db.Sequelize.STRING,
		required:true
	},
	conteudo:{
		type:db.Sequelize.TEXT,
		required:true
	},
	categoria:{
		type:db.Sequelize.INTEGER,
		required:true
	}

})

//Postagem.sync({force:true})

module.exports = Postagem
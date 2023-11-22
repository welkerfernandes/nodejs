const db = require('./db')
const Categoria = db.sequelize.define('categorias',{
	nome:{
		type:db.Sequelize.STRING,
	},
	slug:{
		type:db.Sequelize.STRING
	}
})

//tag para criar table no banco de dados
//Categoria.sync({force:true}) 
module.exports = Categoria
const Sequelize = require('sequelize')
const sequelize = new Sequelize('node_project','root','',{
	host:'127.0.0.1',
	dialect:'mysql',
})

module.exports = {
	Sequelize:Sequelize,
	sequelize:sequelize
}
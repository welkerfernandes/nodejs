const fs = require('fs')
const path = require('path')

//criar uma pasta
/*
fs.mkdir(path.join(__dirname,'test'),(error) =>{
	if(error){
		return console.log('Erro',error);
	}

	console.log('pasta criada com sucesso');
});
*/

//criando arquivo
fs.writeFile(path.join(__dirname,'test/','teste.txt'),'Hello World',(error =>{
	if(error){
		return console.log("Erro",error)
	}

	return console.log("Arquivo Criado")
}))
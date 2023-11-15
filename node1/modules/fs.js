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

	console.log('arquivo criado com sucesso')

	fs.appendFile(
		path.join(__dirname,'test/','teste.txt'),
		"Oi Planela",
		(error) =>{
			if(error){
				return console.log(error);
			}

			return console.log("Arquivo modificado com sucesso");
		});


		//ler arquivo
		fs.readFile(
			path.join(__dirname,'test/','teste.txt'),
			'utf-8',
			(error,data) =>{
				if(error){
					return console.log(error)
				}
		 	
			return console.log(data);
			}
		);
}))


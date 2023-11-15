const path = require("path")

//apenas o nome do arquivo atual
console.log(path.basename(__filename));
//diretorio atual
console.log(path.dirname(__filename));
//extensão do arquivo atual
console.log(path.extname(__filename));
//informações do arquivo atual
console.log(path.parse(__filename));

//juntar vários caminhos de arquivos
console.log(path.join(__dirname,'teste','teste.html'));
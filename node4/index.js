const axios = require('axios')
const xml2js = require('xml2js')
const fs = require('fs')
const express = require('express')
const app = express()

const porta = 3000
app.get('/oceane',(req,res)=>{
	res.sendfile('./arquivo.xml')
})


const url = 'https://www.oceane.com.br/XMLData/n-googleshopping.xml'

axios.get(url).then(response =>{
	const xmlData = response.data
	const parseOptions = {
		tagNameProcessors:[xml2js.processors.stripPrefix],
	}//fim parse options

	xml2js.parseString(xmlData,parseOptions,(err,result) =>{
		if(err){
			console.log('erro')
		}else{
			const entries = result.feed.entry
			let valores = ''
			const topo = `<?xml version='1.0' standalone='yes'?>
			<smartCustomXml>`
			const rodape = '</smartCustomXml>'
			let stop = 0
			let gerar = ''
			for(x in entries){
				if(stop === 10){
					break
				}
				const id = entries[x].id
				const nome = entries[x].title
				const description = entries[x].description
				const product_type = entries[x].product_type
				const link = entries[x].link
				const image_link = entries[x].image_link
				const price = entries[x].price

				valores += `
					<product>
				        <pid>${id}</pid>
				        <name><![CDATA[${nome}]]></name>
				        <product_type><![CDATA[${product_type}]]></product_type>
				        <description><![CDATA[${description}]]></description>
				        <page_url><![CDATA[${link}]]></page_url>
				        <image_url><![CDATA[${image_link}]]></image_url>
				        <price>${price}</price>
				     </product>
				`
				

				

				//console.log(gerar)
				stop++
			}//fim loop
			gerar += `${topo}${valores}${rodape}`
			//console.log(gerar)
			const caminho = './arquivo.xml'
			fs.writeFile(caminho,gerar,(err)=>{
				if(!err){
					console.log('arquivo criado')
				}else{
					console.log('erro no arquivo')
				}
			})
		}
	})

})//fim axios


app.listen(porta,()=>{
	console.log('servidor online')
})
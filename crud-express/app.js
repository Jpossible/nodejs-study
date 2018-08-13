/*
* @Author: Administrator
* @Date:   2018-08-05 11:53:30
* @Last Modified by:   Administrator
* @Last Modified time: 2018-08-05 22:09:24
*/

var express = require('express')
var app = express()
var router = require('./router')
var bodyparser = require('body-parser')

app.use('/node_modules',express.static('./node_modules/'))
app.use('/public/',express.static('./public/'))

app.use(bodyparser.urlencoded({extended:false}))
app.use(bodyparser.json())

app.engine('html',require('express-art-template'))

app.use(router)
// app.get('/',function(req,res){
// 	var fdata={}
// 	fs.readFile('./db.json','utf8',function(err,data){
// 		if(err){
// 			return res.status(500).send('server err')
// 		}
// 		res.render('index.html',{
// 		students: JSON.parse(data).students
// 	})
// 	})
	
// })

app.listen(3000,function () {
	// body...
	console.log('runing...')
})
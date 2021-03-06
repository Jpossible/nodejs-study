var http = require('http')
var fs = require('fs')
var url = require('url')
var template = require('art-template')
require('./Jdate.js')



var jdata = [
	{
		'name':'fjj',
		'message':'fffffffffff',
		'dateTime':'2018-7-7'
	},
	{
		'name':'xp',
		'message':'fffffffffff',
		'dateTime':'2018-7-7'
	},
	{
		'name':'mfh',
		'message':'fffffffffff',
		'dateTime':'2018-7-7'
	}
]

http.createServer(function (req,res) {
	var pathObj = url.parse(req.url,true)
	var pathname = pathObj.pathname
	if (pathname === '/') {
		fs.readFile('./views/index.html',function(err,data){
			if (err) {
				return res.end('the file not found')
			}
			var str = template.render(data.toString(),{
				comments:jdata
			})
			res.end(str)
		})
	}else if(pathname.indexOf('/public/') === 0 ){
		fs.readFile('.'+pathname,function(err,data){
			if (err) {
				return res.end('the file error')
			}
			res.end(data)
		})
	}else if (pathname === '/post') {
		fs.readFile('./views/post.html',function(err,data){
			if (err) {
				return res.end('the file not found')
			}
			res.end(data)
		})
	}else if (pathname === '/pinglun') {
		var arr = pathObj.query;
		arr.dateTime = (new Date()).Format("yyyy-M-d h:m:s");
		jdata.unshift(arr);
		res.statusCode=302;
		res.setHeader('Location','/');
		res.end();
	}
}).listen(3000,function(){
	console.log('the server runing')
})
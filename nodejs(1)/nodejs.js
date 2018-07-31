var fs = require('fs');
var http = require('http');
var template = require('art-template');
var url = require('url');
var commentsj = [
	{
		name:'fjj',
		message:'12345645',
		dateTime:'2018-7-3'
	},
	{
		name:'fjj1',
		message:'114364565111',
		dateTime:'2018-7-3'
	},
	{
		name:'fjj2',
		message:'11111',
		dateTime:'2018-7-3'
	},
	{
		name:'fjj3',
		message:'1113423562611',
		dateTime:'2018-7-1'
	}
]

http.createServer(function(req,res){
	var parseObj = url.parse(req.url, true)
	var pathname =  parseObj.pathname;
	if (pathname === '/') {
		fs.readFile('./views/index.html',function(err,data){
			if (err) {
				return res.end('404 not found');
			}
			var htmlStr = template.render(data.toString(),{
				comments:commentsj
			});
			console.log(req.url);
			res.end(htmlStr);
		})
	}else if(pathname.indexOf('/public/')===0){
		fs.readFile('.'+ pathname,function(err,data){
			if(err){
				return res.end('404 not the file')
			}
			res.end(data)
		})
	}else if(pathname==='/post'){
		fs.readFile('./views/post.html',function(err,data){
			if(err){
				return res.end('404 not found')
			}
			res.end(data)
		})
	}else if(pathname==='/pinglun'){
		var comment = parseObj.query;
		comment.dateTime=new Date();
		commentsj.unshift(comment);
		res.statusCode = 301;
		res.setHeader('Location','/');
		res.end();
	}
}).listen(3000,function(){
	console.log('running...');
})
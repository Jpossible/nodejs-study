var fs = require("fs")

var baseurl = "./db.json"

/**
查询全部学生
callback
*/
exports.query=function (callback) {
	fs.readFile(baseurl,function(err,data){
		if (err) {
			return callback(err)
		}
		return callback(null,JSON.parse(data))
	})
}

exports.save=function (obj,callback){
	fs.readFile(baseurl,function(err,data){
		if (err) {
			return callback(err)
		}
		var jsondata = JSON.parse(data).students;
		obj.id = jsondata[jsondata.length-1].id + 1;
		jsondata.push(obj)	
		fs.writeFile(baseurl,JSON.stringify({students:jsondata}),function(err,data){
			if (err) {
				return callback(err)
			}
			return callback(null)
		})
	})
}

exports.searh=function (id,callback) {
	fs.readFile(baseurl,function(err,data){
		if (err) {
			return callback(err)
		}
		var fdata=JSON.parse(data).students		 
		return callback(null,fdata.find(function(value){
			return value.id==id
		}))
	})
}



exports.edit=function (obj,callback){
	fs.readFile(baseurl,function(err,data){
		if (err) {
			return callback(err)
		}
		var jsondata = JSON.parse(data).students;
		var fdata = jsondata.find(function (item) {
			return item.id == obj.id
		})
		for(var key in obj){
			fdata[key]=obj[key]		
		}
		fs.writeFile(baseurl,JSON.stringify({students:jsondata}),function(err,data){
			if (err) {
				return callback(err)
			}
			return callback(null)
		})
	})
}

exports.del=function (id,callback) {
	fs.readFile(baseurl,function(err,data){
		if (err) {
			return callback(err)
		}
		var fdata=JSON.parse(data).students		 
		var index=fdata.findIndex(function(value){
			return value.id==id
		})
		fdata.splice(index, 1);
		fs.writeFile(baseurl,JSON.stringify({students:fdata}),function(err,data){
			if (err) {
				return callback(err)
			}
			return callback(null)
		})
	})
}
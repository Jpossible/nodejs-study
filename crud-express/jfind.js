var data=[
	{id:1,name:"22"},
	{id:2,name:"22"},
	{id:3,name:"22"},
	{id:4,name:"22"},
	{id:5,name:"22"}

]

Array.prototype.jfind=function (func) {
	for (var i = 0; i < this.length; i++) {
		if (func(this[i],i)) {
			return i
		}
	}
}



console.log(data.jfind(function(item,index){
	return item.id === 4
}))
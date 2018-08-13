var express = require('express')
var router = express.Router()
var student = require('./student')

router.get('/',function (req,res) {	
	student.query(function(err,data){
		if (err) {
			return res.status(500).send('server err')
		}
		res.render('index.html',{
			students:data.students
		})
	})
})


router.get('/student/new',function (req,res) {
	res.render('new.html')
})

router.post('/student/new',function (req,res) {
	student.save(req.body,function(err,data){
		if(err){
			return res.status(500).send('server err')
		}
		res.redirect('/');
	})
})

router.get('/student/edit',function (req,res) {
	student.searh(req.query.id,function (err,data) {
		if (err) {
			return res.status(500).send('server err')
		}
		res.render('edit.html',{
			students:data
		})
	})	
})

router.post('/student/edit',function (req,res) {
	student.edit(req.body,function (err,data) {
		if (err) {
			return res.status(500).send('server err')
		}
		res.redirect('/');
	})	
})

router.get('/student/del',function (req,res) {
	student.del(req.query.id,function (err,data) {
		if (err) {
			return res.status(500).send('server err')
		}
		res.redirect('/');
	})	
})

module.exports = router
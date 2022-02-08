const express = require('express');

const router2 = express.Router();



router2.use((req,res,next)=>{
	const auth = true;
	
	if(auth){
		next();
	}
	else{res.send({"err":"User not Authenticated"}).status(405)} 
})

router2.param('ids',(req,res,next,id)=>{
	console.log(id);
	next();
});



router2.route('/router2/:ids')
	.all((req,res,next)=>{
		console.log(req.method);
		console.log('for all method');
		['GET','POST','PUT','DELETE'].indexOf(req.method)>-1 ? next() : res.sendStatus(400);
	})
	.get((req,res,next)=>{
		res.clearCookie('name');
		console.log('This is a GET page');
       	res.render('about');
	})
	.post((req,res,next)=>{
		console.log('This is POST Method');
		res.sendStatus(200);
	})

    module.exports = router2 ;
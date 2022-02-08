const express = require('express');
const path = require('path');
const router2 = express.Router();


const middlewareHandler =(value)=>{
	return (req,res,next)=>{
		if(value){
			console.log('correct middleware');
			next();
		}
		else{
			throw new Error ;
		}
	}
}
router2.use(middlewareHandler(12));

router2.param((parameter,value)=>(req,res,next,id)=>{
		console.log(id)
		if(value === id){
			req.id=value;
			next();
		}
		else{
			throw new Error;
		}
	}
)

router2.param('ids','mehedi');

router2.route('/router2/:ids')
	.all((req,res,next)=>{
		console.log(req.id);
		console.log('for all method');
		['GET','POST','PUT','DELETE'].indexOf(req.method)>-1 ? next() : res.sendStatus(400);
	})
	.get((req,res,next)=>{
		const option ={
			root : path.join(__dirname,'views')
		}
		console.log('This is a GET page');
       	res.sendFile('index.ejs',option,err=>{
			   err ? console.log(err) : console.log({'sent': 'home'});
			   res.end();
		   });
	})
	.post((req,res,next)=>{
		console.log('This is POST Method');
		res.sendStatus(200);
	})

 	const errHandle = (err,req,res,next)=>{
		console.log(err);
		res.status(404).send('There is an error');
 	}
	router2.use(errHandle); 
    module.exports = router2 ;
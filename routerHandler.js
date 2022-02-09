const express = require('express');
const path = require('path');
const router2 = express.Router();

const middlewareFunction=(isauth)=>(req,res,next)=>{
	if(isauth){ next(); } else{ next({message : 'Authentication is not success'})}
}

router2.use(middlewareFunction(false));

router2.param((routes,value)=>(req,res,next,id)=>{
	if(id===value){ next() } else{ throw new Error; }
})

router2.param('id','mehedi');

router2.all('/router2/:id',[(req,res,next)=>{
	console.log(req.method);
	next();
},
	(req,res,next)=>{
		console.log('second array ');
		res.end();
	}
])
router2.use((err,req,res,next)=>{
	console.log(err);
	if(err.message){
		res.status(500).send(err.message);
	}
	else{
		res.sendStatus(400);
	}
})
module.exports = router2 ;
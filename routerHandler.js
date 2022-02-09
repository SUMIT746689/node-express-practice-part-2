const express = require('express');
const path = require('path');
const router2 = express.Router();
const fs = require('fs');

const middlewareFunction=(isauth)=>(req,res,next)=>{
	console.log(req.query);
	if(isauth){ next(); } else{ next({message : 'Authentication is not success'})}
}

router2.use(middlewareFunction(true));

router2.param((routes,value)=>(req,res,next,id)=>{
	if(id===value){ next() } else{ throw new Error; }
})

router2.param('id','mehedi');

router2.all('/router2/:id',[(req,res,next)=>{
	console.log(req.method);

	fs.readFile('./public/homs','utf-8',(err,data)=>{
		console.log(data);
		next(err);
	})
	
},
(req,res,next)=>{
	console.log(data.msg);
}
])
router2.use((err,req,res,next)=>{
	
	if(res.headersSent){
		next(err);
	}
	else{  
		if(err.message){
			res.status(505).send(err.message);
		}
		else{
			res.sendStatus(400);
		}
	}
})
module.exports = router2 ;
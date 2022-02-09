const express = require('express');
const app = express();
const router = express.Router();
const router2 = require('./routerHandler'); 
const cookieParser = require('cookie-parser');


const PORT = 3000;
const path = require('path');

app.set('view engine','ejs');
app.use(cookieParser());

app.use(express.text());

app.use('/home',router);

router.use('/router',router2);

router.all('/name',(req,res,next)=>{
	next(err)
	console.log(data.name);
})

app.use((err,req,res,next)=>{
	res.status(406).send(err.message);
})

app.listen(PORT, function(err){
	if (err) console.log("Error in server setup");
	console.log("Server listening on Port", PORT);
});

module.exports = app ;
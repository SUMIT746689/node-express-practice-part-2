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

app.listen(PORT, function(err){
	if (err) console.log("Error in server setup");
	console.log("Server listening on Port", PORT);
});

module.exports = app ;
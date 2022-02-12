const express = require('express');
const app = express();
const router = express.Router();
const router2 = require('./routerHandler'); 
const cookieParser = require('cookie-parser');
const multer = require('multer');

const PORT = 3000;
const FILE_PATH = './uploads';
const path = require('path');
app.set('view engine','ejs');
app.use(cookieParser());
app.use(express.text());
app.use('/home',router);

const storage = multer.diskStorage({
	destination : (req,file,cb)=>{
		cb(null,FILE_PATH)
	},
	filename : (req,file,cb)=>{
		const fileName_uniquecode = `${Date.now()}-${Math.round(Math.random()*1E9)}`;
		const fileExt = path.extname(file.originalname);
		const fileName = file.originalname
								.replace(fileExt,'')
								.split(' ')
								.join('-')+'-' ; 
		const totalPath = (fileName + fileName_uniquecode + fileExt).toLowerCase() ;
		cb(null,totalPath)
	}
})

const upload = multer({
	dest : FILE_PATH,
	fileFilter : (req,file,cb)=>{
		if(file.mimetype  === 'image/png' ||
			file.mimetype === 'image/jpg' ||
			file.mimetype === 'image/jpeg'){
				cb(null,true);
			}
			else if (file.mimetype == 'text/plain') {
				cb(null,true);
			}
		else{
			cb(new Error ('Only get .jpeg, .jpg and .png files '))
		}
	},
	limits : {
		fileSize : 1000000
	},
	storage 
	// preservePath
});

const cpUpload = upload.fields([
	{ name: 'avatar', maxCount: 3 },
 	{ name: 'texts', maxCount: 1 }
]);

app.post('/',cpUpload,(req,res,next)=>{
	
});

router.use('/router',router2);

router.all('/name',(req,res,next)=>{
	next(err)
	console.log(data.name);
})

app.use((err,req,res,next)=>{
	if (err instanceof multer.MulterError){
		res.status(500).send('Server Problems');
	}
	else{
		res.status(406).send(err.message);
	}
	
})

app.listen(PORT, function(err){
	if (err) console.log("Error in server setup");
	console.log("Server listening on Port", PORT);
});

module.exports = app ;
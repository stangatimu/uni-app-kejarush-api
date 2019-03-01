const express = require('express'),
        app = express(),
        morgan = require('morgan'),
        bodyparser = require('body-parser'),
        mongoose = require('mongoose'),
        helmet = require('helmet');



app.set('trust proxy',+1);

app.set('view engine', 'ejs');
app.use(helmet());
app.use(morgan('dev'));
app.use('/uploads',express.static('uploads'));
app.use(bodyparser.urlencoded({extended:false}));
app.use(bodyparser.json());

mongoose.connect(process.env.database, ()=>{
    console.log('database connection initialized successfully');
});

app.use((req, res, next)=>{
	res.header("Access-Control-Allow-Origin", "*");
	res.header(
		"Access-Control-Allow-Headers",
		"Origin, X-Requested-With, Content-Type, Accept, Authorization"
		);
	if (req.body === 'OPTIONS') {
		res.header('Access-Control-Allow-Methods','PUT, POST, DELETE, GET, PATCH');
		return res.status(200).json({});
	}
	next();
});

app.get('/',(req,res,next)=>{
	res.send('kejarush up and running');
});

app.use((error,req,res,next)=>{
	res.status(error.status || 500);
	res.json({
		error:{
			message: error.message
		}
    });
    
    next();
});

module.exports = app;
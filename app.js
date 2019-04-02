const express = require('express'),
        app = express(),
        morgan = require('morgan'),
        bodyparser = require('body-parser'),
        mongoose = require('mongoose'),
        helmet = require('helmet');

const	user_routes = require('./api/routes/user'),
		category_routes = require('./api/routes/categories'),
		agent_routes = require('./api/routes/agent'),
		property_routes = require('./api/routes/property'),
		ad_routes = require('./api/routes/ad'),
		bookng_routes = require('./api/routes/booking'),
		rent_routes = require('./api/routes/payments');
		agency_routes = require('./api/routes/manage-user'),
		search_routes = require('./api/routes/search');


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

app.use('/user',user_routes);
app.use('/categories',category_routes);
app.use('/agent',agent_routes);
app.use('/property',property_routes);
app.use('/ad',ad_routes);
app.use('/bookings',bookng_routes);
app.use('/rent',rent_routes);
app.use('/agency',agency_routes);
app.use('/search',search_routes);

app.get('/',(req,res,next)=>{
	res.send('kejarush up and running');
});

app.use("*",(error,req,res,next)=>{
	res.status(error.status || 500);
	res.json({
		error:{
			message: error.message
		}
    });
    
    next();
});

module.exports = app;
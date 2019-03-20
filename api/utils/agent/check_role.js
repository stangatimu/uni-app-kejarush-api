const jwt = require("jsonwebtoken");

module.exports = async (req, res,next)=>{
	try {
		const token = req.headers.authorization.split(" ")[1];
        const decoded = jwt.verify(token, process.env.jwtkey);
        
        if(decoded.role == 'agent' || decoded.role == 'admin'){
            req.userData = decoded;
			next();            
        }else{
            res.status(401).json({
                success: false,
                message:"You are not authorized to perform this actions."
            });    
        }
        
	} catch (err) {
		res.status(401).json({
            success: false,
            message: 'Authentication failed, please login to continue.',
            message: err.message
		});
	}
}
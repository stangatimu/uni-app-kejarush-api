const jwt = require("jsonwebtoken");

module.exports = (req, res,next)=>{
	try {
		const token = req.headers.authorization.split(" ")[1];
		if (token) {
			jwt.verify(token, process.env.jwtkey, function (err, decoded) {
				if (err) {
					res.status(401).json({
						success: false,
						message: "failed to authenticate"
					});
				} else {
					req.userData = decoded;
					next();

				}
			});
		}

	} catch (err) {
		return res.status(401).json({
			message: 'Authentication failed'
		});
	}
	
}
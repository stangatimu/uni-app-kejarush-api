const bcrypt = require('bcrypt'),
      jwt = require('jsonwebtoken');


comparePassword = (password1,user,resp)=>{
	bcrypt.compare(password1, user.password, (err, result)=>{
		if (err) {
			return resp.status(401).json({
				success: false,
				message:"Authentication failed"
			});
		}
		if (result) {
			if(!user.isVerified){
				return resp.status(401).json({
					success: false,
					message:"Account not activated, check your email to activate account"
				});
			}
			const token = jwt.sign({
				email:user.email,
				userId: user._id
			  }, process.env.jwtkey,
			  { expiresIn: "7d"}
			);
			return resp.status(200).json({
				success: true,
				message:"Authentication successful",
				user:{
					email: user.email,
					name: user.name
				},
				token: token,
				expiresIn: "7d"
			});
		}
		return resp.status(401).json({
			success: false,
			message:"Authentication failed"
		});
	});
}

module.exports = comparePassword;
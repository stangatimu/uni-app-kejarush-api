const bcrypt = require('bcrypt'),
      jwt = require('jsonwebtoken');


comparePassword = (password1,agent,resp)=>{
	bcrypt.compare(password1, agent.password, (err, result)=>{
		if (err) {
			return resp.status(401).json({
				success: false,
				message:"Authentication failed"
			});
		}
		if (result) {
			if(agent.status == 'dormant'){
				return resp.status(401).json({
					success: false,
					message:"Sorry your account is has been deactivate, contact your administrator."
				});
			}
			const token = jwt.sign({
				name:agent.name,
                agentID: agent._id,
                role: agent.role                
			  }, process.env.jwtkey,
			  { expiresIn: "1d"}
			);
			return resp.status(200).json({
				success: true,
				message:"Authentication successful",
				user:{
					name: agent.name,
					role: agent.role
				},
				token: token,
				expiresIn: "1d"
			});
		}
		return resp.status(401).json({
			success: false,
			message:"Authentication failed"
		});
	});
}

module.exports = comparePassword;
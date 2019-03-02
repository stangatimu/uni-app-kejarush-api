const   bcrypt = require('bcrypt'),
        Agent = require('../models/agent'),
        comparePassword = require('../utils/comp_password');



exports.agent_signup = async (req,res)=>{
    try{
        agent = await Agent.find({name: req.body.name});
    }catch(err){
        return res.status(500).json({
            success: false,
            message:'error while creating a new agent'
        });
    }
    if(!agent){
        try{
            hash = bcrypt.hasg(req.body.password,16);
            const newAgent = new Agent({
                _id: new mongoose.Types.ObjectId(),
                name: req.body.name,
                password: hash
            });
            newAgent.save();

            return res.status(201).json({
                success: false,
                user:{
                    name: user.name,
                    role: user.role,
                    status:  user.status,
                    _id: user._id
                }
            })

        }catch(err){
            return res.status(500).json({
                success: false,
                message:'error while creating a new agent'
            });
        }
    }    
}

exports.agent_login = (req,res)=>{
    Agent.findOne({ name: req.body.name })
    .exec()
    .then(agent => {
        if (!agent) {
            return res.status(401).json({
                success: false,
                message: "Authentication failed"
            });
        }

        comparePassword(req.body.password, agent, res);

    })
    .catch(e => {
        res.status(500).json({
            success: false,
            error: e.message
        });
    });
}


exports.agent_edit = async (req,res)=>{
    try{
        agent = await Agent.find({_id: req.body.agent});
    }catch(err){
        return res.status(500).json({
            success: false,
            message:'error while creating a new agent'
        });
    }
    if(!agent){
        return res.status(404).json({
            success: false,
            message: 'the specified agent does not exist'
        });
    }

    req.body.name ? agent.name = req.body.name : agent.name;

    if(req.body.password){
        try{

            hash = bcrypt.hash(req.body.password,16);
            agent.name = hash;

        }catch(err){
            return res.status(500).json({
                success: false,
                message: 'error occured while editing'
            });
        }
    }
}
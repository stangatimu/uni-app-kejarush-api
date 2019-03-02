const   mongoose = require('mongoose'),
        bcrypt = require('bcrypt'),
        Agent = require('../models/agent'),
        comparePassword = require('../utils/agent/cmp_password');



exports.agent_signup = async (req,res)=>{
    if(req.userData.role !== 'admin'){
        return res.status(401).json({
            success: false,
            message: "You are not allowed to perform this action."
        });         
    }
    try{
        agent = await Agent.find({name: req.body.name});
    }catch(err){
        return res.status(500).json({
            success: false,
            message:'error while creating a new agent'
            // message: err.message
        });
    }
    if(!agent.length){
        console.log(req.body);
        try{
            hash = await bcrypt.hash(req.body.password,10);
            const newAgent = new Agent({
                _id: new mongoose.Types.ObjectId(),
                name: req.body.name,
                password: hash
            });
            newAgent.save();

            return res.status(201).json({
                success: false,
                user:{
                    status: newAgent.status,
                    role: newAgent.role,
                    name:newAgent.name,
                    _id: newAgent._id
                }
            });
        }catch(err){
            return res.status(500).json({
                success: false,
                message:'error while creating a new agent'
                // message: err.message
            });
        }
    } 
    return res.status(401).json({
        success: false,
        message: "An agent with that username already exits."
    });   
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
        const agent = await Agent.findOne({_id: req.userData.agentID});
        if(!agent){
            return res.status(404).json({
                success: false,
                message: 'the specified agent does not exist'
            });
        }
        req.body.name ? agent.name = req.body.name : agent.name;
        if(req.body.password){    
                hash = await bcrypt.hash(req.body.password,10);
                agent.password = hash;
        }
        agent.save();
        return res.status(201).json({
            success: true,
            message: 'agent was successfuly updated.',
            agent:{
                name: agent.name,
            }
        });

    }catch(err){
        return res.status(500).json({
            success: false,
            message:err.message
        });
    } 
}

exports.admin_agent_manage = async (req,res)=>{
    if(req.userData.role !== 'admin'){
        return res.status(401).json({
            success: false,
            message: "You are not allowed to perform this action."
        });         
    }
    try{
        const agent = await Agent.findOne({_id: req.query.agent});
        if(!agent){
            return res.status(404).json({
                success: false,
                message: 'the specified agent does not exist'
            });
        }
        req.body.status ? agent.status = req.body.status: agent.status;
        req.body.role ? agent.role = req.body.role : agent.role;

        agent.save();
        return res.status(201).json({
            success: true,
            message: 'agent was successfuly updated.',
            agent:{
                name: agent.name,
                _id: agent._id,
                role: agent.role,
                status: agent.status
            }
        });

    }catch(err){
        return res.status(500).json({
            success: false,
            message:err.message
        });
    }
}
const express = require('express');
var router = express.Router();
const models=require('../models');
const jwt =require('jsonwebtoken');
const {checkToken}=require('../utils/auth.js');
router.post("/login",async (req,res,next)=>{
	let {username,password}=req.body;
	try{
	if(!username||!password){
		res.status(400).send("anta hthzr m3aya ya abny ?");
	}
	else{
	let user=await models.users.findOne({where:{username:username}});
		if(!user){
			res.status(403).send("Not authorized");
		}
		else{
			if(user.password==password){
				let token=jwt.sign({user:user},"noha",{expiresIn:'1d'});
				console.log(token);
				res.send(token);
			}
			else{
				res.status(403).send("Not authorized");
			}
		}
	
	}
	}
	catch(error){
		next(error);
	}
});
router.get("/noha",[checkToken],function (req,res,next){
console.log("holla");
console.log(req.tokenData);

res.send(req.tokenData);
});
module.exports=router;

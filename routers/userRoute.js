const express = require("express");
const router = express.Router();
const {User} =require("../models");
const bcrypt= require("bcrypt");
const verify = require("../utils/auth")
const jwt = require("jsonwebtoken");
module.exports = router



//register
router.post("/users/register",async function(req,res, next){

      //hash Password 
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(req.body.password, salt);
        const users = await User.create({
            username: req.body.username,
            password: hashedPassword,
            permissions:req.body.permissions
            
        })
        const savedUser = users.save();
        if(!savedUser){
            res.status(404).send("no data found ")
        }
        return res.status(200).send(users)
    })

    //Login 
router.post("/users/Login/", verify,async (req,res)=>{
  const users= await User.findOne({
    where:{ username:req.body.username}
 });
 
 if(!users) {return res.status(400).send("Username or password is wrong ..");}

 //password is correct
 const validPass = await bcrypt.compare(req.body.password,users.password);
 console.log(validPass)
 if(!validPass){ return res.status(400).send("Invalid Password")};

//return res.send("Logged IN!")

//create and assign jwt

const token = jwt.sign({id:users.id},"SECRET");
res.header('auth_token', token).send(token);

})

router.put("/users/:id",
    async function(req, res, next){
        const users = await User.update({
            username: req.body.username,
            password: req.body.password,
            permissions:req.body.permissions
            },
            {
            where:{id:req.params.id}
            }
            )
            res.status(200).send("User updated successfully!");
    })
   

router.get("/users",
    async (req, res)=>{
        const users = await User.findAll();
        if (!users){
            res.status(400).send("No data found")
        }
        else{
            res.status(200).send(users)
        }


    })

router.delete("/users/:id",
    async (req, res)=>{
        const users = await User.destroy({
          where:{id:req.params.id}
        });
        if(!users){
            return res.status(404).send("No data found ")
        }
        res.status(200).send("User deleted")
    })
module.exports =router;
const express = require("express");
const router = express.Router();
const {category} =require("../models");
const {verify} = require("../utils/auth")

module.exports = router



//add new category
router.post("/categories/",verify,async function(req,res, next){
        const categories = await category.create({
            name:req.body.name
        })
        try{
            res.status(200).send(categories)

        }
        catch(error){
            console.log(error)
            res.status(400).send(error)
        }
    })

//find category of some user
router.get("/category/:userId",verify, async (req,res)=>{
    const categories = await category.findAll({
        where:{userId:req.params.userId}
    })
    //Leh ?
    if(!categories){
        res.status(404).send("No categories found")
    }
    res.status(200).send(categories)
})

//update with category id
//
router.put("/cateogry/:id", verify,async function(req, res){
        const categories = await category.update({
            name:req.body.name
            },
            {
            where:{id:req.params.id}
            }
            )
            res.status(200).send("Category updated");
    })
   
//get all categories
router.get("/category/",verify,
    async (req, res)=>{
        const categories = await category.findAll();
        if (!categories){
            res.status(400).send("No data found")
        }
        else{
            res.status(200).send(categories)
        }


    })

router.delete("/category/:id",verify,
    async (req, res)=>{
        const categories = await category.destroy({
          where:{id:req.params.id}
        });
        if(!categories){
            return res.status(404).send("No data found ")
        }
        res.status(200).send("Category deleted")
    })
module.exports =router;
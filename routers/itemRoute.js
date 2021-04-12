const express = require("express");
const router = express.Router();
const {item, category} =require("../models");
const {verify} = require("../utils/auth")
module.exports = router



//add new items
router.post("/item/",verify,async function(req,res, next){
        const items = await item.create({
            name:req.body.name,
            categoryId:req.body.categoryId,
            userId:req.user.id
        })
        try{
            res.status(200).send(items)

        }
        catch(error){
            console.log(error)
            res.status(400).send(error)
        }
    })

//find items of specific category 
router.get("/item/:categoryId", verify,async (req,res)=>{
    const items = await item.findAll({
        where:{categoryId:req.params.categoryId}
    })
    //Leh ?
    if(!items){
        res.status(404).send("No items found")
    }
    res.status(200).send(items)
})

//update with item's id
//
router.put("/item/:id",verify,
    async function(req, res){
        const items = await item.update({
            name:req.body.name,
            
            },
            {
            where:{id:req.params.id}
            }
            )
            res.status(200).send("item updated");
    })
   
//get all items
router.get("/item/",
verify,
    async (req, res)=>{
        const items = await item.findAll();
        if (!items){
            res.status(400).send("No items found")
        }
        else{
            res.status(200).send(items)
        }


    })
//delet item with its id
router.delete("/item/:id",verify,
    async (req, res)=>{
        const items = await item.destroy({
          where:{id:req.params.id}
        });
        if(!items){
            return res.status(404).send("No data found ")
        }
        res.status(200).send("item deleted")
    })

//delete items of specific category 
router.delete("/item/categorId", verify,async(req,res)=>{
    const items = await item.destroy({
        where:{categoryId:req.params.categoryId}
    })
    try{
          res.status(200).send("items deleted ")
        }
    catch(err){
        res.status(400).send("Category is empty")
    }
  
})
module.exports =router;``
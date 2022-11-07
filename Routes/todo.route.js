const { Router } = require("express");

const bcrypt = require("bcrypt");
const { todoModel } = require("../Models/todo.model");
const { authentication } = require("../Middlewares/authentication");
const todoController = Router();


// ------getting todos from database------//
todoController.get("/todos",authentication, async (req,res)=>{

     const {user_id} = req.body;
     
     const alltodo = await todoModel.find({user_id})  

     res.send({alltodo})

})


// -----post todo-----//
 
todoController.post("/create",authentication,async (req,res)=>{
        const payload = new todoModel({
            ...req.body
        })
      await payload.save()
      res.send({msg:"todo created...."})
})




// ----------Delete-------//
// todoController.delete("/create:",authentication,async (req,res)=>{
//     const payload = new todoModel({
//         ...req.body
//     })
//   await payload.save()
//   res.send({msg:"todo created...."})
// })


module.exports={
    todoController
}
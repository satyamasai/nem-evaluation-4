const { Router } = require("express");
const jwt= require("jsonwebtoken");
const userController = Router();
const bcrypt = require("bcrypt");
const { userModel } = require("../Models/user.model");
require("dotenv").config()

// -------------userSignup---------//

userController.post("/signup", async (req, res) => {
  const { name, email, password } = req.body;

  const existing_user = await userModel.findOne({email});
if(existing_user){
res.send({"msg":"user already exist"});
return

}
  bcrypt.hash(password, 6, async function (err, hash) {
    if (err) {
      res.send({ msg: "signup failed try again" });
    } else {
             const new_user= new userModel({
                       email,
                       name,
                       password:hash
             });
             await new_user.save()
             res.send({"msg":"Signup successfull"})
    }
  });
});



// -----------Loginn-----------------//

userController.post("/login", async (req, res) => {
    const {email, password } = req.body;
  
    const user = await userModel.findOne({email});
      const hashed_password = user.password;
      const user_id= user._id;

      bcrypt.compare(password, hashed_password, function(err, result) {
        
           if(err){
            res.send({"msg":"something went wrong login again"})
           }
           if(result){
               const token =  jwt.sign({ user_id }, process.env.SECRET )

               res.send({msg:"login successfull", token})

           }else{
            res.send({"msg":"login failed"})
           }



    });





})




module.exports={
    userController
}



const {connection} = require(".//Config/db")
const express= require("express");
const { userController } = require("./Routes/user.routes");
const { todoController } = require("./Routes/todo.route");
require("dotenv").config();
const cors= require("cors")

const app = express();
app.use(cors());
app.use(express.json())


app.get("/",(req,res)=>{

    res.send("welcome to the app")
})


app.use("/",userController)

app.use("/",todoController)


app.listen(process.env.PORT,async()=>{

try{
    await connection
          console.log("database connected")
          console.log("Listening on"+ process.env.PORT)
}catch(err){
console.log("database connection failed");
console.log(err)

}

})
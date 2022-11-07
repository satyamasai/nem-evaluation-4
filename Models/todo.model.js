const mongoose= require("mongoose");

const todoSchema = mongoose.Schema({
      taskname:{type:String , required:true},
      status:{type:String , default:"pending"},
      tag:{type:String , required:true},
      user_id:{type:String, required:true}

})

const todoModel = mongoose.model("todo" , todoSchema);

module.exports={
    todoModel
}
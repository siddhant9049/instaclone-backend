const mongoose=require("mongoose")

const users=mongoose.Schema({
    name:{
        type:String
    },
    location:{
        type:String
    },
    description:{
        type:String
    },
    file_name:{
        type:String
    },
    date:{
        type:Date,
        default:new Date()
    }

})
module.exports=mongoose.model("my-user",users)
// {posts?.map((post,index)=>{
//     return <Card key={index} personDetails={personDetails}/>
//    })
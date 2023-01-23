const express= require("express")
const mongoose=require("mongoose")
const cors=require("cors")
const app=express()
const fileupload=require("express-fileupload")
const {v4:uniqueKeyGenerate}=require("uuid")
// const { res } = require("express")

const usersSchema=require("./users")
const key=uniqueKeyGenerate()
console.log(key)
const PORT=8080 ||  process.env.PORT 
const path=require("path")
const uri ="mongodb+srv://sidd_user:9049308871@cluster0.2kyskzb.mongodb.net/test"
mongoose.set("strictQuery",true)
mongoose.connect(uri,(err)=>{
    if(err){
        console.log("connection to mongoDB failed")
    }
    else{
        console.log("connected to mongoBD successfully")
    }
})
app.use(cors())
app.use(express.json())

app.use(fileupload())


app.listen(PORT,()=>{
    console.log("running on port",PORT)

})


app.post("/uploads",(req,res)=>{
    // console.log(req.body)
    // console.log(req.files)
    const{name,Location:location,Description:description}=req.body
    const {files}=req.files
    const fragments=files.name.split(".")
    const fileExtension=fragments[fragments.length-1]
    const unikey=uniqueKeyGenerate()
    const filename=unikey+"."+fileExtension
    if(['jpeg','jpg','png','svg'].includes(fileExtension)){
    files.mv("./uploads/"+filename, async (err)=>{
        if(err){

            res.json({message:err})
        }else{
          const user=new usersSchema({
            name,
            location,
            description,
            file_name:filename,
            // key,
            date:new Date()
          })
          try{
            await user.save()
            res.json({message:"pushed the data to database"})
          }
          catch(e){
            res.json({message:e})

          }
        }
    })
}
else{
    res.json({message:"please upload an image file"})
}
    res.send("success ")

})


app.get("/all", async (req,res)=>{
    try{
    const response= await  usersSchema.find()
    res.json({result:response})
    }
    catch(e){
        res.json({message:e})
    }
})


app.get("/images/:filename",(req,res)=>{
    res.sendFile(path.join(__dirname,`/uploads/${req.params.filename}`))

})
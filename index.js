const express=require("express")
const app=express()

const mongoose=require("mongoose")

mongoose.connect(`mongodb+srv://admin:admin@cluster0.tqy8ugo.mongodb.net/?retryWrites=true&w=majority`)

app.use(express.json())
const user=require("./Schema/contact1")

app.post("/POST/v1/contacts",async(req,res)=>{
    const {firstName,lastName,email,phone}=req.body
    if(!firstName){
        res.json({
            error : "Missing Required Field(s) : firstName"  
        })
        }
        else if(!lastName){
            res.json({
                error : "Missing Required Field(s) : lasttName"  
            })
        }
        else if(!email){
            res.json({
                error : "Missing Required Field(s) : email"  
            })
        }
    else{
    try{
           const data1=await user.findOne({email})
            if(data1){
              return  res.send({
                    status:"failed",
                    message:"email already exist, Please Use Another Email"
                })
            }
            
                const data2= await user.create({
                    firstName,
                    lastName,
                    email,
                    phone
                })
               return res.status(200).json({
                status:"success",
                data2
            })
            
           
    
           }
        
    catch(e){
        res.status(401).json({
            status:"success",
            message:e.message
        })
    }
}
})

app.get("/GET/v1/contacts",async(req,res)=>{
    try{
        const data=await user.find()
        res.status(200).json({
            status:"success",
            data
        })
    }
    catch(e){
        res.status(401).json({
            status:"success",
            message:e.message
        })
    }
})

app.get("/GET/v1/contacts/:id",async(req,res)=>{
    try{
        const data=await user.find({_id:req.params.id})
        res.status(200).json({
            status:"success",
            data
        })
    }
    catch(e){
        res.status(404).json({
            status:"success",
            message:e.message
        })
    }
})

app.delete("/DELETE/v1/contacts/:id",async(req,res)=>{
    try{
        const data=await user.deleteOne({_id:req.params.id})
        res.status(200).json({
            status:"success",
            data
        })
    }
    catch(e){
        res.status(404).json({
            status:"success",
            message:e.message
        })
    }
})

app.put("/PUT/v1/contacts/:id",async(req,res)=>{
    try{
        const data=await user.updateOne({_id:req.params.id},req.body)
        res.status(204).json({
            status:"success",
            data
        })
    }
    catch(e){
        res.status(404).json({
            status:"fail",
            message:"there is no contact with that ID"
        })
    }
})



app.listen(8000,()=>{console.log("Server is Up")})
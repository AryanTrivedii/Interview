const mongoose =require ('mongoose')
const url=`mongodb+srv://trivediutkarsh1:vOk8KG18lD9SCirX@cluster0.1ejsebk.mongodb.net/?retryWrites=true&w=majority`


const Connection=async()=>{
    try {
      await mongoose.connect(url,{   useNewUrlParser: true,
        useUnifiedTopology: true,})  
        console.log("Database Connected sucessfully")
    } catch (error) {
      console.log("Connection Failed")  
    }
}

module.exports=Connection
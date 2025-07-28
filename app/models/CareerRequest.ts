import mongoose from "mongoose";

const careerRequestSchema = new mongoose.Schema({
    firstname:{
        type:String,
        required:true
    },
    lastname:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true
    },
    phonenumber:{
        type:String,
        required:true
    },
    gender:{
        type:String,
        required:true
    },
    dateofbirth:{
        type:Date,
        required:true
    },
    nationality:{
        type:String,
        required:true
    },
    currentlocation:{
        type:String,
        required:true
    },
    workexperience:{
        type:String,
        required:true
    },
    position:{
        type:String,
        required:true
    },
    file:{
        type:String,
        required:true
    }
})

export default mongoose.models.CareerRequest || mongoose.model("CareerRequest", careerRequestSchema);
import mongoose from "mongoose";

const JobRequestSchema = new mongoose.Schema({
    firstName:{
        type:String,
        required:true
    },
    lastName:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true
    },
    phone:{
        type:String,
        required:true
    },
    gender:{
        type:String,
        required:true
    },
    dob:{
        type:String,
        required:true
    },
    nationality:{
        type:String,
        required:true
    },
    location:{
        type:String,
        required:true
    },
    experience:{
        type:String,
        required:true
    },
    skills:{
        type:String,
        required:true
    },
    resume:{
        type:String,
        required:true
    }
})


export default mongoose.models.JobRequest || mongoose.model("JobRequest",JobRequestSchema)


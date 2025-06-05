import mongoose from "mongoose";

const locationSchema = new mongoose.Schema({
    name:{
        type:String
    }
})

export default mongoose.models.Location || mongoose.model("Location",locationSchema)
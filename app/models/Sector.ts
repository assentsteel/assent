import mongoose from "mongoose";

const sectorSchema = new mongoose.Schema({
    name:{
        type:String
    }
})

export default mongoose.models.Sector || mongoose.model("Sector",sectorSchema)
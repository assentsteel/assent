import mongoose from "mongoose";

const sectorSchema = new mongoose.Schema({
    name:{
        type:String
    },
    // Project category slug this sector belongs to. Left empty, the sector
    // shows up on every category page (previous behaviour). Set it to scope
    // the sector to only that category's filter list.
    category:{
        type:String
    }
})

export default mongoose.models.Sector || mongoose.model("Sector",sectorSchema)
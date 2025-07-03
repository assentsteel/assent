import mongoose from "mongoose";

const awardSchema = new mongoose.Schema({
    banner:{type:String,required:true},
    bannerAlt:{type:String,required:true},
    metaTitle:{ type: String },
    metaDescription:{ type: String },
    pageTitle:{ type: String, required: true },
    awards:[
        {
            title:{ type: String, required: true },
            image: { type: String, required: true },
            imageAlt:{ type: String },
        }
    ]
});

export default mongoose.models.Award || mongoose.model("Award", awardSchema);
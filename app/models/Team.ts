import mongoose from "mongoose";

const teamSchema = new mongoose.Schema({
    metaTitle:{ type: String },
    metaDescription:{ type: String },
    banner:{type:String,required:true},
    bannerAlt:{type:String,required:true},
    pageTitle:{ type: String, required: true },
    teamSection:{
        title:{ type: String, required: true },
        description:{ type: String },
        items:[
            {
            name:{ type: String, required: true },
            designation:{ type: String, required: true },
            image:{ type: String, required: true },
            imageAlt:{ type: String },
            linkedIn:{ type: String },
            }
        ]
    }
})

export default mongoose.models.Team || mongoose.model("Team", teamSchema);

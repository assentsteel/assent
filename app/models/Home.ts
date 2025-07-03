import mongoose from "mongoose";

const homeSchema = new mongoose.Schema({
    metaTitle: {
        type: String,
    },
    metaDescription: {
        type: String,
    },
    banner: {
        type: String,
    },
    bannerAlt: {
        type: String,
    },
    pageTitle: {
        type: String,
        required: true
    },
    bannerSection:{
        items:[
            {
                video:{type:String,required:true},
                mainTitle:{type:String,required:true},
                subTitle:{type:String,required:true},
                poster:{type:String,required:true},
                primaryColorText:{type:String}
            }
        ]
    },
    firstSection:{
        mainTitle:{type:String,required:true},
        subTitle:{type:String,required:true},
        buttonText:{type:String,required:true},
        items:[
            {
                logo:{type:String,required:true},
                logoAlt:{type:String},
                number:{type:String,required:true},
                value:{type:String,required:true},
                suffix:{type:String}
            }
        ]
    },
    clientsSection:{
        items:[
            {
                logo:{type:String,required:true},
                logoAlt:{type:String}
            }
        ]
    },
    servicesSection:{
        title:{type:String,required:true},
        items:[
            {
                logo:{type:String,required:true},
                logoAlt:{type:String},
                title:{type:String,required:true},
                description:{type:String,required:true},
                image:{type:String,required:true},
                imageAlt:{type:String},
                slug:{type:String,required:true}
            }
        ]
    },
    sustainabilitySection:{
        title:{type:String,required:true},
        video:{type:String,required:true},
        poster:{type:String,required:true},
        description:{type:String,required:true},
        itemTitle:{type:String,required:true},
        items:[
            {
                logo:{type:String,required:true},
                logoAlt:{type:String},
                title:{type:String,required:true}
            }
        ]
    }
})

export default mongoose.models.Home || mongoose.model("Home", homeSchema);
// import mongoose from "mongoose";

// const globalPresenceSchema = new mongoose.Schema({
//     metaTitle:{
//         type:String
//     },
//     metaDescription:{
//         type:String
//     },
//     ogType:{
//         type:String
//     },
//     ogImage:{
//         type:String
//     },
//     banner:{
//         type:String
//     },
//     bannerAlt:{
//         type:String
//     },
//     pageTitle:{
//         type:String
//     },
//     firstSection:{
//         mainTitle:{
//             type:String
//         },
//         subTitle:{
//             type:String
//         },
//         description:{
//             type:String
//         }
//     },
//     secondSection:{
//         title:{
//             type:String
//         },
//         items:[
//             {
//                 number:{
//                     type:String
//                 },
//                 value:{
//                     type:String
//                 },
//                 description:{
//                     type:String
//                 }
//             }
//         ]
//     },
//     thirdSection:{
//         title:{
//             type:String
//         },
//         countries:[
//             {
//                 title:{
//                     type:String
//                 },
//                 image:{
//                     type:String
//                 },
//                 imageAlt:{
//                     type:String
//                 },
//                 slug:{
//                     type:String
//                 },
//                 metaTitle:{
//                     type:String
//                 },
//                 metaDescription:{
//                     type:String
//                 },
//                 ogType:{
//                     type:String
//                 },
//                 ogImage:{
//                     type:String
//                 },
//                 sections:{
//                     type:mongoose.Schema.Types.Mixed,
//                 }
//             }
//         ]
//     }
// })

// export default mongoose.models.GlobalPresence || mongoose.model("GlobalPresence", globalPresenceSchema);


import { Schema, model, models, Model } from "mongoose";

/* ───────────────────────────── */
/* TypeScript Interfaces (SAFE)  */
/* ───────────────────────────── */

export interface ICountry {
  title?: string;
  image?: string;
  imageAlt?: string;
  slug?: string;
  metaTitle?: string;
  metaDescription?: string;
  ogType?: string;
  ogImage?: string;
  sections?:{ type: Schema.Types.Mixed };
}

export interface IGlobalPresence {
  metaTitle?: string;
  metaDescription?: string;
  ogType?: string;
  ogImage?: string;
  banner?: string;
  bannerAlt?: string;
  pageTitle?: string;

  firstSection?: {
    mainTitle?: string;
    subTitle?: string;
    description?: string;
  };

  secondSection?: {
    title?: string;
    items?: {
      number?: string;
      value?: string;
      description?: string;
    }[];
  };

  thirdSection?: {
    title?: string;
    countries?: ICountry[];
  };
}

/* ───────────────────────────── */
/* Schema (UNCHANGED STRUCTURE)  */
/* ───────────────────────────── */

const globalPresenceSchema = new Schema({
  metaTitle: { type: String },
  metaDescription: { type: String },
  ogType: { type: String },
  ogImage: { type: String },
  banner: { type: String },
  bannerAlt: { type: String },
  pageTitle: { type: String },

  firstSection: {
    mainTitle: { type: String },
    subTitle: { type: String },
    description: { type: String },
  },

  secondSection: {
    title: { type: String },
    items: [
      {
        number: { type: String },
        value: { type: String },
        description: { type: String },
      },
    ],
  },

  thirdSection: {
    title: { type: String },
    countries: [
      {
        title: { type: String },
        image: { type: String },
        imageAlt: { type: String },
        slug: { type: String },
        metaTitle: { type: String },
        metaDescription: { type: String },
        ogType: { type: String },
        ogImage: { type: String },
        sections: { type: Schema.Types.Mixed },
      },
    ],
  },
});

/* ───────────────────────────── */
/* Properly Typed Model (SAFE)   */
/* ───────────────────────────── */

const GlobalPresence: Model<IGlobalPresence> =
  models.GlobalPresence ||
  model<IGlobalPresence>("GlobalPresence", globalPresenceSchema);

export default GlobalPresence;

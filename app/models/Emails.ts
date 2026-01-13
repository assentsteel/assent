import mongoose from "mongoose";

const emailsSchema = new mongoose.Schema({
    toEmailGeneral: String,
    toEmailRegistration: String,
    toEmailDownload: String,
    toEmailCareer:String
})

const Email = mongoose.models.Email || mongoose.model("Email", emailsSchema);

export default Email;
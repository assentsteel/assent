import mongoose from "mongoose";

const fileSchema = new mongoose.Schema({
  file: String,
  thumbnail: String,
  name: String,
});

const accreditationSchema = new mongoose.Schema({
  title: String,
  description: String,
  files: [fileSchema],
});

const Accreditation = mongoose.models.Accreditation || mongoose.model("Accreditation", accreditationSchema);

export default Accreditation;

import connectDB from "@/lib/mongodb";
import Email from "@/app/models/Emails";


export async function getToEmail(type: string) {
    await connectDB();
  
    const emails = await Email.findOne({});
    if (!emails) {
      throw new Error("Email configuration not found");
    }
  
    switch (type) {
      case "generalEnquiry":
        return emails.toEmailGeneral;
  
      case "registrationForm":
        return emails.toEmailRegistration;
  
      case "downloadForm":
        return emails.toEmailDownload;

        case "careerForm":
        return emails.toEmailCareer;
  
      default:
        return null;
    }
  }
  
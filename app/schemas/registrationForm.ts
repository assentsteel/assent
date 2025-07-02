import { z } from 'zod';
import xss from "xss"

export const registrationFormSchema = z.object({
    _id: z.preprocess(
        (val) => typeof val === "string" ? xss(val) : val,
        z.string().min(1, "ID is required")
      ),
    nameofthecompany: z.preprocess(
      (val) => typeof val === "string" ? xss(val) : val,
      z.string().min(3, "Name of the Company is required")
    ),

    typeofproduct: z.preprocess(
      (val) => typeof val === "string" ? xss(val) : val,
      z.string().min(3, "Type of Product is required")
    ),

    contactperson: z.preprocess(
      (val) => typeof val === "string" ? xss(val) : val,
      z.string().min(3, "Contact Person is required")
    ),

    designation: z.preprocess(
      (val) => typeof val === "string" ? xss(val) : val,
      z.string().min(3, "Designation is required")
    ),
  
    contactno: z.preprocess(
      (val) => {
        if (typeof val === "string" && val.trim() === "") return undefined
        return typeof val === "string" ? Number(val) : val
      },
      z
        .number({
          required_error: "Enter a valid phone number",
          invalid_type_error: "Enter a valid phone number",
        })
        .min(1000000000, { message: "Enter a valid phone number" })
    ),

    emailid: z.preprocess(
        (val) => typeof val === "string" ? xss(val) : val,
        z.string({ required_error: "Email ID is required" }).email("Invalid email")
      ),
      tradelicense: z
      .instanceof(File, { message: "Trade License is required" })
      .refine((file) => file.size <= 3 * 1024 * 1024, {
        message: "File must be smaller than 3MB",
      })
      .refine(
        (file) =>
          ["application/pdf", "application/msword", "application/vnd.openxmlformats-officedocument.wordprocessingml.document"].includes(file.type),
        {
          message: "Only PDF, DOC, and DOCX files are allowed",
        }
      ),
      vatregistration: z
      .instanceof(File, { message: "VAT Registration No is required" })
      .refine((file) => file.size <= 3 * 1024 * 1024, {
        message: "File must be smaller than 3MB",
      })
      .refine(
        (file) =>
          ["application/pdf", "application/msword", "application/vnd.openxmlformats-officedocument.wordprocessingml.document"].includes(file.type),
        {
          message: "Only PDF, DOC, and DOCX files are allowed",
        }
      ),
      type: z.preprocess(
        (val) => typeof val === "string" ? xss(val) : val,
        z.string().min(1, "Type is required")
      ),
  })
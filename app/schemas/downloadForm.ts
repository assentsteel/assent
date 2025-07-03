import { z } from 'zod';
import xss from "xss"

export const downloadFormSchema = z.object({
    name: z.preprocess(
      (val) => typeof val === "string" ? xss(val) : val,
      z.string().min(3, "Name is required")
    ),


    emailid: z.preprocess(
      (val) => typeof val === "string" ? xss(val) : val,
      z.string().email("Invalid email")
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
    designation: z.preprocess(
      (val) => typeof val === "string" ? xss(val) : val,
      z.string().min(3, "Designation is required")
    ),
    companyname: z.preprocess(
      (val) => typeof val === "string" ? xss(val) : val,
      z.string().min(3, "Company Name is required")
    ),

    requestType: z.preprocess(
        (val) => typeof val === "string" ? xss(val) : val,
        z.string({ required_error: "This is required" }).min(1, "This is required")
      ),
      purpose: z.preprocess(
        (val) => typeof val === "string" ? xss(val) : val,
        z.string({ required_error: "Purpose is required" }).min(1, "Purpose is required")
      ),
      type: z.preprocess(
        (val) => typeof val === "string" ? xss(val) : val,
        z.string().min(1, "Type is required")
      ),
  })

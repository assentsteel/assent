import { z } from 'zod';
import xss from "xss"

export const generalEnquirySchema = z.object({
    // _id: z.preprocess(
    //     (val) => typeof val === "string" ? xss(val) : val,
    //     z.string().min(1, "ID is required")
    //   ),
    name: z.preprocess(
      (val) => typeof val === "string" ? xss(val) : val,
      z.string().min(3, "Name is required")
    ),

    emailid: z.preprocess(
      (val) => typeof val === "string" ? xss(val) : val,
      z.string().email("Invalid email")
    ),
  
    contactnumber:z.string()
    .min(7, "Invalid phone number")
    .max(15, "Invalid phone number")
    .regex(
      /^(\+?\d{1,4}[\s-]?)?(\(?\d{2,5}\)?[\s-]?)?\d{5,10}$/,
      "Invalid phone number"
    ),

    type: z.literal("generalEnquiry"),
    message: z.preprocess(
        (val) => typeof val === "string" ? xss(val) : val,
        z.string({ required_error: "Message is required" }).min(1, "Message is required")
      ),
  })
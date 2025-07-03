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
  
    contactnumber: z.preprocess(
      (val) => {
        if (typeof val === "string" && val.trim() === "") return undefined
        return typeof val === "string" ? Number(val) : val
      },
      z
        .number({
          required_error: "Enter a valid phone number",
          invalid_type_error: "Enter a valid phone number",
        })
        .refine((val) => /^\d{10}$/.test(val.toString()), { message: "Phone number must be exactly 10 digits" })
    ),

type: z.preprocess(
    (val) => typeof val === "string" ? xss(val) : val,
    z.string().min(1, "Type is required")
  ),
    message: z.preprocess(
        (val) => typeof val === "string" ? xss(val) : val,
        z.string({ required_error: "Message is required" }).min(1, "Message is required")
      ),
  })
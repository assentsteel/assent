import { z } from 'zod';
import xss from "xss"

export const careerFormSchema = z.object({
    firstname: z.preprocess(
      (val) => typeof val === "string" ? xss(val) : val,
      z.string().min(3, "First Name is required")
    ),

    lastname: z.preprocess(
      (val) => typeof val === "string" ? xss(val) : val,
      z.string().min(3, "Last Name is required")
    ),

    email: z.preprocess(
      (val) => typeof val === "string" ? xss(val) : val,
      z.string().email("Invalid email")
    ),
  
    phonenumber: z.preprocess(
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

    gender: z.preprocess(
        (val) => typeof val === "string" ? xss(val) : val,
        z.string({ required_error: "Gender is required" }).min(1, "Gender is required")
      ),

    dateofbirth: z.preprocess(
      (val) => typeof val === "string" ? xss(val) : val,
      z.string().min(1, "Date of Birth is required")
    ),

    nationality: z.preprocess(
      (val) => typeof val === "string" ? xss(val) : val,
      z.string().min(1, "Nationality is required")
    ),

    currentlocation: z.preprocess(
      (val) => typeof val === "string" ? xss(val) : val,
      z.string().min(1, "Current Location is required")
    ),

    workexperience: z.preprocess(
        (val) => {
          if (typeof val === "string" && val.trim() === "") return undefined
          return typeof val === "string" ? Number(val) : val
        },
        z
          .number({
            required_error: "Experience is required",
            invalid_type_error: "Experience is required",
          })
          .min(1, { message: "Experience is required" })
      ),
      file: z
      .instanceof(File, { message: "Resume is required" })
      .refine((file) => file.size <= 10 * 1024 * 1024, {
        message: "File must be smaller than 10MB",
      })
      .refine(
        (file) =>
          ["application/pdf", "application/msword", "application/vnd.openxmlformats-officedocument.wordprocessingml.document"].includes(file.type),
        {
          message: "Only PDF, DOC, and DOCX files are allowed",
        }
      ),
      position: z.preprocess(
        (val) => typeof val === "string" ? xss(val) : val,
        z.string({ required_error: "Position is required" }).min(1, "Position is required")
      )
  })

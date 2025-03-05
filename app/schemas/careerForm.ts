import { z } from 'zod';

export const careerForm = z.object({
    firstName: z.string().min(2, { message: 'First name is required' }),
    lastName: z.string().min(2, { message: 'Last name is required' }),
    email: z.string().email(),
    phone: z.preprocess(
        (val) => (typeof val === "string" ? Number(val) : val), // Convert string to number
        z.number().positive().min(1000000000, { message: "Enter a valid phone number" }) // Ensure it's a valid number
      ),
    gender:z.enum(["male","female","other"],{message:"Provide a gender"}),
    dob: z.preprocess(
        (val) => (typeof val === "string" ? new Date(val) : val), // Convert string to Date
        z.date({ message: "Provide a valid date" })
      ),
    nationality:z.string().min(2,{message:"Provide a nationality"}),
    location:z.string().min(2,{message:"Provide a location"}),
    experience: z.preprocess(
        (val) => (typeof val === "string" ? Number(val) : val), // Convert string to number
        z.number().min(1, { message: "Enter your years of experience" }) // Ensure it's a positive number
      ),
    skills:z.string().min(3,{message:"Enter valid skills"}),
    resume:z.string()
  });
import JobRequest from "@/models/JobRequest";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
    try {
      
        const { firstName,
        lastName,
        email,
        phone,
        gender,
        dob,
        nationality,
        location,
        experience,
        skills,
        resume } = await request.json();

      const jobRequest = await JobRequest.create({ firstName,
        lastName,
        email,
        phone,
        gender,
        dob,
        nationality,
        location,
        experience,
        skills,
        resume });

      return NextResponse.json({ data: jobRequest, success: true }, { status: 200 });
    } catch (error) {
      console.error("Error creating job request:", error);
      return NextResponse.json({ error: "Failed to create job request" }, { status: 500 });
    }
  }
  
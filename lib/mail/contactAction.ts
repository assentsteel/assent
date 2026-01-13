"use server";

import { sendMail } from "./sendMail";

import { GeneralEnquiryEmail } from "@/templates/GeneralEnquiryEmail";
import { RegistrationFormEmail } from "@/templates/RegistrationFormEmail";
import { DownloadFormEmail } from "@/templates/DownloadFormEmail";
import { CareerFormEmail } from "@/templates/CareerFormEmail";
import { getToEmail } from "@/app/helpers/getToEmail";


interface GeneralEnquiry {
  type: "generalEnquiry";
  name: string;
  emailid: string;
  contactnumber: number;
  message: string;
}

interface RegistrationForm {
  type: "registrationForm";
  nameofthecompany: string;
  typeofproduct: string;
  contactperson: string;
  designation: string;
  contactno: string;
  emailid: string;
  tradelicense: string;
  vatregistration: string;
}

interface DownloadForm {
  type: "downloadForm";
  name: string;
  emailid: string;
  contactno: string;
  designation: string;
  companyname: string;
  requestType: string;
  purpose: string;
}

interface CareerForm {
  type: "careerForm";
  firstname: string;
  lastname: string;
  email: string;
  phonenumber: string;
  gender: string;
  dateofbirth: string | Date;
  nationality: string;
  currentlocation: string;
  workexperience: string;
  position: string;
  file: string; // resume / CV URL or filename
}



export async function sendContactAction(
  data: GeneralEnquiry | RegistrationForm | DownloadForm | CareerForm
) {

  const toEmail = await getToEmail(data.type);

  if (!toEmail) {
    throw new Error(`No recipient email configured for ${data.type}`);
  }


  switch (data.type) {
    case "generalEnquiry":
      await sendMail({
        to: toEmail,
        subject: "New General Enquiry",
        template: (p) => GeneralEnquiryEmail(p),
        props: {
          name: data.name,
          email: data.emailid,
          phone: data.contactnumber,
          message: data.message,
        },
      });
      break;

    case "registrationForm":
      await sendMail({
        to: toEmail,
        subject: "New Registration Form Submission",
        template: (p) => RegistrationFormEmail(p),
        props: {
          contactPerson: data.contactperson,
          email: data.emailid,
          phone: data.contactno,
          companyName: data.nameofthecompany,
          productType: data.typeofproduct,
          designation: data.designation,
          tradeLicense: data.tradelicense,
          vatRegistration: data.vatregistration,
        },
      });
      break;

    case "downloadForm":
      await sendMail({
        to: toEmail,
        subject: "New Download Request",
        template: (p) => DownloadFormEmail(p),
        props: {
          name: data.name,
          email: data.emailid,
          phone: data.contactno,
          companyName: data.companyname,
          designation: data.designation,
          requestType: data.requestType,
          purpose: data.purpose,
        },
      });
      break;

      case "careerForm":
  await sendMail({
    to: toEmail,
    subject: "New Career Application",
    template: (p) => CareerFormEmail(p),
    props: {
      firstname: data.firstname,
      lastname: data.lastname,
      email: data.email,
      phonenumber: data.phonenumber,
      gender: data.gender,
      dateofbirth: data.dateofbirth,
      nationality: data.nationality,
      currentlocation: data.currentlocation,
      workexperience: data.workexperience,
      position: data.position,
      file: data.file,
    },
  });
  break;
  }
}


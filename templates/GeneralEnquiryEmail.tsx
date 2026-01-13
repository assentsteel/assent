import { ReactElement } from "react";
import {
  Html,
  Head,
  Preview,
  Body,
  Container,
  Text,
  Hr,
  Img,
} from "@react-email/components";

interface GeneralEnquiryEmailProps {
    name: string;
    email: string;
    phone: string | number;
    message: string;
  }
  
  export function GeneralEnquiryEmail({
    name,
    email,
    phone,
    message,
  }: GeneralEnquiryEmailProps):ReactElement {
    return (
      <Html>
        <Head/>
        <Body>
      <div style={{ fontFamily: "Arial, sans-serif", lineHeight: "1.6" }}>
        <h2>New General Enquiry</h2>
  
        <p><strong>Name:</strong> {name}</p>
        <p><strong>Email:</strong> {email}</p>
        <p><strong>Phone:</strong> {phone}</p>
  
        <hr />
  
        <p><strong>Message:</strong></p>
        <p>{message}</p>
      </div>
      </Body>
      </Html>
    );
  }
  
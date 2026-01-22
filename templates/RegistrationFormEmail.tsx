import { ReactElement } from "react";
import {
  Html,
  Head,
  Preview,
  Body,
  Container,
  Text,
  Hr,
} from "@react-email/components";

interface RegistrationFormEmailProps {
  contactPerson: string;
  email: string;
  phone: string;
  companyName: string;
  productType: string;
  designation: string;
  tradeLicense: string;
  vatRegistration: string;
}

export function RegistrationFormEmail({
  contactPerson,
  email,
  phone,
  companyName,
  productType,
  designation,
  tradeLicense,
  vatRegistration,
}: RegistrationFormEmailProps): ReactElement {
  return (
    <Html>
      <Head />
      <Preview>New registration submission from {contactPerson}</Preview>

      <Body
        style={{
          fontFamily: "Arial, sans-serif",
          backgroundColor: "#f4f4f7",
          margin: 0,
          padding: 0,
        }}
      >
        <Container
          style={{
            backgroundColor: "#ffffff",
            padding: "30px",
            borderRadius: "10px",
            maxWidth: "600px",
            margin: "30px auto",
            boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
          }}
        >
          {/* Header */}
          <Text
            style={{
              fontSize: "24px",
              fontWeight: "bold",
              marginBottom: "30px",
              color: "#111111",
              textAlign: "center",
            }}
          >
            New Registration Form Submission
          </Text>

          {/* Contact Details */}
          <Text style={{ fontSize: "16px", marginBottom: "10px", color: "#111111" }}>
            <strong>Contact Person:</strong> {contactPerson}
          </Text>

          <Text style={{ fontSize: "16px", marginBottom: "10px", color: "#111111" }}>
            <strong>Email:</strong> {email}
          </Text>

          <Text style={{ fontSize: "16px", marginBottom: "20px", color: "#111111" }}>
            <strong>Phone:</strong> {phone}
          </Text>

          <Hr style={{ borderColor: "#e0e0e0", margin: "20px 0" }} />

          {/* Company Details */}
          <Text style={{ fontSize: "16px", marginBottom: "10px", color: "#111111" }}>
            <strong>Company Name:</strong> {companyName}
          </Text>

          <Text style={{ fontSize: "16px", marginBottom: "10px", color: "#111111" }}>
            <strong>Product Type:</strong> {productType}
          </Text>

          <Text style={{ fontSize: "16px", marginBottom: "10px", color: "#111111" }}>
            <strong>Designation:</strong> {designation}
          </Text>

          <Text style={{ fontSize: "16px", marginBottom: "10px", color: "#111111" }}>
            <strong>Trade License:</strong> {tradeLicense}
          </Text>

          <Text
            style={{
              fontSize: "16px",
              marginBottom: "0",
              color: "#111111",
            }}
          >
            <strong>VAT Registration:</strong> {vatRegistration}
          </Text>
        </Container>
      </Body>
    </Html>
  );
}

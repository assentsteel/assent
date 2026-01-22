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

interface DownloadFormEmailProps {
  name: string;
  email: string;
  phone: string;
  companyName: string;
  designation: string;
  requestType: string;
  purpose: string;
}

export function DownloadFormEmail({
  name,
  email,
  phone,
  companyName,
  designation,
  requestType,
  purpose,
}: DownloadFormEmailProps): ReactElement {
  return (
    <Html>
      <Head />
      <Preview>New download request from {name}</Preview>

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
            New Download Request
          </Text>

          {/* Personal Details */}
          <Text style={{ fontSize: "16px", marginBottom: "10px", color: "#111111" }}>
            <strong>Name:</strong> {name}
          </Text>

          <Text style={{ fontSize: "16px", marginBottom: "10px", color: "#111111" }}>
            <strong>Email:</strong> {email}
          </Text>

          <Text style={{ fontSize: "16px", marginBottom: "20px", color: "#111111" }}>
            <strong>Phone:</strong> {phone}
          </Text>

          <Hr style={{ borderColor: "#e0e0e0", margin: "20px 0" }} />

          {/* Company / Request Details */}
          <Text style={{ fontSize: "16px", marginBottom: "10px", color: "#111111" }}>
            <strong>Company Name:</strong> {companyName}
          </Text>

          <Text style={{ fontSize: "16px", marginBottom: "10px", color: "#111111" }}>
            <strong>Designation:</strong> {designation}
          </Text>

          <Text style={{ fontSize: "16px", marginBottom: "10px", color: "#111111" }}>
            <strong>Request Type:</strong> {requestType}
          </Text>

          <Text
            style={{
              fontSize: "16px",
              marginBottom: "0",
              color: "#111111",
            }}
          >
            <strong>Purpose:</strong> {purpose}
          </Text>
        </Container>
      </Body>
    </Html>
  );
}

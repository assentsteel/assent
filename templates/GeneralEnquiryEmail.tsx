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
}: GeneralEnquiryEmailProps): ReactElement {
  return (
    <Html>
      <Head />
      <Preview>New general enquiry from {name}</Preview>

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
            New General Enquiry
          </Text>

          {/* Details */}
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

          {/* Message */}
          <Text
            style={{
              fontSize: "16px",
              fontWeight: "bold",
              marginBottom: "10px",
              color: "#111111",
            }}
          >
            Message:
          </Text>

          <Text
            style={{
              fontSize: "15px",
              color: "#333333",
              lineHeight: "1.6",
              whiteSpace: "pre-line",
            }}
          >
            {message}
          </Text>

          <Hr style={{ borderColor: "#e0e0e0", margin: "30px 0" }} />

        </Container>
      </Body>
    </Html>
  );
}

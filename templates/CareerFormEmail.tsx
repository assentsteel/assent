import {
    Html,
    Head,
    Preview,
    Body,
    Container,
    Text,
    Hr,
  } from "@react-email/components";
  import { ReactElement } from "react";
  
  interface CareerFormEmailProps {
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
    file: string;
  }
  
  export function CareerFormEmail({
    firstname,
    lastname,
    email,
    phonenumber,
    gender,
    dateofbirth,
    nationality,
    currentlocation,
    workexperience,
    position,
    file,
  }: CareerFormEmailProps): ReactElement {
    return (
      <Html>
        <Head />
        <Preview>New Career Application</Preview>
  
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
              New Career Application
            </Text>
  
            {/* Personal Info */}
            <Text style={textStyle}>
              <strong>Name:</strong> {firstname} {lastname}
            </Text>
            <Text style={textStyle}>
              <strong>Email:</strong> {email}
            </Text>
            <Text style={textStyle}>
              <strong>Phone:</strong> {phonenumber}
            </Text>
            <Text style={textStyle}>
              <strong>Gender:</strong> {gender}
            </Text>
            <Text style={textStyle}>
              <strong>Date of Birth:</strong>{" "}
              {typeof dateofbirth === "string"
                ? dateofbirth
                : dateofbirth.toDateString()}
            </Text>
  
            <Hr style={hrStyle} />
  
            {/* Professional Info */}
            <Text style={textStyle}>
              <strong>Nationality:</strong> {nationality}
            </Text>
            <Text style={textStyle}>
              <strong>Current Location:</strong> {currentlocation}
            </Text>
            <Text style={textStyle}>
              <strong>Work Experience:</strong> {workexperience}
            </Text>
            <Text style={textStyle}>
              <strong>Applied Position:</strong> {position}
            </Text>
  
            <Hr style={hrStyle} />
  
            {/* Resume */}
            <Text style={textStyle}>
              <strong>Resume:</strong>{" "}
              <a
                href={file}
                target="_blank"
                rel="noopener noreferrer"
                style={{ color: "#2563eb", textDecoration: "none" }}
              >
                View / Download
              </a>
            </Text>
          </Container>
        </Body>
      </Html>
    );
  }
  
  const textStyle = {
    fontSize: "16px",
    marginBottom: "10px",
    color: "#111111",
  };
  
  const hrStyle = {
    borderColor: "#e0e0e0",
    margin: "20px 0",
  };
  
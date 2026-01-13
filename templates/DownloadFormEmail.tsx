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
  }: DownloadFormEmailProps) {
    return (
      <div style={{ fontFamily: "Arial, sans-serif", lineHeight: "1.6" }}>
        <h2>New Download Request</h2>
  
        <p><strong>Name:</strong> {name}</p>
        <p><strong>Email:</strong> {email}</p>
        <p><strong>Phone:</strong> {phone}</p>
  
        <hr />
  
        <p><strong>Company Name:</strong> {companyName}</p>
        <p><strong>Designation:</strong> {designation}</p>
        <p><strong>Request Type:</strong> {requestType}</p>
        <p><strong>Purpose:</strong> {purpose}</p>
      </div>
    );
  }
  
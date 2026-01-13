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
  }: RegistrationFormEmailProps) {
    return (
      <div style={{ fontFamily: "Arial, sans-serif", lineHeight: "1.6" }}>
        <h2>New Registration Form Submission</h2>
  
        <p><strong>Contact Person:</strong> {contactPerson}</p>
        <p><strong>Email:</strong> {email}</p>
        <p><strong>Phone:</strong> {phone}</p>
  
        <hr />
  
        <p><strong>Company Name:</strong> {companyName}</p>
        <p><strong>Product Type:</strong> {productType}</p>
        <p><strong>Designation:</strong> {designation}</p>
        <p><strong>Trade License:</strong> {tradeLicense}</p>
        <p><strong>VAT Registration:</strong> {vatRegistration}</p>
      </div>
    );
  }
  
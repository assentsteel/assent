// lib/mail/sendMail.ts
import { resend } from "./mailer";
import type { ReactElement } from "react";

export async function sendMail<T>({
  to,
  subject,
  template,
  props,
}: {
  to: string | string[];
  subject: string;
  template: (props: T) => ReactElement;
  props: T;
}) {
  const reactElement = template(props);

  console.log(reactElement)

  const { data, error } = await resend.emails.send({
    from: "Enquiry <enquiry@assentsteel.com>",
    to,
    subject,
    react: reactElement,
  });

  if (error) {
    console.error("Resend API error:", error);
    throw new Error(`Email sending failed: ${JSON.stringify(error)}`);
  }

  return data;
}

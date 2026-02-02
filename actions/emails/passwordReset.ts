import {render} from "@react-email/components";
import {VerifyUserPassword} from "@/emails/PasswordResetEmail";
import {Resend} from "resend";

const resend = new Resend(process.env.RESEND_030_WEB_API_KEY!);

export const PasswordReset = async ({
  username,
  from,
  to,
  subject,
  verificationUrl,
}: {
  username: string;
  from: string;
  to: string;
  subject: string;
  verificationUrl: string;
}) => {
  const PasswordResetEmailHtml = await render(
    VerifyUserPassword({verificationUrl, username}),
  );

  const mailOptions = {
    from: from,
    to: to.toLocaleLowerCase().trim(),
    subject: subject.trim(),
    html: PasswordResetEmailHtml,
  };

  try {
    const info = await resend.emails.send(mailOptions);
    return info;
  } catch (error) {
    console.error("Error sending email: ", error);
    return {
      error: "Failed to send email",
    };
  }
};

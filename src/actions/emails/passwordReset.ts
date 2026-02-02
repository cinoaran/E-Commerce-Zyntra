import {render} from "@react-email/components";
import {VerifyUserPassword} from "@/emails/PasswordResetEmail";
import {Resend} from "resend";

const resend = new Resend(process.env.RESEND_030_WEB_API_KEY!);

export const PasswordReset = async ({
  username, // ← username nur für Email-Template, NICHT Resend!
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
    VerifyUserPassword({verificationUrl, username}), // ✅ username kommt hier rein
  );

  const {data, error} = await resend.emails.send({
    // ✅ Destructure für bessere Error-Handling
    from,
    to: to.toLocaleLowerCase().trim(),
    subject: subject.trim(),
    html: PasswordResetEmailHtml,
  });

  if (error) {
    console.error("Resend Error:", error);
    throw new Error("Failed to send reset email");
  }

  console.log("✅ Password reset email sent successfully");
  return data;
};

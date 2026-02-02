import {render} from "@react-email/components";
import {VerifyUserEmail} from "@/emails/VerifyEmailAddress";
import {Resend} from "resend";

const resend = new Resend(process.env.RESEND_030_WEB_API_KEY!);

export const verifyEmail = async ({
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
  const VerifyEmailAddressHtml = await render(
    VerifyUserEmail({verificationUrl, username})
  );

  const mailOptions = {
    from: from,
    to: to.toLocaleLowerCase().trim(),
    subject: subject.trim(),
    html: VerifyEmailAddressHtml,
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

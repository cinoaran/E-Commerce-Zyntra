import {
  Body,
  Button,
  Container,
  Head,
  Heading,
  Hr,
  Html,
  Link,
  Preview,
  Section,
  Tailwind,
  Text,
} from "@react-email/components";

interface VerifyEmailProps {
  username?: string;
  verificationUrl?: string;
}
const {NEXT_PUBLIC_APP_NAME, NEXT_PUBLIC_APP_NAME_SECOND} = process.env;
const appName =
  NEXT_PUBLIC_APP_NAME || NEXT_PUBLIC_APP_NAME_SECOND
    ? `${NEXT_PUBLIC_APP_NAME} ${NEXT_PUBLIC_APP_NAME_SECOND}`
    : "Company Name";

export const VerifyUserEmail = ({
  username,
  verificationUrl,
}: VerifyEmailProps) => {
  const previewText = `${appName} verify your email address to access your account.`;
  return (
    <Html>
      <Head />
      <Preview>{previewText}</Preview>
      <Tailwind>
        <Body className="mx-auto my-auto bg-white px-2 font-sans">
          <Container className="mx-auto my-[40px] max-w-[465px] p-[20px]">
            <Heading className="mx-0 my-[30px] text-center font-normal text-[24px] text-black">
              Verify your email on{" "}
              <p className="text-[24px] font-normal text-black">
                <strong className="uppercase">{appName}</strong>
              </p>
            </Heading>
            <Text className="text-[14px] text-black leading-[24px]">
              Hello <span className="font-semibold capitalize">{username}</span>
              , We provide you with a simple way to verify your email address.
              Click the button below to get access to your account.
            </Text>
            <Section className="mt-[32px] mb-[32px] text-center">
              <Button
                className="bg-[#000000] px-5 py-3 text-center font-semibold text-[12px] text-white w-full"
                href={verificationUrl}
              >
                Verify your email
              </Button>
            </Section>
            <Text className="text-[14px] text-black leading-[24px]">
              <strong>Or, copy and paste this URL into your browser:</strong>{" "}
              <Link href={verificationUrl} className="text-blue-600">
                {verificationUrl}
              </Link>
            </Text>
            <Hr className="mx-0 my-[26px] w-full border border-[#eaeaea] border-solid" />
            <Text className="text-[#666666] text-[12px] leading-[24px]">
              This email was sent to you by {appName}. If you did not request
              this email, please ignore it.
            </Text>
          </Container>
        </Body>
      </Tailwind>
    </Html>
  );
};

export default VerifyUserEmail;

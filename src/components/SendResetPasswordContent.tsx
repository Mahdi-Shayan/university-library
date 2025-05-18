import {
  Html,
  Text,
  Heading,
  Container,
  Section,
} from "@react-email/components";

type SendResetPasswordEmailProps = {
  code: string;
};

export function SendResetPasswordEmail({
  code,
}: SendResetPasswordEmailProps) {
  return (
    <Html>
      <Container
        style={{
          padding: "20px",
          fontFamily: "Helvetica, Arial, sans-serif",
          backgroundColor: "#ffffff",
        }}
      >
        <Section>
          <Heading
            style={{
              fontSize: "24px",
              fontWeight: "600",
              marginBottom: "20px",
            }}
          >
            Reset Your Password
          </Heading>

          <Text
            style={{
              fontSize: "16px",
              color: "#444",
              marginBottom: "12px",
              lineHeight: "1.5",
            }}
          >
            We received a request to reset your password. If you made this
            request, use the verification code below to proceed.
          </Text>

          <Text
            style={{
              fontSize: "20px",
              fontWeight: "bold",
              color: "#000",
              backgroundColor: "#f4f4f4",
              padding: "10px 16px",
              borderRadius: "6px",
              border: "1px dashed #ccc",
              textAlign: "center",
              letterSpacing: "2px",
              userSelect: "text",
            }}
          >
            {code}
          </Text>

          <Text
            style={{
              fontSize: "16px",
              color: "#444",
              marginBottom: "12px",
              lineHeight: "1.5",
            }}
          >
            If you did not request a password reset, please ignore this
            email. Your account is still secure.
          </Text>

          <Text
            style={{
              fontSize: "16px",
              color: "#444",
              marginTop: "20px",
              lineHeight: "1.5",
            }}
          >
            Thank you for using our service. <br />– The Support Team
          </Text>
        </Section>
      </Container>
    </Html>
  );
}

export default SendResetPasswordEmail;

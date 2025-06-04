import {
  Body,
  Container,
  Head,
  Hr,
  Html,
  Section,
  Text,
} from "@react-email/components";
import { EmailType } from "../../../types";
import dayjs from "dayjs";

interface Props {
  type: EmailType;
  userName: string;
  dueDate: Date;
  borrowDate: Date;
}

function EmailTemplate({ type, userName, dueDate, borrowDate }: Props) {
  function formatDate(date: Date) {
    return dayjs(date).format("MMMM D, YYYY");
  }

  const titleTxt =
    type === "welcome"
      ? "Welcome to BookWise, Your Reading Companion!"
      : type === "account-approval"
        ? "Your BookWise Account Has Been Approved!"
        : type === "reminder"
          ? `Reminder: [Book Title] is Due Soon!`
          : type === "borrowed"
            ? "You’ve Borrowed a Book!"
            : type === "thanks"
              ? `Thank You for Returning [Book Title]!`
              : "";

  const contentTxt =
    type === "welcome"
      ? "Welcome to BookWise! We're excited to have you join our community of book enthusiasts. Explore a wide range of books, borrow with ease, and manage your reading journey seamlessly."
      : type === "account-approval"
        ? "Congratulations! Your BookWise account has been approved. You can now browse our library, borrow books, and enjoy all the features of your new account."
        : type === "reminder"
          ? `Just a reminder that [Book Title] is due for return on [Due Date]. Kindly return it on time to avoid late fees.`
          : type === "borrowed"
            ? "You’ve successfully borrowed [Book Title]. Here are the details:"
            : "We’ve successfully received your return of [Book Title]. Thank you for returning it on time.";

  const btnTxt =
    type === "borrowed"
      ? "View all borrowed books"
      : type === "thanks"
        ? "Explore New Books"
        : null;

  const btnDesTxt =
    type === "borrowed"
      ? "Enjoy your reading, and don’t forget to return the book on time!"
      : type === "thanks"
        ? "Looking for your next read? Browse our collection and borrow your next favorite book!"
        : "";

  const footerText =
    type === "welcome" || type === "borrowed"
      ? "Happy reading"
      : type === "account-approval"
        ? "Welcome aboard"
        : type === "reminder"
          ? "Keep reading"
          : "Happy exploring";

  const body = {
    background: "#111624",
    color: "#D6E0FF",
    padding: "20px",
    paddingBottom: "30px",
    fontWeight: "700px",
  };

  const container = {
    display: "flex",
    gap: "12px",
  };

  const header = {
    display: "flex",
    alignItems: "center",
    gap: "3px",
  };

  const btn = {
    display: "inline-block",
    background: "#EED1AC",
    color: "#111624",
    padding: "10px 20px",
    borderRadius: "5px",
    fontSize: "14px",
    fontWeight: "600",
    textDecoration: "none",
    cursor: "pointer",
    margin: "10px 0",
  };

  const title = {
    color: "white",
    fontWeight: "700",
    fontSize: "24px",
  };

  return (
    <Html>
      <Head />
      <Body style={body}>
        <Container style={{ ...container, flexDirection: "column" }}>
          <Section style={header}>
            <svg
              width="40"
              height="32"
              viewBox="0 0 40 32"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                opacity="0.5"
                d="M20 9.99988V31.8888C29.8889 26.4443 38.2223 29.9999 40 31.9999V9.99987C33 5.99986 21.8148 6.62951 20 9.99988Z"
                fill="#DBE5FF"
              />
              <path
                d="M20 10.0001V31.889C26.3333 23.6668 34.3334 25.6668 36.8889 26.1112V4.33343C31 2.44453 21.8148 6.62973 20 10.0001Z"
                fill="#F0F4FF"
              />
              <path
                d="M20 9.74947V31.5556C23.4089 23.6965 32.4261 22.9217 34.2222 23.0324V0.00865083C29.9996 -0.257008 20.8797 5.65389 20 9.74947Z"
                fill="url(#paint0_linear_5984_2811)"
              />
              <path
                opacity="0.5"
                d="M20 9.99988V31.8888C10.1111 26.4443 1.77775 29.9999 -3.43323e-05 31.9999V9.99987C6.99998 5.99986 18.1852 6.62951 20 9.99988Z"
                fill="#DBE5FF"
              />
              <path
                d="M20 10.0001V31.889C13.6667 23.6668 5.66664 25.6668 3.11108 26.1112V4.33343C8.99998 2.44453 18.1852 6.62973 20 10.0001Z"
                fill="#F0F4FF"
              />
              <path
                d="M20 9.74947V31.5556C16.5911 23.6965 7.57386 22.9217 5.77775 23.0324V0.00865083C10.0004 -0.257008 19.1203 5.65389 20 9.74947Z"
                fill="url(#paint1_linear_5984_2811)"
              />
              <defs>
                <linearGradient
                  id="paint0_linear_5984_2811"
                  x1="20"
                  y1="18.7778"
                  x2="34.2222"
                  y2="18.7778"
                  gradientUnits="userSpaceOnUse"
                >
                  <stop stop-color="#FAFBFF" stop-opacity="0.49" />
                  <stop offset="1" stop-color="#FAFBFF" />
                </linearGradient>
                <linearGradient
                  id="paint1_linear_5984_2811"
                  x1="20"
                  y1="18.7778"
                  x2="5.77775"
                  y2="18.7778"
                  gradientUnits="userSpaceOnUse"
                >
                  <stop stop-color="#FAFBFF" stop-opacity="0.49" />
                  <stop offset="1" stop-color="#FAFBFF" />
                </linearGradient>
              </defs>
            </svg>
            <Text
              style={{
                color: "white",
                fontWeight: "700",
                fontSize: "26px",
              }}
            >
              BookWise
            </Text>
          </Section>
          <Hr style={{ backgroundColor: "gray", margin: "20px 0" }} />
          <Section style={{ ...container, flexDirection: "column" }}>
            <Text style={title}>{titleTxt}</Text>
            <Text>Hi {userName},</Text>
            <Section>
              <Text>{contentTxt}</Text>
              {type === "borrowed" && (
                <ul style={{ padding: 0 }}>
                  <li>Borrowed Date: {formatDate(borrowDate)}</li>
                  <li>Due Date: {formatDate(dueDate)}</li>
                </ul>
              )}
            </Section>
            <Text>{btnDesTxt}</Text>
            {btnTxt && (
              <a
                target="_blank"
                style={btn}
                href={
                  type === "thanks"
                    ? "https://ms-university-library.netlify.app"
                    : "https://ms-university-library.netlify.app/my-profile"
                }
              >
                {btnTxt}
              </a>
            )}
            <Section style={{ margin: "30px 0" }}>
              <Text style={{ margin: 0 }}>{footerText}</Text>
              <Text style={{ margin: 0 }}>The BookWise Team</Text>
            </Section>
          </Section>
        </Container>
      </Body>
    </Html>
  );
}
export default EmailTemplate;

import config from "@/lib/config";
import { ReceiptParams } from "../../../types";
import {
  Html,
  Head,
  Preview,
  Body,
  Container,
  Section,
  Text,
  Img,
  Hr,
} from "@react-email/components";
import dayjs from "dayjs";
import * as React from "react";

const baseUrl = config.env.apiEndpoint;

function ReceiptEmailTemplate({ body }: ReceiptParams) {
  const main = {
    backgroundColor: "#1B1F2A",
    color: "#ffffff",
    fontFamily: "Arial, sans-serif",
    padding: "20px",
  };

  const container = {
    backgroundColor: "#232839",
    maxWidth: "600px",
    margin: "0 auto",
    borderRadius: "6px",
    padding: "40px",
  };

  const header = {
    marginBottom: "24px",
  };

  const logo = {
    fontSize: "28px",
    fontWeight: "600",
    marginBottom: "8px",
  };

  const receiptTitle = {
    fontSize: "20px",
    fontWeight: "600",
    marginBottom: "10px",
  };

  const infoSection = {
    marginBottom: "16px",
  };

  const infoText = {
    margin: "4px 0",
  };

  const highlight = {
    color: "#eed1ac",
  };

  const divider = {
    borderTop: "2px solid #D6E0FF1A",
    margin: "24px 0",
  };

  const sectionTitle = {
    fontSize: "20px",
    fontWeight: "600",
    marginBottom: "16px",
  };

  const gridContainer = {
    width: "100%",
    display: "grid",
    gridTemplateColumns: "repeat(2, minmax(0, 1fr))",
    gap: "10px",
    marginTop: "15px",
  };

  const grid = {
    border: "1px solid #D6E0FF1A",
    padding: "15px",
    borderRadius: "5px",
  };

  const gridLabel = {
    fontSize: "14px",
    marginBottom: "3px",
  };

  const gridValue = {
    fontSize: "16px",
    fontWeight: "600",
  };

  const termsList = {
    paddingLeft: "20px",
    margin: "12px 0",
  };

  const listItem = {
    marginBottom: "8px",
  };

  const footer = {
    marginTop: "24px",
  };

  const footerText = {
    margin: "4px 0",
  };

  return (
    <Html>
      <Head />
      <Preview>Your BookWise Borrow Receipt</Preview>
      <Body style={main}>
        <Container style={container}>
          {/* Header */}
          <Section style={header}>
            <Text style={logo}>BookWise</Text>
          </Section>
          {/* Receipt Info */}
          <Section style={infoSection}>
            <Text style={receiptTitle}>Borrow Receipt</Text>
            <Text style={infoText}>
              Receipt ID: <span style={highlight}>#[123456789]</span>
            </Text>
            <Text style={infoText}>
              Date Issued:{" "}
              <span style={highlight}>
                {dayjs(new Date()).format("MMM DD YYYY")}
              </span>
            </Text>
          </Section>

          <Hr style={divider} />

          {/* Book Details */}
          <Section style={{ width: "100%" }}>
            <Text style={sectionTitle}>Book Details:</Text>
            <Section style={gridContainer}>
              {Object.entries(body).map(([key, value], i) => (
                <div key={i} style={grid}>
                  <Text style={gridLabel}>{key !== "email" && key}</Text>
                  <Text style={gridValue}>
                    {key === "borrowDate" || key === "dueDate"
                      ? dayjs(value).format("MMM DD YYYY")
                      : key !== "email" && value.toString()}
                  </Text>
                </div>
              ))}
            </Section>
          </Section>

          <Hr style={divider} />

          {/* Terms */}
          <Section>
            <Text style={sectionTitle}>Terms</Text>
            <ul style={termsList}>
              <li style={listItem}>
                Please return the book by the due date.
              </li>
              <li style={listItem}>
                Lost or damaged books may incur replacement costs.
              </li>
            </ul>
          </Section>

          <Hr style={divider} />

          {/* Footer */}
          <Section style={footer}>
            <Text style={footerText}>
              Thank you for using <span style={highlight}>BookWise</span>!
            </Text>
            <Text style={footerText}>
              Website: <span style={highlight}>bookwise.example.com</span>
            </Text>
            <Text style={footerText}>
              Email:{" "}
              <span style={highlight}>support@bookwise.example.com</span>
            </Text>
          </Section>
        </Container>
      </Body>
    </Html>
  );
}
export default ReceiptEmailTemplate;

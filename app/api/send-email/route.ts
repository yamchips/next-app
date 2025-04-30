import { Resend } from "resend";
import WelcomeTemplate from "@/emails/WelcomeTemplate";
import { NextResponse } from "next/server";
import React from "react";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST() {
  await resend.emails.send({
    from: "mydomain.com", // from a domain that I own, cannot use free services like Gmail
    to: "wflunch@gmail.com",
    subject: "new subject",
    react: React.createElement(WelcomeTemplate, { name: "harry" }),
  });
  return NextResponse.json({ message: "Email send successfully." });
}

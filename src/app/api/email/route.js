import nodemailer from "nodemailer";
import { NextResponse } from "next/server";

export async function POST(request) {
  try {
    const { name, email, message } = await request.json();

    // Validate input
    if (!name || !email || !message) {
      return NextResponse.json({
        success: false,
        message: "All fields are required",
      });
    }

    // Create transporter with Gmail SMTP
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.MY_GMAIL,
        pass: process.env.MY_GMAIL_PASSWORD,
      },
    });

    // Email options
    const mailOptions = {
      from: `"${name}" <${process.env.MY_GMAIL}>`,
      to: process.env.MY_GMAIL, // Send to yourself
      replyTo: email, // Allow direct reply to sender
      subject: `New Contact Form Submission from ${name}`,
      text: message,
      html: `
        <h2>New Contact Form Submission</h2>
        <p><strong>From:</strong> ${name} &lt;${email}&gt;</p>
        <p><strong>Date:</strong> ${new Date().toLocaleString()}</p>
        <p><strong>Message:</strong></p>
        <div style="white-space: pre-line; background: #f5f5f5; padding: 15px; border-radius: 5px; margin-top: 10px;">
          ${message}
        </div>
        <p style="margin-top: 20px; color: #666; font-size: 0.9em;">
          This email was sent from the contact form on your website.
        </p>
      `,
    };

    // Send email
    await transporter.sendMail(mailOptions);

    return NextResponse.json({
      success: true,
      message: "Email sent successfully!",
    });
  } catch (error) {
    console.error("Error sending email:", error);
    return NextResponse.json({
      success: false,
      message: "Failed to send email. Please try again later.",
    });
  }
}

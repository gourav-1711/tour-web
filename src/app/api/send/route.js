import nodemailer from "nodemailer";
import { NextResponse } from "next/server";

export async function POST(req) {
  console.log("route hit");

  if (req.method !== "POST") {
    return NextResponse.json({ error: "Method not allowed" }, { status: 405 });
  }

  const body = await req.json();
  console.log(body);



  try {
    // transporter setup (Gmail example — App Password needed!)
    const transporter = nodemailer.createTransport({
      service: "gmail", // or custom SMTP host
      auth: {
        user: process.env.MY_GMAIL, // your Gmail
        pass: process.env.MY_GMAIL_PASSWORD, // your Gmail App Password
      },
    });

    // email details
    await transporter.sendMail({
      from: `"Tour Booking System" <${process.env.SENDER_EMAIL}>`,
      to: process.env.MY_GMAIL,
      subject: `🚗 New Tour Booking Request - ${body.state}, ${body.city}`,
      text: `
    New Tour Booking Request
    
    Customer Details:
    - Name: ${body.name || "Not provided"}
    - Mobile: ${body.mobile || "Not provided"}
    - Email: ${body.email || "Not provided"}
    
    Booking Details:
    - Destination: ${body.city}, ${body.state}
    - Cab Type: ${body.cab || "Not specified"}
    - Start Date: ${
      body.startDate
        ? new Date(body.startDate).toLocaleDateString()
        : "Not specified"
    }
    - End Date: ${
      body.endDate
        ? new Date(body.endDate).toLocaleDateString()
        : "Not specified"
    }
    - Number of Members: ${body.members || "Not specified"}
    
    Addresses:
    - Pickup Address: ${body.pickupAddress || "Not provided"}
    - Drop Address: ${body.dropAddress || "Not provided"}
    
    Additional Message: ${body.message || "None"}
      `,
      html: `
    <!DOCTYPE html>
    <html>
    <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>New Tour Booking Request</title>
        <style>
            body {
                font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
                line-height: 1.6;
                color: #333;
                max-width: 600px;
                margin: 0 auto;
                padding: 20px;
                background-color: #f5f5f5;
            }
            .container {
                background: white;
                padding: 0;
                border-radius: 12px;
                box-shadow: 0 4px 15px rgba(0,0,0,0.1);
                overflow: hidden;
            }
            .header {
                background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
                color: white;
                padding: 25px;
                text-align: center;
            }
            .header h1 {
                margin: 0;
                font-size: 24px;
                font-weight: 600;
            }
            .header .emoji {
                font-size: 28px;
                margin-right: 10px;
            }
            .content {
                padding: 30px;
            }
            .section {
                margin-bottom: 25px;
                padding: 20px;
                border-radius: 8px;
                border: 1px solid #e1e5e9;
                background: #fafbfc;
            }
            .section-title {
                color: #2c3e50;
                font-size: 18px;
                font-weight: 600;
                margin: 0 0 15px 0;
                display: flex;
                align-items: center;
            }
            .section-title .icon {
                margin-right: 8px;
                font-size: 20px;
            }
            .info-grid {
                display: grid;
                grid-template-columns: 1fr 1fr;
                gap: 15px;
            }
            .info-item {
                background: white;
                padding: 15px;
                border-radius: 6px;
                border-left: 4px solid #667eea;
            }
            .info-item.full-width {
                grid-column: 1 / -1;
            }
            .info-label {
                font-weight: 600;
                color: #555;
                font-size: 12px;
                text-transform: uppercase;
                letter-spacing: 0.5px;
                margin-bottom: 5px;
            }
            .info-value {
                color: #2c3e50;
                font-size: 14px;
                font-weight: 500;
            }
            .highlight {
                background: linear-gradient(135deg, #84fab0 0%, #8fd3f4 100%);
                color: #2c3e50;
                padding: 15px;
                border-radius: 8px;
                text-align: center;
                font-weight: 600;
                margin: 20px 0;
            }
            .duration {
                background: #fff3cd;
                border: 1px solid #ffeaa7;
                color: #856404;
                padding: 12px;
                border-radius: 6px;
                text-align: center;
                margin: 15px 0;
                font-weight: 500;
            }
            .message-box {
                background: #f8f9fa;
                border: 1px solid #dee2e6;
                border-radius: 8px;
                padding: 20px;
                margin-top: 15px;
                font-style: italic;
                color: #495057;
            }
            .footer {
                background: #2c3e50;
                color: #ecf0f1;
                text-align: center;
                padding: 20px;
                font-size: 12px;
            }
            .priority-banner {
                background: #ff6b6b;
                color: white;
                padding: 10px;
                text-align: center;
                font-weight: bold;
                text-transform: uppercase;
                letter-spacing: 1px;
            }
            @media (max-width: 600px) {
                .info-grid {
                    grid-template-columns: 1fr;
                }
                body {
                    padding: 10px;
                }
                .content {
                    padding: 20px;
                }
            }
        </style>
    </head>
    <body>
        <div class="container">
            <div class="priority-banner">
                ⚡ New Booking Alert
            </div>
            
            <div class="header">
                <h1><span class="emoji">🚗</span>New Tour Booking Request</h1>
                <p style="margin: 5px 0 0 0; opacity: 0.9;">Received on ${new Date().toLocaleDateString(
                  "en-US",
                  {
                    weekday: "long",
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                    hour: "2-digit",
                    minute: "2-digit",
                  }
                )}</p>
            </div>
    
            <div class="content">
                <!-- Customer Information -->
                <div class="section">
                    <h2 class="section-title">
                        <span class="icon">👤</span>
                        Customer Information
                    </h2>
                    <div class="info-grid">
                        <div class="info-item">
                            <div class="info-label">Customer Name</div>
                            <div class="info-value">${
                              body.name || "Not provided"
                            }</div>
                        </div>
                        <div class="info-item">
                            <div class="info-label">Mobile Number</div>
                            <div class="info-value">${
                              body.mobile || "Not provided"
                            }</div>
                        </div>
                        <div class="info-item full-width">
                            <div class="info-label">Email Address</div>
                            <div class="info-value">${
                              body.email || "Not provided"
                            }</div>
                        </div>
                    </div>
                </div>
    
                <!-- Trip Details -->
                <div class="section">
                    <h2 class="section-title">
                        <span class="icon">🌍</span>
                        Trip Details
                    </h2>
                    
                    <div class="highlight">
                        📍 Destination: ${body.city}, ${body.state}
                    </div>
    
                    <div class="info-grid">
                        <div class="info-item">
                            <div class="info-label">Start Date</div>
                            <div class="info-value">${
                              body.startDate
                                ? new Date(body.startDate).toLocaleDateString(
                                    "en-US",
                                    {
                                      weekday: "short",
                                      year: "numeric",
                                      month: "short",
                                      day: "numeric",
                                    }
                                  )
                                : "Not specified"
                            }</div>
                        </div>
                        <div class="info-item">
                            <div class="info-label">End Date</div>
                            <div class="info-value">${
                              body.endDate
                                ? new Date(body.endDate).toLocaleDateString(
                                    "en-US",
                                    {
                                      weekday: "short",
                                      year: "numeric",
                                      month: "short",
                                      day: "numeric",
                                    }
                                  )
                                : "Not specified"
                            }</div>
                        </div>
                        <div class="info-item">
                            <div class="info-label">Cab Type</div>
                            <div class="info-value">${
                              body.cab || "Not specified"
                            }</div>
                        </div>
                        <div class="info-item">
                            <div class="info-label">Number of Members</div>
                            <div class="info-value">${
                              body.members || "Not specified"
                            }</div>
                        </div>
                    </div>
    
                    ${
                      body.startDate && body.endDate
                        ? `
                    <div class="duration">
                        🗓️ Trip Duration: ${Math.ceil(
                          (new Date(body.endDate) - new Date(body.startDate)) /
                            (1000 * 60 * 60 * 24)
                        )} days
                    </div>
                    `
                        : ""
                    }
                </div>
    
                <!-- Address Details -->
                <div class="section">
                    <h2 class="section-title">
                        <span class="icon">📍</span>
                        Address Details
                    </h2>
                    <div class="info-grid">
                        <div class="info-item full-width">
                            <div class="info-label">🚀 Pickup Address</div>
                            <div class="info-value">${
                              body.pickupAddress || "Not provided"
                            }</div>
                        </div>
                        <div class="info-item full-width">
                            <div class="info-label">🏁 Drop Address</div>
                            <div class="info-value">${
                              body.dropAddress || "Not provided"
                            }</div>
                        </div>
                    </div>
                </div>
    
                ${
                  body.message
                    ? `
                <!-- Additional Message -->
                <div class="section">
                    <h2 class="section-title">
                        <span class="icon">💬</span>
                        Additional Message
                    </h2>
                    <div class="message-box">
                        "${body.message}"
                    </div>
                </div>
                `
                    : ""
                }
            </div>
    
            <div class="footer">
                <p>🏢 Tour Booking Management System</p>
                <p>This is an automated message. Please respond to the customer promptly.</p>
            </div>
        </div>
    </body>
    </html>
      `,
    });

    return NextResponse.json({
      success: true,
      message: "Email sent successfully!",
    });
  } catch (err) {
    console.error("Error sending email:", err);
    return NextResponse.json({ success: false, error: "Email failed to send" });
  }
}

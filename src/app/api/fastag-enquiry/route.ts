import { NextResponse } from "next/server";
import nodemailer from "nodemailer";

const getText = (value: FormDataEntryValue | null) =>
  typeof value === "string" ? value.trim() : "";

const escapeHtml = (value: string) =>
  value.replace(
    /[&<>"']/g,
    (character) =>
      ({
        "&": "&amp;",
        "<": "&lt;",
        ">": "&gt;",
        '"': "&quot;",
        "'": "&#039;",
      })[character] || character
  );

export async function POST(request: Request) {
  try {
    const formData = await request.formData();
    const rawType = getText(formData.get("enquiryType")).toLowerCase();

    // Determine product type
    const isGps = rawType === "gps" || rawType.includes("gps");
    const isFastagHolder = rawType === "fastag-holder";
    const isSimpleForm = isGps || isFastagHolder;

    const productLabel = isGps
      ? "GPS Tracker"
      : isFastagHolder
      ? "FASTag Holder"
      : "FASTag";

    const emailSubject = `${productLabel} - `;

    // Common fields
    const fullName = getText(formData.get("fullName"));
    const mobile = getText(formData.get("mobile")).replace(/\D/g, "");
    const email = getText(formData.get("email"));

    // Simple form (GPS & FASTag Holder) specific
    const message = isSimpleForm ? getText(formData.get("message")) : "";

    // FASTag-only specific
    const deliveryAddress = !isSimpleForm ? getText(formData.get("deliveryAddress")) : "";
    const city = !isSimpleForm ? getText(formData.get("city")) : "";
    const state = !isSimpleForm ? getText(formData.get("state")) : "";
    const pincode = !isSimpleForm
      ? getText(formData.get("pincode")).replace(/\D/g, "")
      : "";

    // — Validation —
    if (!fullName) {
      return NextResponse.json(
        { success: false, error: "Full name is required." },
        { status: 400 }
      );
    }

    if (!mobile || mobile.length !== 10) {
      return NextResponse.json(
        { success: false, error: "Please enter a valid 10-digit mobile number." },
        { status: 400 }
      );
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return NextResponse.json(
        { success: false, error: "Please enter a valid email address." },
        { status: 400 }
      );
    }

    if (isSimpleForm) {
      if (!message) {
        return NextResponse.json(
          { success: false, error: "Message is required." },
          { status: 400 }
        );
      }
    } else {
      if (!deliveryAddress) {
        return NextResponse.json(
          { success: false, error: "Delivery address is required." },
          { status: 400 }
        );
      }
      if (!city) {
        return NextResponse.json(
          { success: false, error: "City is required." },
          { status: 400 }
        );
      }
      if (!state) {
        return NextResponse.json(
          { success: false, error: "State is required." },
          { status: 400 }
        );
      }
      if (!pincode || pincode.length !== 6) {
        return NextResponse.json(
          { success: false, error: "Please enter a valid 6-digit PIN Code." },
          { status: 400 }
        );
      }
    }

    // — SMTP Config —
    const requiredConfig = {
      SMTP_HOST: process.env.SMTP_HOST?.trim(),
      SMTP_PORT: process.env.SMTP_PORT?.trim(),
      SMTP_USER: process.env.SMTP_USER?.trim(),
      SMTP_PASS: process.env.SMTP_PASS?.replace(/\s/g, ""),
      FASTAG_RECIPIENT_EMAIL: process.env.FASTAG_RECIPIENT_EMAIL?.trim(),
    };
    const missingConfig = Object.entries(requiredConfig)
      .filter(([, value]) => !value)
      .map(([key]) => key);

    if (missingConfig.length > 0) {
      console.error("SMTP configuration missing:", missingConfig.join(", "));
      return NextResponse.json(
        {
          success: false,
          error: "Email service is temporarily unavailable. Please try again later.",
        },
        { status: 500 }
      );
    }

    const smtpPort = Number(requiredConfig.SMTP_PORT);
    if (!Number.isInteger(smtpPort) || smtpPort <= 0) {
      console.error("SMTP configuration invalid: SMTP_PORT must be a valid port.");
      return NextResponse.json(
        {
          success: false,
          error: "Email service is temporarily unavailable. Please try again later.",
        },
        { status: 500 }
      );
    }

    const transporter = nodemailer.createTransport({
      host: requiredConfig.SMTP_HOST,
      port: smtpPort,
      secure: smtpPort === 465,
      auth: {
        user: requiredConfig.SMTP_USER,
        pass: requiredConfig.SMTP_PASS,
      },
    });

    try {
      await transporter.verify();
    } catch (error: unknown) {
      const smtpError = error as {
        code?: string;
        command?: string;
        responseCode?: number;
        message?: string;
      };
      console.error("SMTP authentication failed:", {
        code: smtpError.code,
        command: smtpError.command,
        responseCode: smtpError.responseCode,
        message: smtpError.message,
      });
      return NextResponse.json(
        {
          success: false,
          error: "Email service authentication failed. Please try again later.",
        },
        { status: 502 }
      );
    }

    // — Email Content —
    let plainTextBody: string;
    let htmlRows: string;

    if (isSimpleForm) {
      plainTextBody = [
        `New Message - ${productLabel}`,
        "",
        `Product: ${productLabel}`,
        `Name: ${fullName}`,
        `Phone Number: ${mobile}`,
        `Email: ${email}`,
        `Message: ${message}`,
        "",
        "Sent automatically from Transetu Website (https://transetu.com)",
      ].join("\n");

      htmlRows = [
        ["Product", productLabel],
        ["Name", fullName],
        ["Phone Number", `+91 ${mobile}`],
        ["Email", email],
        ["Message", message],
      ]
        .map(
          ([label, value]) =>
            `<tr><td style="padding:12px 16px;color:#263D35;font-weight:700;width:35%;border-bottom:1px solid #DCE8E1;">${escapeHtml(
              label
            )}</td><td style="padding:12px 16px;color:#10231D;font-weight:600;border-bottom:1px solid #DCE8E1;white-space:pre-wrap;">${escapeHtml(
              value
            )}</td></tr>`
        )
        .join("");
    } else {
      plainTextBody = [
        `New Request - ${productLabel}`,
        "",
        `Product: ${productLabel}`,
        `Full Name: ${fullName}`,
        `Mobile Number: ${mobile}`,
        `Email: ${email}`,
        `Delivery Address: ${deliveryAddress}`,
        `City: ${city}`,
        `State: ${state}`,
        `PIN Code: ${pincode}`,
        "",
        "Sent automatically from Transetu Website (https://transetu.com)",
      ].join("\n");

      htmlRows = [
        ["Product", productLabel],
        ["Full Name", fullName],
        ["Mobile Number", `+91 ${mobile}`],
        ["Email", email],
        ["Delivery Address", deliveryAddress],
        ["City", city],
        ["State", state],
        ["PIN Code", pincode],
      ]
        .map(
          ([label, value]) =>
            `<tr><td style="padding:12px 16px;color:#263D35;font-weight:700;width:35%;border-bottom:1px solid #DCE8E1;">${escapeHtml(
              label
            )}</td><td style="padding:12px 16px;color:#10231D;font-weight:600;border-bottom:1px solid #DCE8E1;">${escapeHtml(
              value
            )}</td></tr>`
        )
        .join("");
    }

    await transporter.sendMail({
      from: `"Transetu Website" <${requiredConfig.SMTP_USER}>`,
      to: requiredConfig.FASTAG_RECIPIENT_EMAIL,
      replyTo: email,
      subject: `${emailSubject}${fullName}`,
      text: plainTextBody,
      html: `<div style="font-family:Arial,sans-serif;max-width:700px;margin:0 auto;padding:24px;background:#EAF4EE;color:#10231D;"><h2 style="background:#0B172A;color:#fff;padding:20px;border-bottom:3px solid #59C71C;margin:0 0 16px 0;">${escapeHtml(
        productLabel
      )}</h2><table style="width:100%;border-collapse:collapse;background:#fff;border:1px solid #DCE8E1;border-radius:6px;overflow:hidden;">${htmlRows}</table><p style="color:#263D35;text-align:center;margin-top:20px;font-size:13px;">Sent automatically from Transetu Website</p></div>`,
    });

    return NextResponse.json({
      success: true,
      message: isSimpleForm
        ? "Your message has been sent successfully."
        : "Your request has been submitted successfully.",
    });
  } catch (error: unknown) {
    const requestError = error as { code?: string; message?: string };
    console.error("Failed to process request:", {
      code: requestError.code,
      message: requestError.message,
    });
    return NextResponse.json(
      {
        success: false,
        error: "Unable to send your message right now. Please try again later.",
      },
      { status: 500 }
    );
  }
}

require("dotenv").config();
const express = require("express");
const cors = require("cors");
const multer = require("multer");
const nodemailer = require("nodemailer");

const app = express();
const PORT = process.env.PORT || 4000;

// ── Middleware ──────────────────────────────────────────────────────────────
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Multer: store uploaded files in memory so we can attach them to emails
const upload = multer({ storage: multer.memoryStorage() });

// ── Nodemailer transporter (SMTP) ───────────────────────────────────────────
const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: Number(process.env.SMTP_PORT) || 587,
  secure: process.env.SMTP_SECURE === "true",
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASSWORD,
  },
  tls: {
    // Use the system CA bundle installed in the Docker image
    rejectUnauthorized: true,
  },
});

// Verify SMTP connection on startup so errors appear immediately in logs
transporter.verify((err) => {
  if (err) console.error("SMTP connection error:", err.message);
  else console.log("SMTP connection ready");
});

// ── Helper: build nodemailer attachments from multer files ──────────────────
function buildAttachments(files = []) {
  return files.map((f) => ({
    filename: f.originalname,
    content: f.buffer,
    contentType: f.mimetype,
  }));
}

// ══════════════════════════════════════════════════════════════════════════════
// POST /api/join-us
// Fields: name, email, phone, specialization, message
// Files:  cv (single), files (multiple)
// ══════════════════════════════════════════════════════════════════════════════
app.post(
  "/api/join-us",
  upload.fields([
    { name: "cv", maxCount: 1 },
    { name: "files", maxCount: 10 },
  ]),
  async (req, res) => {
    const { name, email, phone, specialization, message } = req.body;

    const cvFiles = req.files?.cv || [];
    const additionalFiles = req.files?.files || [];
    const attachments = buildAttachments([...cvFiles, ...additionalFiles]);

    const mailOptions = {
      from: `"Startime Careers" <${process.env.SMTP_USER}>`,
      to: process.env.JOINUS_TO_EMAIL,
      replyTo: email,
      subject: `New Job Application — ${name}`,
      html: `
        <h2>New Job Application</h2>
        <table cellpadding="8" style="border-collapse:collapse;width:100%;max-width:600px">
          <tr><td><strong>Full Name</strong></td><td>${name}</td></tr>
          <tr><td><strong>Email</strong></td><td><a href="mailto:${email}">${email}</a></td></tr>
          <tr><td><strong>Phone</strong></td><td>${phone}</td></tr>
          <tr><td><strong>Specialization</strong></td><td>${specialization}</td></tr>
          <tr><td><strong>Message</strong></td><td style="white-space:pre-wrap">${message}</td></tr>
        </table>
      `,
      attachments,
    };

    try {
      await transporter.sendMail(mailOptions);
      res.json({ success: true, message: "Application sent successfully." });
    } catch (err) {
      console.error("Join Us mail error:", err);
      res.status(500).json({ success: false, message: "Failed to send email." });
    }
  }
);

// ══════════════════════════════════════════════════════════════════════════════
// POST /api/contact
// Fields: entity, name, position, phone, email, message
// Files:  attachments (multiple)
// ══════════════════════════════════════════════════════════════════════════════
app.post(
  "/api/contact",
  upload.array("attachments", 10),
  async (req, res) => {
    const { entity, name, position, phone, email, message } = req.body;

    const attachments = buildAttachments(req.files || []);

    const mailOptions = {
      from: `"Startime Contact" <${process.env.SMTP_USER}>`,
      to: process.env.CONTACT_TO_EMAIL,
      replyTo: email,
      subject: `New Contact Message — ${name} (${entity})`,
      html: `
        <h2>New Contact Form Submission</h2>
        <table cellpadding="8" style="border-collapse:collapse;width:100%;max-width:600px">
          <tr><td><strong>Entity</strong></td><td>${entity}</td></tr>
          <tr><td><strong>Name</strong></td><td>${name}</td></tr>
          <tr><td><strong>Position</strong></td><td>${position}</td></tr>
          <tr><td><strong>Phone</strong></td><td>${phone}</td></tr>
          <tr><td><strong>Email</strong></td><td><a href="mailto:${email}">${email}</a></td></tr>
          <tr><td><strong>Message</strong></td><td style="white-space:pre-wrap">${message}</td></tr>
        </table>
      `,
      attachments,
    };

    try {
      await transporter.sendMail(mailOptions);
      res.json({ success: true, message: "Message sent successfully." });
    } catch (err) {
      console.error("Contact mail error:", err);
      res.status(500).json({ success: false, message: "Failed to send email." });
    }
  }
);

// ══════════════════════════════════════════════════════════════════════════════
// POST /api/discover-us
// Fields: entity (department), name, position, phone, email, message
// Files:  attachments (multiple)
// ══════════════════════════════════════════════════════════════════════════════
app.post(
  "/api/discover-us",
  upload.array("attachments", 10),
  async (req, res) => {
    const { entity, name, position, phone, email, message } = req.body;

    const attachments = buildAttachments(req.files || []);

    const mailOptions = {
      from: `"Startime Discover Us" <${process.env.SMTP_USER}>`,
      to: process.env.CONTACT_SECTION_TO_EMAIL,
      replyTo: email,
      subject: `New Discover Us Inquiry — ${name} (${entity})`,
      html: `
        <h2>New Discover Us Form Submission</h2>
        <table cellpadding="8" style="border-collapse:collapse;width:100%;max-width:600px">
          <tr><td><strong>Department</strong></td><td>${entity}</td></tr>
          <tr><td><strong>Name</strong></td><td>${name}</td></tr>
          <tr><td><strong>Position</strong></td><td>${position}</td></tr>
          <tr><td><strong>Phone</strong></td><td>${phone}</td></tr>
          <tr><td><strong>Email</strong></td><td><a href="mailto:${email}">${email}</a></td></tr>
          <tr><td><strong>Message</strong></td><td style="white-space:pre-wrap">${message}</td></tr>
        </table>
      `,
      attachments,
    };

    try {
      await transporter.sendMail(mailOptions);
      res.json({ success: true, message: "Message sent successfully." });
    } catch (err) {
      console.error("Discover Us mail error:", err);
      res.status(500).json({ success: false, message: "Failed to send email." });
    }
  }
);

// ══════════════════════════════════════════════════════════════════════════════
// POST /api/solution
// Fields: entity, name, position, phone, email, message
// Files:  attachments (multiple)
// ══════════════════════════════════════════════════════════════════════════════
app.post(
  "/api/solution",
  upload.array("attachments", 10),
  async (req, res) => {
    const { entity, name, position, phone, email, message } = req.body;

    const attachments = buildAttachments(req.files || []);

    const mailOptions = {
      from: `"Startime Solution" <${process.env.SMTP_USER}>`,
      to: process.env.SOLUTION_TO_EMAIL,
      replyTo: email,
      subject: `New Solution Inquiry — ${name} (${entity})`,
      html: `
        <h2>New Solution Form Submission</h2>
        <table cellpadding="8" style="border-collapse:collapse;width:100%;max-width:600px">
          <tr><td><strong>Entity</strong></td><td>${entity}</td></tr>
          <tr><td><strong>Name</strong></td><td>${name}</td></tr>
          <tr><td><strong>Position</strong></td><td>${position}</td></tr>
          <tr><td><strong>Phone</strong></td><td>${phone}</td></tr>
          <tr><td><strong>Email</strong></td><td><a href="mailto:${email}">${email}</a></td></tr>
          <tr><td><strong>Message</strong></td><td style="white-space:pre-wrap">${message}</td></tr>
        </table>
      `,
      attachments,
    };

    try {
      await transporter.sendMail(mailOptions);
      res.json({ success: true, message: "Message sent successfully." });
    } catch (err) {
      console.error("Solution mail error:", err);
      res.status(500).json({ success: false, message: "Failed to send email." });
    }
  }
);

// ══════════════════════════════════════════════════════════════════════════════
// POST /api/subscribe
// Fields: email
// ══════════════════════════════════════════════════════════════════════════════
app.post(
  "/api/subscribe",
  upload.none(),
  async (req, res) => {
  // console.log('headasdsadas'+req.headers["content-type"]);
  // console.log('boydddd'+req.body);
    const { email } = req.body;

    const mailOptions = {
      from: `"Startime Subscribe" <${process.env.SMTP_USER}>`,
      to: process.env.CONTACT_TO_EMAIL,
      replyTo: email,
      subject: `New Subscribe Message — ${email}`,
      html: `
        <h2>New Subscribe Form Submission</h2>
        <table cellpadding="8" style="border-collapse:collapse;width:100%;max-width:600px">
          <tr><td><strong>Email</strong></td><td><a href="mailto:${email}">${email}</a></td></tr>
        </table>
      `,
    };

    try {
      await transporter.sendMail(mailOptions);
      res.json({ success: true, message: "You have been subscribed successfully." });
    } catch (err) {
      console.error("Subscribe mail error:", err);
      res.status(500).json({ success: false, message: "Failed to subscribe." });
    }
  }
);



// ══════════════════════════════════════════════════════════════════════════════
// POST /api/simf-contact-us
// Fields: name, organization, jobTitle, country, address, telephone, mobile, email, website, message
// Files:  attachments (multiple)
// ══════════════════════════════════════════════════════════════════════════════
app.post(
  "/api/simf-contact-us",
  upload.array("attachments", 10),
  async (req, res) => {
    const { name, organization, jobTitle, country, address, telephone, mobile, email, website, message } = req.body;

    const attachments = buildAttachments(req.files || []);
    const simemail = "sim@startime.sa";

    const mailOptions = {
      from: `"Startime - Saudi International Maritime Forum Contact Us" <${process.env.SMTP_USER}>`,
      // to: process.env.CONTACT_TO_EMAIL,
      to: simemail,
      replyTo: email,
      subject: `New Inquiry for Saudi International Maritime Forum — ${name} (${organization})`,
      html: `
        <h2>New Inquiry for Saudi International Maritime Forum Form Submission</h2>
        <table cellpadding="8" style="border-collapse:collapse;width:100%;max-width:600px">
          <tr><td><strong>Name</strong></td><td>${name}</td></tr>
          <tr><td><strong>Organization</strong></td><td>${organization}</td></tr>
          <tr><td><strong>Job Title</strong></td><td>${jobTitle}</td></tr>
          <tr><td><strong>Country</strong></td><td>${country}</td></tr>
          <tr><td><strong>Address</strong></td><td>${address}</td></tr>
          <tr><td><strong>Telephone</strong></td><td>${telephone}</td></tr>
          <tr><td><strong>Mobile</strong></td><td>${mobile}</td></tr>
          <tr><td><strong>Email</strong></td><td><a href="mailto:${email}">${email}</a></td></tr>
          <tr><td><strong>Website</strong></td><td>${website}</td></tr>
          <tr><td><strong>Message</strong></td><td style="white-space:pre-wrap">${message}</td></tr>
        </table>
      `,
      attachments,
    };

    try {
      await transporter.sendMail(mailOptions);
      res.json({ success: true, message: "Message sent successfully." });
    } catch (err) {
      console.error("Discover Us mail error:", err);
      res.status(500).json({ success: false, message: "Failed to send email." });
    }
  }
);


// ── Start ───────────────────────────────────────────────────────────────────
app.listen(PORT, () => {
  console.log(`Mailer server running on http://localhost:${PORT}`);
});

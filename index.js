const { onRequest } = require("firebase-functions/v2/https");
const functions = require("firebase-functions/v2/https");
const logger = require("firebase-functions/logger");
const nodemailer = require("nodemailer");
const cors = require("cors");

// ==========================
// 🌐 Initialize CORS Handler
// ==========================
const corsHandler = cors({ origin: '*' }); // Adjust origin as needed

// ================================
// 🚀 Initialize Mail Transporter
// ================================
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.GMAIL_USER,
    pass: process.env.GMAIL_PASS,
  },
});

// ===========================
// 📩 sendContactForm Function
// ===========================
exports.sendContactForm = onRequest((req, res) => {
  corsHandler(req, res, () => {
    const {
      name,
      email,
      subject,
      classes,
      locality,
      contact,
      city,
      state,
      mode,
      gender,
      message,
    } = req.body;

    const mailOptions = {
      from: process.env.GMAIL_USER,
      to: 'vipndls@gmail.com',
      subject: "📩 New Admission Inquiry – Today's Leads",
      html: `
        <h2>New Admission Inquiry</h2>
        <ul>
          <li><b>Name:</b> ${name}</li>
          <li><b>Email:</b> ${email}</li>
           <li><b>Phone:</b> ${contact}</li>
          <li><b>Subject:</b> ${subject}</li>
          <li><b>Class:</b> ${classes}</li>
          <li><b>Locality:</b> ${locality}</li>
          <li><b>City:</b> ${city}</li>
          <li><b>State:</b> ${state}</li>
          <li><b>Mode:</b> ${mode}</li>
          <li><b>Gender:</b> ${gender}</li>
          <li><b>Message:</b> ${message}</li>
        </ul>
      `,
    };

    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.error('❌ Email send error:', error.message);
        return res.status(500).json({ message: 'Failed to send email' });
      }
      return res.status(200).json({ message: 'Email sent successfully' });
    });
  });
});

// ================================
// 🎓 sendScholarShipForm Function
// ================================
exports.sendScholarShipForm = onRequest((req, res) => {
  corsHandler(req, res, () => {
    const { email, subject, message, stream, classes, target } = req.body;

    const mailOptions = {
      from: process.env.GMAIL_USER,
      to: email,
      subject: subject,
      html: `
        <ul>
          <h1>${subject}</h1>
          <h2>${message}</h2>
          <li><b>Your Stream:</b> ${stream}</li>
          <li><b>Classes:</b> ${classes}</li>
          <li><b>Your Target:</b> ${target}</li>
        </ul>
      `,
    };

    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.error('❌ Email send error:', error.message);
        return res.status(500).json({ message: 'Failed to send email' });
      }
      return res.status(200).json({ message: 'Email sent successfully' });
    });
  });
});

// ================================
// 👨‍🏫 sendTeachersForm Function
// ================================
exports.sendTeachersForm = onRequest((req, res) => {
  corsHandler(req, res, () => {
    const {
      name,
      phone,
      classType,
      level,
      board,
      subjects,
      experienceLevel,
      timestamp,
    } = req.body;

    const mailOptions = {
      from: process.env.GMAIL_USER,
      to: 'info@vikasinstitute.in',
      subject: '👨‍🏫 New Teacher Application',
      html: `
        <h2>New Teacher Form Submission</h2>
        <ul>
          <li><b>Name:</b> ${name}</li>
          <li><b>Phone:</b> ${phone}</li>
          <li><b>Class Type:</b> ${classType}</li>
          <li><b>Level:</b> ${level}</li>
          <li><b>Board:</b> ${board}</li>
          <li><b>Subjects:</b> ${subjects.join(', ')}</li>
          <li><b>Experience Level:</b> ${experienceLevel}</li>
          <li><b>Timestamp:</b> ${new Date(timestamp).toLocaleString()}</li>
        </ul>
      `,
    };

    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.error('❌ Teacher Form Email Error:', error.message);
        return res.status(500).json({ message: 'Failed to send teacher form email' });
      }
      return res.status(200).json({ message: 'Teacher form email sent successfully' });
    });
  });
});

// ==============================
// 🤝 sendJoinTeamForm Function
// ==============================
exports.sendJoinTeamForm = onRequest((req, res) => {
  corsHandler(req, res, () => {
    const {
      name,
      contact,
      email,
      classes,
      subjects,
      boards,
      experience,
      level,
      message,
      otp,
    } = req.body;

    const mailOptions = {
      from: process.env.GMAIL_USER,
      to: 'info@vikasinstitute.in',
      subject: '🤝 Join Our Team Application',
      html: `
        <h2>New Join Team Application</h2>
        <ul>
          <li><b>Name:</b> ${name}</li>
          <li><b>Contact:</b> ${contact}</li>
          <li><b>Email:</b> ${email}</li>
          <li><b>Classes:</b> ${classes.join(', ')}</li>
          <li><b>Subjects:</b> ${subjects.join(', ')}</li>
          <li><b>Boards:</b> ${boards.join(', ')}</li>
          <li><b>Experience:</b> ${experience}</li>
          <li><b>Level:</b> ${level}</li>
          <li><b>Message:</b> ${message}</li>
          <li><b>OTP:</b> ${otp}</li>
        </ul>
      `,
    };

    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.error('❌ Join Team Form Email Error:', error.message);
        return res.status(500).json({ message: 'Failed to send join team form email' });
      }
      return res.status(200).json({ message: 'Join team form email sent successfully' });
    });
  });
});

exports.sendNewsletterSubscription = onRequest((req, res) => {
  corsHandler(req, res, () => {
    const { email } = req.body;

    // Email to Vikas Institute with the subscriber's email
    const adminMailOptions = {
      from: process.env.GMAIL_USER,
      to: 'info@vikasinstitute.in',
      subject: 'New Newsletter Subscription Alert!',
      html: `
        <h2>New Newsletter Subscriber</h2>
        <ul>
          <li><b>Email:</b> ${email}</li>
        </ul>
        <p>A new user has subscribed to the newsletter.</p>
      `,
    };

    // Send email to admin
    transporter.sendMail(adminMailOptions, (error, info) => {
      if (error) {
        console.error('❌ Newsletter Subscription Email Error:', error.message);
        return res.status(500).json({ message: 'Failed to send subscription email' });
      }
      return res.status(200).json({ message: 'Subscription email sent successfully' });
    });
  });
});


// Aditya class
exports.sendTeachersFormAdityaSir = onRequest((req, res) => {
  corsHandler(req, res, () => {
    const {
      name,
      phone,
      classType,
      level,
      board,
      subjects,
      timestamp,
    } = req.body;

    const mailOptions = {
      from: process.env.GMAIL_USER,
      to: 'verma.adityakr7@gmail.com',
      subject: '👨‍🏫 New Student Application',
      html: `
        <h2>New Student Form Submission</h2>
        <ul>
          <li><b>Name:</b> ${name}</li>
          <li><b>Phone:</b> ${phone}</li>
          <li><b>Class Type:</b> ${classType}</li>
          <li><b>Level:</b> ${level}</li>
          <li><b>Board:</b> ${board}</li>
          <li><b>Subjects:</b> ${subjects.join(', ')}</li>
          <li><b>Timestamp:</b> ${new Date(timestamp).toLocaleString()}</li>
        </ul>
      `,
    };

    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.error('❌ Teacher Form Email Error:', error.message);
        return res.status(500).json({ message: 'Failed to send teacher form email' });
      }
      return res.status(200).json({ message: 'Teacher form email sent successfully' });
    });
  });
});
exports.sendNewsletterSubscriptionAdityaSir = onRequest((req, res) => {
  corsHandler(req, res, () => {
    const { email } = req.body;

    // Email to Vikas Institute with the subscriber's email
    const adminMailOptions = {
      from: process.env.GMAIL_USER,
      to: 'verma.adityakr7@gmail.com',
      subject: 'New Newsletter Subscription Alert!',
      html: `
        <h2>New Newsletter Subscriber</h2>
        <ul>
          <li><b>Email:</b> ${email}</li>
        </ul>
        <p>A new user has subscribed to the newsletter.</p>
      `,
    };

    // Send email to admin
    transporter.sendMail(adminMailOptions, (error, info) => {
      if (error) {
        console.error('❌ Newsletter Subscription Email Error:', error.message);
        return res.status(500).json({ message: 'Failed to send subscription email' });
      }
      return res.status(200).json({ message: 'Subscription email sent successfully' });
    });
  });
});


//PCMB Tutors 
// ================================
// 👨‍🏫 sendTeachersForm Function
// ================================
exports.sendTeachersFormPcmb = onRequest((req, res) => {
  corsHandler(req, res, () => {
    const {
      name,
      phone,
      classType,
      level,
      board,
      subjects,
      experienceLevel,
      timestamp,
    } = req.body;

    const mailOptions = {
      from: process.env.GMAIL_USER,
      to: 'info@pcmbtutors.com',
      subject: 'New PCMB Tutors Lead Submission',
      html: `
        <h2>New PCMB Tutors Lead Submission</h2>
        <ul>
          <li><b>Name:</b> ${name}</li>
          <li><b>Phone:</b> ${phone}</li>
          <li><b>Class Type:</b> ${classType}</li>
          <li><b>Level:</b> ${level}</li>
          <li><b>Board:</b> ${board}</li>
          <li><b>Subjects:</b> ${subjects.join(', ')}</li>
          <li><b>Experience Level:</b> ${experienceLevel}</li>
          <li><b>Timestamp:</b> ${new Date(timestamp).toLocaleString()}</li>
        </ul>
      `,
    };

    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.error('❌ Teacher Form Email Error:', error.message);
        return res.status(500).json({ message: 'Failed to send teacher form email' });
      }
      return res.status(200).json({ message: 'Teacher form email sent successfully' });
    });
  });
});

//PCMB Tutors 
// ==============================
// 🤝 sendJoinTeamForm Function
// ==============================
exports.sendJoinTeamFormPcmb = onRequest((req, res) => {
  corsHandler(req, res, () => {
    const {
      name,
      contact,
      email,
      classes,
      subjects,
      boards,
      experience,
      level,
      message,
      otp,
    } = req.body;

    const mailOptions = {
      from: process.env.GMAIL_USER,
      to: 'info@pcmbtutors.com',
      subject: 'PCM Contact us form',
      html: `
        <h2>PCMB Contact us form</h2>
        <ul>
          <li><b>Name:</b> ${name}</li>
          <li><b>Contact:</b> ${contact}</li>
          <li><b>Email:</b> ${email}</li>
          <li><b>Classes:</b> ${classes.join(', ')}</li>
          <li><b>Subjects:</b> ${subjects.join(', ')}</li>
          <li><b>Boards:</b> ${boards.join(', ')}</li>
          <li><b>Experience:</b> ${experience}</li>
          <li><b>Level:</b> ${level}</li>
          <li><b>Message:</b> ${message}</li>
          <li><b>OTP:</b> ${otp}</li>
        </ul>
      `,
    };

    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.error('❌ Join Team Form Email Error:', error.message);
        return res.status(500).json({ message: 'Failed to send join team form email' });
      }
      return res.status(200).json({ message: 'Join team form email sent successfully' });
    });
  });
});


// ===========================
// 📩 Nios Function
// ===========================
exports.sendContactFormNios = onRequest((req, res) => {
  corsHandler(req, res, () => {
    const {
      name,
      email,
      contact,
      message,
    } = req.body;

    const mailOptions = {
      from: process.env.GMAIL_USER,
      to: 'info@niosclasses.in.com',
      subject: "NIOS Contact us lead",
      html: `
        <h2>New Admission Inquiry</h2>
        <ul>
          <li><b>Name:</b> ${name}</li>
          <li><b>Email:</b> ${email}</li>
           <li><b>Phone:</b> ${contact}</li>
          <li><b>Message:</b> ${message}</li>
        </ul>
      `,
    };

    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.error('❌ Email send error:', error.message);
        return res.status(500).json({ message: 'Failed to send email' });
      }
      return res.status(200).json({ message: 'Email sent successfully' });
    });
  });
});
// test
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// Import specific members from nodemailer
const nodemailer = require("nodemailer");
const from_email = process.env.FROM_EMAIL;
const password = process.env.PASSWORD;
const smtp = process.env.SMTP;
console.log(from_email, password, smtp);
// Create a transporter
const transporter = nodemailer.createTransport({
    host: smtp,
    port: 465,
    secure: true,
    auth: {
        // TODO: replace `user` and `pass` values from <https://forwardemail.net>
        user: from_email,
        pass: password
    }
});
// Define email options
const mailOptions = {
    from: from_email,
    to: 'abdullatifnizamani517@gmail.com',
    subject: 'hi there',
    text: 'Hello from TypeScript!'
};
// Send email
transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
        console.error('Error sending email:', error);
    }
    else {
        console.log('Email sent:', info.messageId);
    }
});

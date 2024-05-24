"use strict";  //It enables the restricted Mode of Javasript, which improves robustness of your code
Object.defineProperty(exports, "__esModule", { value: true });
// Import specific members from nodemailer
const nodemailer = require("nodemailer"); //Import Node mailer package
const from_email = process.env.FROM_EMAIL; //Process the email configuartion in the env file, where all the configuration are set up
const password = process.env.PASSWORD; //access the password in the env for the email configuration
const smtp = process.env.SMTP; // processes the protocol used in mailing
console.log(from_email, password, smtp); //log the values of configuration in the console, 



// Create a transporter(Mail transported function)
const transporter = nodemailer.createTransport({
    host: smtp, //Specify the the smtp server to connect to
    port: 465, //specifies the port number of smtp server to listen from
    secure: true, //Secure is set to true for SSL(secure socket Layer)
    auth: { //authentication
        // TODO: replace `user` and `pass` values from <https://forwardemail.net>
        user: from_email,
        pass: password
    }
});

// Define email options
const mailOptions = {
    from: from_email,
    to: 'abdullatifnizamani517@gmail.com',
    subject: 'Hi there',
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

"use strict";
// // Import specific members from nodemailer
// import * as nodemailer from 'nodemailer';
// import generateRandomCode from '../utils/generateCode';
// const from_email = process.env.FROM_EMAIL;
// const password = process.env.PASSWORD;
// const smtp = process.env.SMTP;
// console.log(from_email,password,smtp)
// console.log(generateRandomCode());
// // Create a transporter
// const transporter = nodemailer.createTransport({
//   host: process.env.HOST,
//   port: 587,
//   auth: {
//     user: process.env.USER,
//     pass: password
//   }
//   });
// // Define email options
// const mailOptions: nodemailer.SendMailOptions = {
//   from: from_email,
//   to: 'abdullatifnizamani517@gmail.com',
//   subject: 'hi there',
//   text: 'Hello from TypeScript!'    
// };
// // Send email
// // transporter.sendMail(mailOptions, (error, info) => {
// //   if (error) {
// //     console.error('Error sending email:', error);
// //   } else {
// //     console.log('Email sent:', info.messageId);
// //   }
// // });
// type emailResponse = {
//   error?: string,
//   info?: string
// }
// export default async function sendVerificationCode(email: string):Promise<emailResponse> {
//     const mailOptions: nodemailer.SendMailOptions = {
//       from: from_email,
//       to: email,
//       subject: 'Verification Code',
//       text : `${generateRandomCode()}`
//     }
//     transporter.sendMail(mailOptions, (error, info) => {
//   if (error) {
//     console.error('Error sending email:', error);
//     return {error}
//   } else {
//     console.log('Email sent:', info.messageId);
//     return {info}
//   }
// });
// return {};
// }

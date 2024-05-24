const nodemailer = require('nodemailer');

const service = process.env.EMAIL_SERVICE
const user = process.env.EMAIL_USER
const pass = process.env.EMAIL_PASS

// Use your app password here if you have 2FA enabled, otherwise use your regular Gmail password
const transporter = nodemailer.createTransport({
  service: service,
  auth: {
    user: user,
    pass: pass
  }
});


module.exports = transporter
const transporter = require('../services/mail/mail');


const sendVerificationEmail = async({name,email,token}) => {
    var mailOptions = { 
        from: 'no-reply@Rankify.com',
        to: email, 
        subject: 'Account Verification Code',
        text: `Hello ${name} Please verify your account by using this code ${token} `
    }
    return transporter.sendMail(mailOptions).then(result => {
        return {result};
     }).catch(err => {
        console.log(err);
        return {error:err};
     }) 
}

module.exports = {
    sendVerificationEmail
}
const nodemailer = require('nodemailer');

async function SendEmail(to, subject,content){
    const transporter = nodemailer.createTransport({
        host: "smtp.gmail.com",
        port: 587,
        secure: false,
        auth: {
          user: process.env.USER_EMAIL, 
          pass:  process.env.USER_PASSWORD 
        }
      });
      
      return transporter.sendMail({
        from: process.env.USER_EMAIL,
        to: to,
        subject: subject,
        text: content,
      })
};

module.exports = {SendEmail};
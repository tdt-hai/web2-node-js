const nodemailer = require('nodemailer');

async function SendEmail(to, subject,content){
    const transporter = nodemailer.createTransport({
        host: "smtp.gmail.com",
        port: 587,
        secure: false,
        auth: {
          user: 'thanhhai30091999@gmail.com',//process.env.USER_EMAIL, //
          pass:  'Tdth13158'//process.env.USER_PASSWORD 
        }
      });
      
      return transporter.sendMail({
        from: 'thanhhai30091999@gmail.com',//process.env.USER_EMAIL,
        to: to,
        subject: subject,
        text: content,
      })
};

module.exports = {SendEmail};
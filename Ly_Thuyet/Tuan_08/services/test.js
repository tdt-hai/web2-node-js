const nodemailer = require('nodemailer');
const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 587,
  secure: false,
  auth: {
    user: 'thanhhai30091999@gmail.com',
    pass: 'Tdth13158'
  }
});

 transporter.sendMail({
  from: 'thanhhai30091999@gmail.com',
  to: "bosiwe1689@inbov03.com",
  subject: "Hello",
  text: "Hello world?",
  html: "<b>Hello world?</b>"
}).then(console.log).catch(console.error);
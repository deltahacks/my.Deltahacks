const nodemailer = require("nodemailer");

let transporter = nodemailer.createTransport({
  service: "gmail",
  secure: false,
  port: 25,
  auth: {
    user: "dh5attendee@gmail.com",
    pass: "attendee2018"
  },
  tls: {
    rejectUnauthorized: false
  }
});

let HelperOptions = {
  from: '"Patrick Parker" <dh5attendee@gmail.com',
  to: "dh5attendee@gmail.com",
  subject: "Hello World!",
  text: "Wow look at this email!"
};

transporter.sendMail(HelperOptions, (error, info) => {
  if (error) {
    return console.log(error);
  }
  console.log("The message was sent");
  console.log(info);
});

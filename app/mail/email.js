const nodemailer = require("nodemailer");
const smtpTransport = require("nodemailer-smtp-transport");
const handlebars = require("handlebars");
const fs = require("fs");

const config = {
  host: "smtp.gmail.com",
  port: 587,
  secure: false,
  auth: {
    user: "feedbackfrenzygame@gmail.com",
    pass: "Abc114018@"
  }
};

const mail = async mailObj => {
  const { type, link } = mailObj;
  let url, message, subject;

  switch (type) {
    case "verification":
      message = "Please verify your email address.";
      url = link;
      subject = "Email Verification";
      break;
    case "reset":
      message = "Reset your password .";
      url = link;
      subject = "Password Reset";
      break;
  }
  const readHTMLFile = (path, callback) => {
    fs.readFile(path, { encoding: "utf-8" }, (err, html) => {
      if (err) {
        throw err;
      } else {
        callback(null, html);
      }
    });
  };

  const smtpTrans = nodemailer.createTransport(smtpTransport(config));

  readHTMLFile(__dirname + "/email.html", (err, html) => {
    var template = handlebars.compile(html);
    var replacements = {
      url,
      message,
      body: mailObj._doc
    };
    var htmlToSend = template(replacements);
    var mailOptions = {
      from: process.env.EMAIL_USER,
      to: mailObj._doc.email,
      subject: subject,
      html: htmlToSend
    };
    smtpTrans.sendMail(mailOptions, (error, response) => {
      if (error) {
        console.log(error);
        callback(error);
      }
    });
  });
};

module.exports = mail;

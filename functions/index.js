const functions = require('firebase-functions');
const nodemailer = require('nodemailer');

exports.sendEmail = functions.database.ref('/suggestions')
.onWrite(event => {
  
  // Only edit data when it is first created.
  if (event.data.previous.exists() || !event.data.exists()) {
    return;
  }
  
  // Grab the current value of what was written to the Realtime Database.
  const original = event.data.val();
  console.log('Sending email...', original.email);

  // create reusable transporter object using the default SMTP transport
  let transporter = nodemailer.createTransport({
    host: "smtp.mailtrap.io",
    port: 2525,
    auth: {
      user: "dff39dc393fbc7",
      pass: "ecd4348de46440"
    }
  });

  let mailOptions = {
    from: '"Relias Learning" <suggestions@reliaslearning.com>', // sender address
    to: original.email, // list of receivers
    subject: 'Relias Employee Suggestion Box', // Subject line
    html: `<p>Welcome! ${original.name}</p>` // html body
  };

  // send mail with defined transport object
  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
        return console.log(error);
    }
    console.log('Message sent: %s', info.messageId);
  });
  
  return;

});
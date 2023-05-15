import nodemailer from 'nodemailer';
import Mailgen from 'mailgen';
import crypto from 'crypto';
import TokenModel from '../model/Token.model.js';
import ENV from '../config.js';

// https://ethereal.email/create

let config = {
  service: 'gmail',
  auth: {
    user: ENV.EMAIL,
    pass: ENV.PASSWORD,
  },
};

let transporter = nodemailer.createTransport(config);

let MailGenerator = new Mailgen({
  theme: 'default',
  product: {
    name: 'Mailgen',
    link: 'https://mailgen.js/',
  },
});

/** POST: http://localhost:8080/api/registerMail 
 * @param: {
  "username" : "example123",
  "userEmail" : "admin123",
  "text" : "",
  "subject" : "",
}
*/
export const registerMail = async (req, res) => {
  const { username, userEmail, text, subject } = req.body;

  const token = new TokenModel({
    username: username,
    token: crypto.randomBytes(16).toString('hex'),
  });

  token.save((err) => {
    if (err) {
      return res.status(500).send({
        error: 'Unable to save token',
      });
    }
    console.log(token);
    const verifyLink = `http://localhost:8080/api/users/${token.username}/confirmation/${token.token}`;

    // body of the email
    var email = {
      body: {
        name: username,
        intro:
          text ||
          "Welcome to Hella Digital! We're very excited to have you on board.",
        outro:
          "Need help, or have questions? Just reply to this email, we'd love to help.",
      },
    };

    var emailBody = MailGenerator.generate(email);

    let message = {
      from: ENV.EMAIL,
      to: userEmail,
      subject: subject || 'Signup Successful',
      html: `
      <div>
        <h1>Hi, ${username}</h1>
        <p>Welcome to Hella Digital! We're very excited to have you on board.</p>
        <a href="${verifyLink}">Click here to verify your account</a>
        <p>Need help, or have questions? Just reply to this email, we'd love to help.</p>
      </div>
      
      `,
    };

    // send mail
    transporter
      .sendMail(message)
      .then(() => {
        return res
          .status(200)
          .send({ msg: 'You should receive an email from us.' });
      })
      .catch((error) => res.status(500).send({ error }));
  });
};

const { SMTPServer } = require("smtp-server");
const express = require("express");

const MONGO = require("./src/utils/db");
const { SMTP_PORT, PORT } = require("./configs/dev");
const {
  onConnect,
  onMailFrom,
  onRcptTo,
  onAuth,
  onData,
} = require("./src/controllers/mail");
const { upsertAdmin } = require("./src/utils/seed");

const app = express();

const smtpServer = new SMTPServer({
  allowInsecureAuth: true,
  authOptional: true,
  onAuth,
  onConnect,
  onMailFrom,
  onRcptTo,
  onData,
});

MONGO()
  .then(async () => {
    console.log("Database Connected");
    await upsertAdmin();
    smtpServer.listen(SMTP_PORT, () => {
      console.log("Email server up and running:", SMTP_PORT);
      app.listen(PORT, () => {
        console.log("Express up and running:", PORT);
      });
    });
  })
  .catch((err) => {
    console.log(err);
  });

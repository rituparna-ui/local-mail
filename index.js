const { SMTPServer } = require("smtp-server");
const express = require("express");

const MONGO = require("./src/utils/db");
const { SMTP_PORT, PORT } = require("./configs/dev");

const app = express();

const smtpServer = new SMTPServer({});

MONGO()
  .then(() => {
    console.log("Database Connected");
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

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
const apiRoutes = require("./src/routes");
const notFound = require("./src/utils/errors/notFound");
const errorHandler = require("./src/utils/errors/errorHandler");

const app = express();

app.use(express.json());
app.use("/api/v1", apiRoutes);

app.use(express.static("./src/mail-client/dist"));

app.use(notFound);
app.use(errorHandler);

const smtpServer = new SMTPServer({
  allowInsecureAuth: true,
  // authOptional: true,
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

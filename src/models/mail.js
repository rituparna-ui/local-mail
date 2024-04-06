const mongoose = require("mongoose");

const mailSchema = new mongoose.Schema({
  isRead: { type: Boolean, default: false },
  attachments: [
    {
      path: { type: String },
      filename: { type: String },
    },
  ],
  headers: { type: Object },
  headerLines: [
    {
      key: { type: String },
      line: { type: String },
    },
  ],
  html: { type: String },
  text: { type: String },
  textAsHtml: { type: String },
  subject: { type: String },
  references: [String],
  date: { type: Date },
  to: { type: Object },
  from: { type: Object },
  cc: { type: Object },
  bcc: { type: Object },
  replyTo: { type: Object },
  messageId: { type: String },
  inReplyTo: { type: String },
  priority: {
    type: String,
    enum: ["normal", "high", "low"],
    default: "normal",
  },
  isDeleted: { type: Boolean, default: false },
});

module.exports = mongoose.model("Mails", mailSchema);

const Mail = require("./../models/mail");

exports.getMails = async (req, res, next) => {
  const projections = [
    "isRead",
    "attachments",
    "html",
    "text",
    "textAsHtml",
    "subject",
    "date",
    "to.value",
    "from.value",
    "messageId",
    "priority",
    "isDeleted",
  ];
  const mails = await Mail.find({
    isDeleted: false,
    "to.value.address": req.user.email,
  })
    // .select(projections.join(" "))
    .sort({ _id: -1 });
  return res.status(200).json({
    message: "Mails fetched successfully",
    data: {
      mails,
    },
  });
};

const bcrypt = require("bcryptjs");

const User = require("../models/user");
const { ADMIN_PASS } = require("../../configs/dev");

const upsertAdmin = async () => {
  const user = await User.findOne({ role: "SUDO" });
  if (!user) {
    const password = await bcrypt.hash(ADMIN_PASS, 12);
    await User.create({
      name: "localmail admin",
      email: "admin@localmail",
      role: "SUDO",
      password,
    });
    console.log("ADMIN UPSERT");
  }
};

module.exports = {
  upsertAdmin,
};

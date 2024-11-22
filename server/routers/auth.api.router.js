const router = require("express").Router();
const bcrypt = require("bcryptjs");
const { User } = require("../db/models");
const generateToken = require("../utils/generateToken");
const cookiesConfig = require("../configs/cookiesConfig");
const validator = require("validator");

router
  .post("/registration", async (req, res) => {
    const { first_name, last_name, email, password } = req.body;
    const status = "active";

    if (!(first_name && last_name && email && password)) {
      return res.status(400).json({ message: "All fields must be filled in" });
    }

    if (!validator.isEmail(email)) {
      return res.status(400).json({ message: "Invalid email format" });
    }

    const existingUser = await User.findOne({ where: { email } });
    if (existingUser) {
      return res
        .status(403)
        .json({ message: "User with this email already exists" });
    }

    const [user, created] = await User.findOrCreate({
      where: { email },
      defaults: {
        first_name,
        last_name,
        email,
        status,
        password: await bcrypt.hash(password, 10),
      },
    });

    await user.update({ last_seen_date: new Date() });

    const plainUser = user.get();
    delete plainUser.password;

    if (!created) res.status(403).json({ message: "User already exists" });

    const { accessToken, refreshToken } = generateToken({ user: plainUser });

    res
      .cookie("refreshToken", refreshToken, cookiesConfig.refresh)
      .json({ user: plainUser, accessToken });
  })

  .post("/login", async (req, res) => {
    const { email, password } = req.body;

    if (!(email && password)) {
      return res.status(400).json({ message: "All fields must be filled in" });
    }

    try {
      const user = await User.findOne({ where: { email } });

      if (!user) {
        return res.status(401).json({ message: "Incorrect user or password" });
      }

      if (user.status === "block") {
        return res
          .status(401)
          .json({ message: "Your account has been blocked" });
      }

      const correctPass = await bcrypt.compare(password, user.password);
      if (!correctPass) {
        return res.status(401).json({ message: "Incorrect user or password" });
      }

      await user.update({ last_seen_date: new Date() });

      const plainUser = user.get();
      delete plainUser.password;

      const { accessToken, refreshToken } = generateToken({ user: plainUser });

      res
        .cookie("refreshToken", refreshToken, cookiesConfig.refresh)
        .json({ user: plainUser, accessToken });
    } catch (error) {
      console.error("Error in signin:", error);
      res.status(500).json({ message: "Internal Server Error" });
    }
  });

module.exports = router;

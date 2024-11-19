const router = require("express").Router();
const { User } = require("../db/models");

router.get("/", async (req, res) => {
  try {
    const users = await User.findAll();
    res.json(users.map((user) => user.get({ plain: true })));
  } catch (error) {
    res.status(500).json({ error: "Error fetching" });
  }
});

module.exports = router;

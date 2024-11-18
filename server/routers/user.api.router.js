const router = require("express").Router();
const { User } = require("../db/models/user");

router.get("/", async (req, res) => {
  try {
    const users = await User.findAll();
    res.json(users);
  } catch (error) {
    res.status(500).json({ error: "Error fetching" });
  }
});

module.exports = router;

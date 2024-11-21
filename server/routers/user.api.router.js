const router = require("express").Router();
const { User } = require("../db/models");

router.get("/", async (req, res) => {
  try {
    const users = await User.findAll({
      order: [
        ['last_seen_date', 'DESC'],
      ]
    });
    res.json(users.map((user) => user.get({ plain: true })));
  } catch (error) {
    res.status(500).json({ error: "Error fetching" });
  }
})

  .patch("/block/:id", async (req, res) => {
    const { id } = req.params;
    try {
      await User.update({ status: "block" }, { where: { id } });
      res.status(200).send({ message: "User(s) blocked successfully" });
    } catch (error) {
      console.error(error);
      res.status(500).send({ message: "Error blocking user(s)" });
    }
  })

  .patch("/unblock/:id", async (req, res) => {
    const { id } = req.params;
    try {
      await User.update({ status: "active" }, { where: { id } });
      res.status(200).send({ message: "User(s) unblocked successfully" });
    } catch (error) {
      console.error(error);
      res.status(500).send({ message: "Error blocking user(s)" });
    }
  })

  .delete("/:id", async (req, res) => {
    const { id } = req.params;
    try {
      await User.destroy({ where: { id } });
      res.status(200).send({ message: "User(s) deleted successfully" });
    } catch (error) {
      res.status(500).send({ message: "Error deleting user(s)" });
    }
  });

module.exports = router;

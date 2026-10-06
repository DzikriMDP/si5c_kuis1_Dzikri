const express = require("express");
const router = express.Router();

const songController = require("../controllers/songController");

router.get("/", songController.getAll);
router.get("/:id", songController.getById);
router.post("/", songController.create);
router.put("/:id", songController.update);
router.delete("/:id", songController.remove);

module.exports = router;
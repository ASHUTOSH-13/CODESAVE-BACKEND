const express = require("express");
const apiRouter = express.Router();

//model
const Problem = require("../models/problem");

apiRouter.get("/count", async (req, res) => {
  const count = await Problem.countDocuments();
  const easyproblemcount = await Problem.countDocuments({ difficulty: "Easy" });
  const mediumproblemcount = await Problem.countDocuments({
    difficulty: "Medium",
  });
  const hardproblemcount = await Problem.countDocuments({ difficulty: "Hard" });
  res.json({ count, easyproblemcount, mediumproblemcount, hardproblemcount });
});

module.exports = apiRouter;

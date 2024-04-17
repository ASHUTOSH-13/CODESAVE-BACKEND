const Problem = require("../models/problem");

async function checkProblemExist(req, res, next) {
  const { _id } = req.body;

  try {
    const problem = await Problem.findById(_id);
    if (!problem) {
      return res
        .status(404)
        .json({ message: "Problem not found. Object does not exist." });
    }

    req.foundProblem = problem;
    next();
  } catch (error) {
    console.error("Error checking problem existence:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
}

module.exports = checkProblemExist;

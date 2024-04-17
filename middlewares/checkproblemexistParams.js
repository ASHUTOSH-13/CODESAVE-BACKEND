const Problem = require("../models/problem");

async function checkProblemExistParams(req, res, next) {
  const { id } = req.params;

  try {
    const problem = await Problem.findById(id);
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

module.exports = checkProblemExistParams;

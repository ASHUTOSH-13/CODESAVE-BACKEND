const express = require("express");
const questionRouter = express.Router();

//model
const Problem = require("../models/problem");

//middleware
const validateProblemData = require("../middlewares/validateProblemData");
const checkProblemExist = require("../middlewares/checkproblemexist");
const checkProblemExistParams = require("../middlewares/checkproblemexistParams");

//functions

const createProblemData = (req) => {
  const { title, difficulty, tags, notes, solution, description } = req.body;
  return {
    title,
    difficulty,
    tags,
    notes,
    solution,
    description,
  };
};

//routes
questionRouter.get("/:id", checkProblemExistParams, async (req, res) => {
  const { id } = req.params;
  const problem = await Problem.findById(id);
  res.json(problem);
});

questionRouter.delete("/:id", checkProblemExistParams, async (req, res) => {
  const { id } = req.params;

  try {
    await Problem.findByIdAndDelete(id);
    console.log("The problem with ID", id, "is deleted");
    res.send("The problem is deleted");
  } catch (error) {
    console.error("Error deleting problem:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

questionRouter.get("/:id/edit", checkProblemExistParams, async (req, res) => {
  const { id } = req.params;
  const problem = await Problem.findById(id);
  res.json(problem);
});

questionRouter.put(
  "/:id",
  checkProblemExistParams,
  validateProblemData,
  async (req, res) => {
    const { id } = req.params;
    const new_problem_data = createProblemData(req);
    await Problem.findByIdAndUpdate(id, new_problem_data);
    console.log(id);
    res.send(new_problem_data);
  }
);

questionRouter.get("/", async (req, res) => {
  const allProblems = await Problem.find({}).sort({ updatedAt: -1 });
  console.log(req.query.tags);
  console.log(req.query.difficulty);
  res.json(allProblems);
});

questionRouter.post("/", validateProblemData, async (req, res) => {
  const new_problem_data = createProblemData(req);
  const problem = new Problem(new_problem_data);
  await problem.save();
  console.log("new problem is added to the database having title", problem);
  res.send(problem);
});

module.exports = questionRouter;

function validateProblemData(req, res, next) {
  const { title, difficulty } = req.body;

  const add_title = { message: "please add title" };
  const add_difficulty = { message: "please select difficulty" };

  if (!title) {
    return res.status(400).json(add_title);
  }

  if (!difficulty) {
    return res.status(400).json(add_difficulty);
  }

  next();
}

module.exports = validateProblemData;

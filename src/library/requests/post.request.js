const postNew = async (req, res, Model) => {
  const modelData = new Model({
    ...req.body,
    owner: req.user._id,
  });
  try {
    await modelData.save();
    res.status(201).send("The record has been successfully created.");
  } catch (error) {
    res.status(500).send({ error: error.message });
  }
};

module.exports = { postNew };

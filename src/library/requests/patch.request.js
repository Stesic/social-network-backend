const update = async (req, res, Model, allowedUpdates) => {
  const updates = Object.keys(req.body);
  const hasBodyContent = Object.keys(req.body).length > 0;
  const isValidOperation = updates.every((update) =>
    allowedUpdates.includes(update)
  );
  if (!isValidOperation || !hasBodyContent) {
    return res.status(400).send("Error: invalid body.");
  }
  try {
    if (!req.params.id) {
      return res.status(400).send("id missing - 400");
    }
    const modelData = await Model.findById(req.params.id);

    if (!modelData) {
      return res.status(404).send(`${req.path} not found`);
    }
    const modelDataOwner = req.path.includes("users")
      ? modelData._id
      : modelData.owner;
    if (modelDataOwner.toString() !== req.user._id.toString()) {
      return res.status(403).send("You are not allowed to change this data!!!");
    }

    updates.forEach((update) => {
      modelData[update] = req.body[update];
    });
    modelData.owner = req.user._id;

    res.status(201).send(modelData);
    modelData.save();
  } catch (error) {
    res.status(500).send({ error: error.message });
  }
};

module.exports = { update };

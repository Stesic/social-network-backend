const update = async (req, res, Model, allowedUpdates) => {
  const updates = Object.keys(req.body);
  const hasBodyContent = Object.keys(req.body).length > 0;
  const isValidOperation = updates.every((update) =>
    allowedUpdates.includes(update)
  );
  if (!isValidOperation || !hasBodyContent) {
    return res.status(400).send({ error: "Invalid body." });
  }
  try {
    if (!req.params.id) {
      return res.status(400).send({ error: "Bad request - ID is missing" });
    }
    const modelData = await Model.findById(req.params.id);

    if (!modelData) {
      return res.status(404).send({ error: `${req.path} not found` });
    }
    const modelDataOwner = req.path.includes("users")
      ? modelData._id
      : modelData.owner;
    if (modelDataOwner.toString() !== req.user._id.toString()) {
      return res
        .status(403)
        .send({ error: "You are not allowed to change this data!!!" });
    }

    updates.forEach((update) => {
      modelData[update] = req.body[update];
    });
    modelData.owner = req.user._id;

    res.status(200).send("The record has been successfully updated!!!");
    modelData.save();
  } catch (error) {
    res.status(500).send({ error: error.message });
  }
};

module.exports = { update };

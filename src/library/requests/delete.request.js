const deleteOne = async (req, res, Model) => {
  const reqId = req.params.id;
  if (!reqId) {
    return res.status(400).send("id missing - 400");
  }

  try {
    const modelData = await Model.findOne({
      _id: reqId,
    });

    if (modelData.owner.toString() !== req.user._id.toString()) {
      return res.status(403).send("You are not allowed to delete this data!!!");
    }

    res.status(200).send(modelData);
    modelData.delete();
    modelData.save();
  } catch (error) {
    res.status(500).send({ error: error.message });
  }
};

module.exports = { deleteOne };

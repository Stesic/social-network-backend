const deleteOne = async (req, res, Model) => {
  const reqId = req.params.id;
  if (!reqId) {
    return res.status(400).send({ error: "Bad request - ID is missing!!!" });
  }

  try {
    const modelData = await Model.findOne({
      _id: reqId,
    });
    const modelDataOwner = req.path.includes("users")
      ? modelData._id
      : modelData.owner;
    if (modelDataOwner.toString() !== req.user._id.toString()) {
      return res
        .status(403)
        .send({ error: "You are not allowed to delete this data!!!" });
    }

    res.status(200).send("The records have been successfully deleted.");
    modelData.delete();
    modelData.save();
  } catch (error) {
    res.status(500).send({ error: error.message });
  }
};

module.exports = { deleteOne };

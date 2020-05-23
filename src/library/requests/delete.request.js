const deleteOne = async (req, res, Model, RelativeModel, populateValue) => {
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

    if (populateValue) {
      // delete relative data - example: delete post and all post comments
      const relativeModelData = await modelData
        .populate({
          path: populateValue,
        })
        .execPopulate();
      const relativeModelDataList = relativeModelData[populateValue];
      relativeModelDataList.forEach(async (element) => {
        const relativeModel = await RelativeModel.findOne({ _id: element._id });
        relativeModel.delete();
      });
    }
    res
      .status(200)
      .send({ data: "The records have been successfully deleted." });
    modelData.delete();
  } catch (error) {
    res.status(500).send({ error: error.message });
  }
};

module.exports = { deleteOne };

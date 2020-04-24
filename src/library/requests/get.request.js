const getAll = async (req, res, Model) => {
  const limit = Number.parseInt(req.query.limit) || 10;
  const offset = Number.parseInt(req.query.offset) || 0;

  try {
    const modelData = await Model.find().limit(limit).skip(offset);
    if (!modelData) {
      return res.status(404).send(`${req.path} not found`);
    }
    res.status(200).send(modelData);
  } catch (error) {
    res.status(500).send({ error: error.message });
  }
};

const getSingle = async (req, res, Model) => {
  const postId = req.params.id;
  try {
    const modelData = await Model.findById(postId);
    if (!modelData) {
      return res.status(404).send(`${req.path} not found`);
    }
    res.status(200).send(modelData);
  } catch (error) {
    res.status(500).send({ error: error.message });
  }
};

module.exports = { getAll, getSingle };

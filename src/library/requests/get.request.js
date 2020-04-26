const getAll = async (req, res, Model, searchField) => {
  const limit = Number.parseInt(req.query.limit) || 10;
  const offset = Number.parseInt(req.query.offset) || 0;

  try {
    const searchQuery = req.query.q;
    //filter data with search query value
    if (searchQuery) {
      const filteredData = await Model.find({
        [searchField]: new RegExp(searchQuery, "i"),
      });

      res.status(200).send({ data: filteredData, total: filteredData.length });
      return;
    }
    // all data
    const data = await Model.find().limit(limit).skip(offset);

    if (!data) {
      return res.status(404).send(`${req.path} not found`);
    }

    res.status(200).send({ data, total: data.length });
  } catch (error) {
    res.status(500).send({ error: error.message });
  }
};

const getSingle = async (req, res, Model) => {
  const postId = req.params.id;
  try {
    const data = await Model.findById(postId);
    if (!data) {
      return res.status(404).send(`${req.path} not found`);
    }
    res.status(200).send(data);
  } catch (error) {
    res.status(500).send({ error: error.message });
  }
};

const getRelationAll = async (req, res, Model, populateValue) => {
  const limit = Number.parseInt(req.query.limit) || 10;
  const offset = Number.parseInt(req.query.offset) || 0;
  const id = req.params.id;

  try {
    const model = await Model.findById(id);

    const data = await model
      .populate({
        path: populateValue,
        options: {
          limit: parseInt(limit),
          skip: parseInt(offset),
          sort: {
            createdAt: 1, // -1 desc, 1 asc
          },
        },
      })
      .execPopulate();

    if (!data[populateValue]) {
      res.status(404).send(`${populateValue} not found`);
      return;
    }
    const total = data[populateValue].length;
    res.status(200).send({ data: data[populateValue], total });
  } catch (error) {
    res.status(500).send({ error: error.message });
  }
};

module.exports = { getAll, getSingle, getRelationAll };

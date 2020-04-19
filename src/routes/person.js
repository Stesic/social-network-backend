let express = require("express");

let router = express.Router();
let personsJSON = require("../../data/persons.json");
const persons = JSON.parse(personsJSON);

router.get("/person", (req, res) => {
  const nameQuery = req.query.name;
  const ageQuery = req.query.age;
  const result = persons.filter((person) => {
    return person.name === nameQuery && person.age === ageQuery;
  });

  if (!nameQuery) {
    res.send(persons);
  } else {
    res.send(result);
  }
});

router.get("/person/:name/", (req, res) => {
  const paramsName = req.params.name;

  res.send(paramsName);
});

module.exports = router;

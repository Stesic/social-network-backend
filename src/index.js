const express = require("express");
const path = require("path");
const app = express();
const personRoute = require("./routes/person");
const userRoute = require("./routes/user");
const bodyParser = require("body-parser");
const PORT = process.env.PORT || 3000;

//to have access to req.body in entire project
app.use(bodyParser.json());

app.use((req, res, next) => {
  console.log(req.originalUrl);
  next();
});
app.use(userRoute);
app.use(personRoute);
app.use(express.static("public"));

//handler for 404 - resource not found
app.use((req, res, next) => {
  res.status(404).send("page not fount, 404");
  next();
});

// handler for 500
app.use((error, req, res, next) => {
  // res.sendFile(path.join(__dirname, "../public/error500.html"));
  res.send(error);
  next();
});

app.listen(PORT, () => {
  console.log(`Server has started on ${PORT}`);
});

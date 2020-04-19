let mongoose = require("mongoose");

const server = "cluster0-mdfnk.mongodb.net/test?retryWrites=true&w=majority";
// const user = "petar";
const user = "IvanStesic";
const database = "socialNetworkDB";

const password = "wMwPLws4py7NuwYY";
//const password = "ggJHeHryQMftuOmu"; //petar

const uri = `mongodb+srv://${user}:${password}@cluster0-mdfnk.mongodb.net/${database}`;
mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true });

let UserSchema = new mongoose.Schema({
  name: String,
  email: {
    type: String,
    required: true,
    unique: true,
  },
});

module.exports = mongoose.model("User", UserSchema);

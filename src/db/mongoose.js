let mongoose = require("mongoose");

// const server = "@cluster0-mdfnk.mongodb.net/";
const server = "@cluster0-mdfnk.mongodb.net/";
// const user = "petar";
const user = "IvanStesic";
const database = "socialNetworkDB";

const password = "ESiQrmshkbM2bos8";
//const password = "ggJHeHryQMftuOmu"; //petar

// const uri = `mongodb+srv://${user}:${password}${server}${database}`;
const uri = `mongodb://${user}:${password}@cluster0-shard-00-00-mdfnk.mongodb.net:27017,cluster0-shard-00-01-mdfnk.mongodb.net:27017,cluster0-shard-00-02-mdfnk.mongodb.net:27017/${database}?ssl=true&replicaSet=Cluster0-shard-0&authSource=admin&retryWrites=true&w=majority`;

mongoose.connect(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true,
  useFindAndModify: false,
});

let mongoose = require("mongoose");

const user = "IvanStesic";
const database = "socialNetworkDB";

const password = "ESiQrmshkbM2bos8";

const uri = `mongodb://${user}:${password}@cluster0-shard-00-00-mdfnk.mongodb.net:27017,cluster0-shard-00-01-mdfnk.mongodb.net:27017,cluster0-shard-00-02-mdfnk.mongodb.net:27017/${database}?ssl=true&replicaSet=Cluster0-shard-0&authSource=admin&retryWrites=true&w=majority`;

mongoose.connect(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true,
  useFindAndModify: false,
});

const info = require("./info");
const authPaths = require("./auth.path");
const userPaths = require("./user.path");
const postPaths = require("./post.path");
const commentPaths = require("./comment.path");
const messagePaths = require("./message.path");
const security = require("./security");
const schemas = require("./schemas");

const doc = {
  ...info,
  paths: {
    ...authPaths,
    ...userPaths,
    ...postPaths,
    ...commentPaths,
    ...messagePaths,
  },
  components: {
    ...security,
    ...schemas,
  },
};

module.exports = doc;

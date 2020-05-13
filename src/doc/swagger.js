const authPaths = require("./auth.paths");
const swaggerDoc = {
  openapi: "3.0.0",
  info: {
    title: "Social Network API",
    description: "Social Network API",
    contact: {
      email: "ivan.stesic@gmail.com",
    },
    version: "1.0",
  },
  tags: [
    {
      name: "Auth",
      description: "API for authentication",
    },
    {
      name: "Post",
      description: "API for Post",
    },
    {
      name: "User",
      description: "API for User",
    },
    {
      name: "Comment",
      description: "API for Comment",
    },
  ],
  servers: [
    {
      url: "https://backend-social-network.herokuapp.com",
      description: "Production server",
    },
    {
      url: "http://localhost:5500",
      description: "Development server",
    },
  ],
};

module.exports = swaggerDoc;

const info = {
  openapi: "3.0.0",
  info: {
    title: "Social Network API",
    description: "Social Network API",
    contact: {
      email: "ivan.stesic@gmail.com",
    },
    version: "1.0",
  },
  security: [
    {
      ApiKeyAuth: [],
    },
    {
      bearerAuth: [],
    },
  ],
  tags: [
    {
      name: "Auth",
      description: "API for authentication",
    },
    {
      name: "User",
      description: "API for User",
    },
    {
      name: "Post",
      description: "API for Post",
    },
    {
      name: "Comment",
      description: "API for Comment",
    },
    {
      name: "Message",
      description: "API for Message",
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

module.exports = info;

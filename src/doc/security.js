const security = {
  securitySchemes: {
    bearerAuth: {
      type: "http",
      scheme: "bearer",
    },
    ApiKeyAuth: {
      type: "apiKey",
      in: "header",
      name: "X-API-KEY",
    },
  },
};
module.exports = security;

const user = {
  "users/me": {
    get: {
      tags: ["User"],
      summary: "Get Logged User",
      description: "Get Currently Logged User",
      responses: {
        "200": {
          content: {
            "application/json": {
              schema: {
                $ref: "#/components/schemas/User",
              },
            },
          },
        },
        "404": {
          content: {
            "application/json": {
              schema: {
                $ref: "#/components/schemas/error_404",
              },
            },
          },
        },
        "500": {
          content: {
            "application/json": {
              schema: {
                $ref: "#/components/schemas/error_500",
              },
            },
          },
        },
      },
    },
  },
  "/users": {
    get: {
      tags: ["User"],
      summary: "Get All Users",
      description: "Get all registered users",
      parameters: [
        {
          name: "limit",
          in: "query",
          description: "Limit per page",
          default: 10,
        },
        {
          name: "offset",
          in: "query",
          description: "Skip number of",
          default: 0,
        },
      ],
      responses: {
        "200": {
          content: {
            "application/json": {
              schema: {
                $ref: "#/components/schemas/User",
              },
            },
          },
        },
        "400": {
          content: {
            "application/json": {
              schema: {
                $ref: "#/components/schemas/error_400",
              },
            },
          },
        },
        "404": {
          content: {
            "application/json": {
              schema: {
                $ref: "#/components/schemas/error_404",
              },
            },
          },
        },
        "500": {
          content: {
            "application/json": {
              schema: {
                $ref: "#/components/schemas/error_500",
              },
            },
          },
        },
      },
    },
  },
  "/users/{id}": {
    get: {
      tags: ["User"],
      summary: "Get Single User",
      description: "Get Single User",
      parameters: [
        {
          name: "id",
          in: "path",
          description: "User ID",
          required: true,
        },
      ],
      responses: {
        "200": {
          content: {
            "application/json": {
              schema: {
                $ref: "#/components/schemas/User",
              },
            },
          },
        },
        "404": {
          content: {
            "application/json": {
              schema: {
                $ref: "#/components/schemas/error_404",
              },
            },
          },
        },
        "500": {
          content: {
            "application/json": {
              schema: {
                $ref: "#/components/schemas/error_500",
              },
            },
          },
        },
      },
    },
    patch: {
      tags: ["User"],
      summary: "Update User",
      description: "Update Single User",
      parameters: [
        {
          name: "id",
          in: "path",
          description: "User ID",
          required: true,
        },
      ],
      requestBody: {
        required: true,
        description: "Body",
        content: {
          "application/json": {
            schema: {
              $ref: "#/components/schemas/UserUpdate",
            },
          },
        },
      },
      responses: {
        "200": {
          content: {
            "application/json": {
              schema: {
                $ref: "#/components/schemas/Success_200",
              },
            },
          },
        },
        "400": {
          content: {
            "application/json": {
              schema: {
                $ref: "#/components/schemas/error_400",
              },
            },
          },
        },
        "403": {
          content: {
            "application/json": {
              schema: {
                $ref: "#/components/schemas/error_403",
              },
            },
          },
        },
        "404": {
          content: {
            "application/json": {
              schema: {
                $ref: "#/components/schemas/error_404",
              },
            },
          },
        },
        "500": {
          content: {
            "application/json": {
              schema: {
                $ref: "#/components/schemas/error_500",
              },
            },
          },
        },
      },
    },
    delete: {
      tags: ["User"],
      summary: "Delete User",
      description: "Delete Single User",
      parameters: [
        {
          name: "id",
          in: "path",
          description: "User ID",
          required: true,
        },
      ],
      responses: {
        "200": {
          content: {
            "application/json": {
              schema: {
                $ref: "#/components/schemas/Success_200",
              },
            },
          },
        },
        "400": {
          content: {
            "application/json": {
              schema: {
                $ref: "#/components/schemas/error_400",
              },
            },
          },
        },
        "403": {
          content: {
            "application/json": {
              schema: {
                $ref: "#/components/schemas/error_403",
              },
            },
          },
        },
        "500": {
          content: {
            "application/json": {
              schema: {
                $ref: "#/components/schemas/error_500",
              },
            },
          },
        },
      },
    },
  },
  "/users/{id}/posts": {
    get: {
      tags: ["User"],
      summary: "Get All User Posts",
      description: "Get User Posts",
      parameters: [
        {
          name: "id",
          in: "path",
          description: "User ID",
          required: true,
        },
        {
          name: "limit",
          in: "query",
          description: "Limit per page",
          default: 10,
        },
        {
          name: "offset",
          in: "query",
          description: "Skip number of",
          default: 0,
        },
      ],
      responses: {
        "200": {
          content: {
            "application/json": {
              schema: {
                $ref: "#/components/schemas/Comment",
              },
            },
          },
        },
        "404": {
          content: {
            "application/json": {
              schema: {
                $ref: "#/components/schemas/error_404",
              },
            },
          },
        },
        "500": {
          content: {
            "application/json": {
              schema: {
                $ref: "#/components/schemas/error_500",
              },
            },
          },
        },
      },
    },
  },
  "/users/{id}/comments": {
    get: {
      tags: ["User"],
      summary: "Get All User Comments",
      description: "Get User Comments",
      parameters: [
        {
          name: "id",
          in: "path",
          description: "User ID",
          required: true,
        },
        {
          name: "limit",
          in: "query",
          description: "Limit per page",
          default: 10,
        },
        {
          name: "offset",
          in: "query",
          description: "Skip number of",
          default: 0,
        },
      ],
      responses: {
        "200": {
          content: {
            "application/json": {
              schema: {
                $ref: "#/components/schemas/Comment",
              },
            },
          },
        },
        "404": {
          content: {
            "application/json": {
              schema: {
                $ref: "#/components/schemas/error_404",
              },
            },
          },
        },
        "500": {
          content: {
            "application/json": {
              schema: {
                $ref: "#/components/schemas/error_500",
              },
            },
          },
        },
      },
    },
  },
};

module.exports = user;

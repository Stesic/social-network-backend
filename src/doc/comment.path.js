const comment = {
  "/comments": {
    post: {
      tags: ["Comment"],
      summary: "Post New Comment",
      description: "Comment Post",
      requestBody: {
        required: true,
        description: "Comment body",
        content: {
          "application/json": {
            schema: {
              $ref: "#/components/schemas/CommentCreate",
            },
          },
        },
      },
      responses: {
        "201": {
          description: "Post created",
          content: {
            "application/json": {
              schema: {
                $ref: "#/components/schemas/Created_201",
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
          description: "Internal server error",
        },
      },
    },
    get: {
      tags: ["Comment"],
      summary: "Get All Comments",
      description: "Get all Post Comments",
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
          description: "All Comments",
          content: {
            "application/json": {
              schema: {
                $ref: "#/components/schemas/Comment",
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
          description: "Internal server error",
        },
      },
    },
  },
  "/comment/{id}": {
    get: {
      tags: ["Comment"],
      summary: "Get Single Comment",
      description: "Get Single Comment",
      parameters: [
        {
          name: "id",
          in: "path",
          description: "Comment ID",
          required: true,
        },
      ],
      responses: {
        "200": {
          description: "Single Comment",
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
          description: "Internal server error",
        },
      },
    },
    patch: {
      tags: ["Comment"],
      summary: "Update Comment",
      description: "Update Single Comment",
      parameters: [
        {
          name: "id",
          in: "path",
          description: "Comment ID",
          required: true,
        },
      ],
      requestBody: {
        required: true,
        description: "Comment body",
        content: {
          "application/json": {
            schema: {
              $ref: "#/components/schemas/CommentUpdate",
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
      tags: ["Comment"],
      summary: "Delete Comment",
      description: "Delete Single Comment",
      parameters: [
        {
          name: "id",
          in: "path",
          description: "Comment ID",
          required: true,
        },
      ],
      responses: {
        "200": {
          description: "Comment Deleted Successfully",
          content: {
            "application/json": {
              schema: {
                $ref: "#/components/schemas/Success_200",
              },
            },
          },
        },
        "400": {
          description: "400 Error",
          content: {
            "application/json": {
              schema: {
                $ref: "#/components/schemas/error_400",
              },
            },
          },
        },
        "403": {
          description: "403 Error",
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
};

module.exports = comment;

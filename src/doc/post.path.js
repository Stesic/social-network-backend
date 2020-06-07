const post = {
  "/posts": {
    post: {
      tags: ["Post"],
      summary: "Create New Post",
      description: "Create new video, text, image post",
      requestBody: {
        required: true,
        description: "Post body",
        content: {
          "application/json": {
            schema: {
              $ref: "#/components/schemas/PostCreate",
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
      tags: ["Post"],
      summary: "Get All Posts",
      description: "Get all saved posts",
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
          description: "All posts",
          content: {
            "application/json": {
              schema: {
                $ref: "#/components/schemas/Post",
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
  "/posts/{id}": {
    get: {
      tags: ["Post"],
      summary: "Get Single Post",
      description: "Get Single Post",
      parameters: [
        {
          name: "id",
          in: "path",
          description: "Post ID",
          required: true,
        },
      ],

      responses: {
        "200": {
          description: "Single Post",
          content: {
            "application/json": {
              schema: {
                $ref: "#/components/schemas/Post",
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
      tags: ["Post"],
      summary: "Update Post",
      description: "Update Single Post",
      parameters: [
        {
          name: "id",
          in: "path",
          description: "Post ID",
          required: true,
        },
      ],
      requestBody: {
        required: true,
        description: "Post body",
        content: {
          "application/json": {
            schema: {
              $ref: "#/components/schemas/PostUpdate",
            },
          },
        },
      },
      responses: {
        "200": {
          description: "All Posts By Post Type",
          content: {
            "application/json": {
              schema: {
                $ref: "#/components/schemas/Success_200",
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
        "404": {
          content: {
            "application/json": {
              schema: {
                $ref: "#/components/schemas/error_404",
              },
            },
          },
          description: "Internal server error",
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
    delete: {
      tags: ["Post"],
      summary: "Delete Post",
      description: "Delete Single Post",
      parameters: [
        {
          name: "id",
          in: "path",
          description: "Post ID",
          required: true,
        },
      ],
      responses: {
        "200": {
          description: "Post Deleted Successfully",
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
          description: "Internal server error",
        },
      },
    },
  },
  "/posts/{id}/comments": {
    get: {
      tags: ["Post"],
      summary: "Get All Post Comments",
      description: "Get Post Comments",
      parameters: [
        {
          name: "id",
          in: "path",
          description: "Post ID",
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
          description: "Single Post Comments",
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
          description: "Internal server error",
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
  "/posts/type": {
    get: {
      tags: ["Post"],
      summary: "Get All Post Filtered By Type",
      description: "Filtered Posts By Type",
      parameters: [
        {
          name: "q",
          in: "query",
          description: "Query values: video, image or text",
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
          description: "All Posts By Post Type",
          content: {
            "application/json": {
              schema: {
                $ref: "#/components/schemas/Post",
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
          description: "Internal server error",
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
};

module.exports = post;

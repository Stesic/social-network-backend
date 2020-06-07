const message = {
  "messages/sent/{senderID}/{receiverID}": {
    get: {
      tags: ["Message"],
      summary: "Get User Sent Messages to Single Receiver",
      description: "Sent Messages to Single Receiver",
      parameters: [
        {
          name: "senderID",
          in: "path",
          description: "Id of message Sender",
          required: true,
        },
        {
          name: "receiverID",
          in: "path",
          description: "Id of message Receiver",
          required: true,
        },
      ],
      responses: {
        "200": {
          content: {
            "application/json": {
              schema: {
                $ref: "#/components/schemas/MessageSent",
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
  "messages/received/{senderID}/{receiverID}": {
    get: {
      tags: ["Message"],
      summary: "Get User Received Messages from Single Sender",
      description: "Received Messages from Single Sender",
      parameters: [
        {
          name: "senderID",
          in: "path",
          description: "Id of message Sender",
          required: true,
        },
        {
          name: "receiverID",
          in: "path",
          description: "Id of message Receiver",
          required: true,
        },
      ],
      responses: {
        "200": {
          content: {
            "application/json": {
              schema: {
                $ref: "#/components/schemas/MessageReceived",
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
  "messages/unread/{receiverID}": {
    get: {
      tags: ["Message"],
      summary: "Get Received Unread Messages Number",
      description: "Total Received Messages",
      parameters: [
        {
          name: "receiverID",
          in: "path",
          description: "Id of messages Receiver",
          required: true,
        },
      ],
      responses: {
        "200": {
          content: {
            "application/json": {
              schema: {
                $ref: "#/components/schemas/TotalData",
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
  "messages/unread/{senderID}/{receiverID}": {
    get: {
      tags: ["Message"],
      summary: "Get Received Unread Messages Number From Single Sender",
      description: "Total Received Messages",
      parameters: [
        {
          name: "senderID",
          in: "path",
          description: "Id of message Sender",
          required: true,
        },
        {
          name: "receiverID",
          in: "path",
          description: "Id of messages Receiver",
          required: true,
        },
      ],
      responses: {
        "200": {
          content: {
            "application/json": {
              schema: {
                $ref: "#/components/schemas/TotalData",
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
  "messages/read/{senderID}/{receiverID}": {
    patch: {
      tags: ["Message"],
      summary: "Read All Messages From Single Sender",
      description:
        "Read Messages From Single Sender (set 'seen' status to true",
      parameters: [
        {
          name: "senderID",
          in: "path",
          description: "Id of message Sender",
          required: true,
        },
        {
          name: "receiverID",
          in: "path",
          description: "Id of messages Receiver",
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
  "messages/send": {
    post: {
      tags: ["Message"],
      summary: "Send Message",
      description: "Send Message",
      requestBody: {
        required: true,
        description: "Send Message to Single Receiver",
        content: {
          "application/json": {
            schema: {
              $ref: "#/components/schemas/MessageCreate",
            },
          },
        },
      },
      responses: {
        "201": {
          content: {
            "application/json": {
              schema: {
                $ref: "#/components/schemas/Created_201",
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
        "409": {
          description: "409 Error",
          content: {
            "application/json": {
              schema: {
                $ref: "#/components/schemas/error_409",
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
};

module.exports = message;

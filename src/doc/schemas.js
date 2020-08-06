const schemas = {
  schemas: {
    Register: {
      type: "object",
      properties: {
        email: {
          type: "string",
          example: "john@gmail.com",
          required: true,
        },
        password: {
          type: "string",
          minimum: 7,
          example: "1234567",
          required: true,
        },
        firstName: {
          type: "string",
          minimum: 2,
          example: "John",
          required: true,
        },
        lastName: {
          type: "string",
          minimum: 2,
          example: "Smith",
          required: true,
        },
      },
    },
    Login: {
      type: "object",
      properties: {
        email: {
          type: "string",
          example: "john@gmail.com",
          required: true,
        },
        password: {
          type: "string",
          minimum: 7,
          example: "1234567",
          required: true,
        },
      },
    },
    ResetPassword: {
      type: "object",
      properties: {
        email: {
          type: "string",
          example: "john@gmail.com",
          required: true,
        },
      },
    },
    ChangePassword: {
      type: "object",
      properties: {
        email: {
          type: "string",
          example: "john@gmail.com",
          required: true,
        },
        password: {
          type: "string",
          example: "1234567",
          required: true,
        },
        newPassword: {
          type: "string",
          example: "7654321",
          required: true,
        },
      },
    },
    User: {
      type: "object",
      properties: {
        _id: {
          type: "string",
          format: "binary",
          example: "5eba6e8fec5d84001717a207",
        },
        avatarUrl: {
          type: "buffer",
          example: `<Buffer 66 00 68 00 71 00 77 00 68 00 67 00 61 00 64 00 73 00>`,
          description: `You will receive Buffer. You need to convert it to base64 and then set as img src with  "data:image/png;base64," prefix`,
        },
        firstName: {
          type: "string",
          example: "John ",
          minimum: 2,
          required: true,
        },
        lastName: {
          type: "string",
          example: "Smith",
          minimum: 2,
          required: true,
        },
        fullName: {
          type: "string",
          example: "John Smith",
          minimum: 2,
        },
        about: {
          type: "string",
          example: "something about yourself",
          minimum: 10,
        },
        email: {
          type: "string",
          example: "john@gmail.com",
          required: true,
        },
        prefix: {
          type: "string",
          expample: "Developer",
        },
        createdAt: {
          type: "string",
          format: "date",
          example: "2020-05-12T09:38:23.104Z",
        },
        updatedAt: {
          type: "string",
          format: "date",
          example: "2020-05-12T09:38:23.104Z",
        },
        lastActive: {
          type: "string",
          format: "date",
          example: "2020-05-12T09:38:23.104Z",
          description: "Shows last user activity",
        },
      },
    },
    UserUpdate: {
      type: "object",
      properties: {
        firstName: {
          type: "string",
          example: "John ",
          minimum: 2,
        },
        lastName: {
          type: "string",
          example: "Smith",
          minimum: 2,
        },
        avatarUrl: {
          type: "file",
          description: `Payload will be form data: const formData = new FormData();
          formData.append("image", files[0], files[0].name)`,
        },
        about: {
          type: "string",
          example: "something about yourself",
          minimum: 10,
        },
        prefix: {
          type: "string",
          example: "Developer",
        },
      },
    },
    UserProfileImage: {
      type: "object",
      properties: {
        file: {
          type: "array",
          description: `const formData = new FormData();
        formData.append("image", files[0], files[0].name);`,
        },
      },
    },

    Post: {
      type: "object",
      properties: {
        _id: {
          type: "string",
          format: "binary",
          example: "5eba6e8fec5d84001717a207",
        },
        type: {
          type: "string",
          example: "text",
          description: "type can be image,video or text",
        },
        src: {
          type: "string || buffer",
          description: `Post can be image,video or text. Video src is embed youtube video If post is image, you will receive Buffer. You need to convert it to base64 and then set as img src with  "data:image/png;base64," prefix`,
        },
        owner: {
          type: "string",
          format: "binary",
          example: "5ea53939273df12f5cd4b200",
        },
        createdAt: {
          type: "string",
          format: "date",
          example: "2020-05-12T09:38:23.104Z",
        },
        updatedAt: {
          type: "string",
          format: "date",
          example: "2020-05-12T09:38:23.104Z",
        },
      },
    },
    PostCreate: {
      type: "object",
      properties: {
        type: {
          type: "string",
          example: "text",
          required: true,
          description: "type can be image,video or text",
        },
        src: {
          type: "string || file",
          example: "new text post",
          required: true,
          description: `Video src is embed youtube video. Image post payload will be form data: const formData = new FormData();
          formData.append("image", files[0], files[0].name)`,
        },
      },
    },
    PostUpdate: {
      type: "object",
      properties: {
        type: {
          type: "string",
          example: "text",
          description: "type can be image,video or text",
        },
        src: {
          type: "string || file",
          example: "New text will update post",
          required: true,
          description: `Video src is embed youtube video. Image post payload will be form data: const formData = new FormData();
          formData.append("image", files[0], files[0].name)`,
        },
      },
    },

    Comment: {
      type: "object",
      properties: {
        _id: {
          type: "string",
          format: "binary",
          example: "5ea55b3e79152d0017d846e4",
          description: "Comment ID",
        },
        postId: {
          type: "string",
          example: "5ea5490c793d2f00176228da",
          format: "binary",
          description: "PostID",
        },
        body: {
          type: "string",
          example: "new comment",
        },
        owner: {
          type: "string",
          format: "binary",
          example: "5ea53939273df12f5cd4b200",
          description: "User that has commented post",
        },
        createdAt: {
          type: "string",
          format: "date",
          example: "2020-05-12T09:38:23.104Z",
        },
        updatedAt: {
          type: "string",
          format: "date",
          example: "2020-05-12T09:38:23.104Z",
        },
      },
    },

    CommentCreate: {
      type: "object",
      properties: {
        postId: {
          type: "string",
          format: "binary",
          example: "5ea5490c793d2f00176228da",
          required: true,
        },
        body: {
          type: "string",
          example: "new comment",
          required: true,
        },
      },
    },
    CommentUpdate: {
      type: "object",
      properties: {
        body: {
          type: "string",
          example: "comment text",
        },
      },
    },
    Message: {
      type: "object",
      properties: {
        _id: {
          type: "string",
          format: "binary",
          example: "5ea55b3e79152d0017d846e4",
          description: "Message ID",
        },
        owner: {
          type: "string",
          example: "5ea5490c793d2f00176228da",
          format: "binary",
          description: "Message Owner - Sender ID",
        },
        to: {
          type: "string",
          example: "5ea5490c793d2f00176228da",
          format: "binary",
          description: "Send message to - Receiver ID",
        },
        body: {
          type: "string",
          example: "new message",
        },
        createdAt: {
          type: "string",
          format: "date",
          example: "2020-05-12T09:38:23.104Z",
        },
        updatedAt: {
          type: "string",
          format: "date",
          example: "2020-05-12T09:38:23.104Z",
        },
      },
    },
    MessageReceived: {
      type: "object",
      properties: {
        _id: {
          type: "string",
          format: "binary",
          example: "5ea55b3e79152d0017d846e4",
          description: "Message ID",
        },
        owner: {
          type: "string",
          example: "5ea5490c793d2f00176228da",
          format: "binary",
          description: "Message Owner - Sender ID",
        },
        from: {
          type: "string",
          example: "5ea5490c793d2f00176228da",
          format: "binary",
          description: "Message from - Sender ID",
        },
        body: {
          type: "string",
          example: "new message",
        },
        seen: {
          type: "boolean",
          expample: "true",
          default: "false",
        },
        createdAt: {
          type: "string",
          format: "date",
          example: "2020-05-12T09:38:23.104Z",
        },
        updatedAt: {
          type: "string",
          format: "date",
          example: "2020-05-12T09:38:23.104Z",
        },
      },
    },
    MessageSent: {
      type: "object",
      properties: {
        _id: {
          type: "string",
          format: "binary",
          example: "5ea55b3e79152d0017d846e4",
          description: "Message ID",
        },
        owner: {
          type: "string",
          example: "5ea5490c793d2f00176228da",
          format: "binary",
          description: "Message Owner - Sender ID",
        },
        to: {
          type: "string",
          example: "5ea5490c793d2f00176228da",
          format: "binary",
          description: "Send message to - Receiver ID",
        },
        body: {
          type: "string",
          example: "new message",
        },
        createdAt: {
          type: "string",
          format: "date",
          example: "2020-05-12T09:38:23.104Z",
        },
        updatedAt: {
          type: "string",
          format: "date",
          example: "2020-05-12T09:38:23.104Z",
        },
      },
    },
    MessageCreate: {
      type: "object",
      properties: {
        senderID: {
          type: "string",
          format: "binary",
          example: "5ea5490c793d2f00176228da",
          required: true,
        },
        receiverID: {
          type: "string",
          format: "binary",
          example: "5ebf8d50271a170017b60731",
          required: true,
        },
        body: {
          type: "string",
          example: "new message",
          required: true,
        },
      },
    },
    TotalData: {
      type: "object",
      properties: {
        data: {
          type: "Number",
          example: 10,
        },
      },
    },

    Success_200: {
      type: "object",
      properties: {
        data: {
          type: "string",
          example: "Success",
        },
      },
    },
    Created_201: {
      type: "object",
      properties: {
        data: {
          type: "string",
          example: "Created",
        },
      },
    },
    error_400: {
      type: "object",
      properties: {
        error: {
          type: "string",
          example: "Bad Request",
        },
      },
    },
    error_403: {
      type: "object",
      properties: {
        error: {
          type: "string",
          example: "Not Allowed",
        },
      },
    },
    error_404: {
      type: "object",
      properties: {
        error: {
          type: "string",
          example: "Not Found!",
        },
      },
    },
    error_409: {
      type: "object",
      properties: {
        error: {
          type: "string",
          example: "Already exist",
        },
      },
    },
    error_500: {
      type: "string",
      example: "Internal server error",
    },
  },
};

module.exports = schemas;

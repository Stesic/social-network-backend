const authPaths = {
  "/auth/register": {
    post: {
      tags: ["Auth"],
      summary: "Register",
      description: "Register a new user",
      requestBody: {
        required: true,
        description: "User Registration",
        content: {
          "application/json": {
            schema: {
              $ref: "#/components/schemas/Register",
            },
          },
        },
      },
      responses: {
        "200": {
          description: "Registration Token",
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
  "/auth/login": {
    post: {
      tags: ["Auth"],
      summary: "Login",
      description: "Login User",
      requestBody: {
        required: true,
        description: "User Login",
        content: {
          "application/json": {
            schema: {
              $ref: "#/components/schemas/Login",
            },
          },
        },
      },
      responses: {
        "200": {
          description: "JWT Token",
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
        "404": {
          description: "404 Error",
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
  "/auth/password/reset": {
    patch: {
      tags: ["Auth"],
      summary: "Reset Password",
      description: "Reset user password",
      requestBody: {
        required: true,
        description: "Email is required for password reset",
        content: {
          "application/json": {
            schema: {
              $ref: "#/components/schemas/ResetPassword",
            },
          },
        },
      },
      responses: {
        "200": {
          description: "Password reset successfully",
          content: {
            "application/json": {
              schema: {
                $ref: "#/components/schemas/Success_200",
              },
            },
          },
        },
        "404": {
          description: "404 Error",
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
  "/auth/password/change": {
    patch: {
      tags: ["Auth"],
      summary: "Change Password",
      description: "Change user password",
      requestBody: {
        required: true,
        description: "Body for change password",
        content: {
          "application/json": {
            schema: {
              $ref: "#/components/schemas/ChangePassword",
            },
          },
        },
      },
      responses: {
        "200": {
          description: "Password changed successfully",
          content: {
            "application/json": {
              schema: {
                $ref: "#/components/schemas/Success_200",
              },
            },
          },
        },
        "404": {
          description: "404 Error",
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
};
module.export = authPaths;

const path = require('path');
const swaggerJSDoc = require('swagger-jsdoc');

// Swagger definition
const swaggerDefinition = {
  openapi: "3.0.0",
  info: {
    title: "Comments API",
    version: "1.0.0",
    description: "API for managing comments on messages",
  },
  paths: {
    "/api/comments": {
      post: {
        summary: "Create a new comment",
        requestBody: {
          required: true,
          content: {
            "application/json": {
              schema: {
                type: "object",
                properties: {
                  content: { type: "string" },
                  userId: { type: "string" },
                  messageId: { type: "string" },
                },
                required: ["content", "userId", "messageId"],
              },
            },
          },
        },
        responses: {
          201: { description: "Comment created successfully" },
          500: { description: "Error creating comment" },
        },
      },
      get: {
        summary: "Get all comments for a message",
        parameters: [
          {
            name: "messageId",
            in: "query",
            required: true,
            schema: { type: "string" },
          },
        ],
        responses: {
          200: { description: "List of comments" },
          500: { description: "Error fetching comments" },
        },
      },
    },
    "/api/comments/{id}": {
      put: {
        summary: "Update a comment",
        parameters: [
          {
            name: "id",
            in: "path",
            required: true,
            schema: { type: "integer" },
          },
        ],
        requestBody: {
          required: true,
          content: {
            "application/json": {
              schema: {
                type: "object",
                properties: {
                  content: { type: "string" },
                  userId: { type: "string" },
                },
                required: ["content", "userId"],
              },
            },
          },
        },
        responses: {
          200: { description: "Comment updated successfully" },
          403: { description: "Unauthorized" },
          500: { description: "Error updating comment" },
        },
      },
      delete: {
        summary: "Delete a comment",
        parameters: [
          {
            name: "id",
            in: "path",
            required: true,
            schema: { type: "integer" },
          },
        ],
        requestBody: {
          required: true,
          content: {
            "application/json": {
              schema: {
                type: "object",
                properties: {
                  userId: { type: "string" },
                },
                required: ["userId"],
              },
            },
          },
        },
        responses: {
          204: { description: "Comment deleted successfully" },
          403: { description: "Unauthorized" },
          500: { description: "Error deleting comment" },
        },
      },
    },
  },
};

// Setup swagger-jsdoc options
const options = {
  swaggerDefinition,
  apis: [path.join(__dirname, '../controllers/*.js')], // Path to your API route files
};

// Generate swagger specification
const swaggerSpec = swaggerJSDoc(options);

// Export the swagger specification
module.exports = swaggerSpec;
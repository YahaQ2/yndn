const swaggerJSDoc = require('swagger-jsdoc');

const swaggerDefinition = {
  openapi: '3.0.0',
  info: {
    title: 'Menfess Comments API',
    version: '1.0.0',
    description: 'API documentation for Menfess Comments system',
  },
  servers: [
    {
      url: 'https://yunand.vercel.app',
      description: 'Development server',
    },
  ],
  paths: {
    '/comments': {
      get: {
        summary: 'Get all comments for a menfess',
        parameters: [
          {
            in: 'query',
            name: 'menfessId',
            required: true,
            schema: {
              type: 'string',
            },
          },
        ],
        responses: {
          '200': {
            description: 'List of comments',
            content: {
              'application/json': {
                schema: {
                  type: 'array',
                  items: { $ref: '#/components/schemas/Comment' },
                },
              },
            },
          },
        },
      },
      post: {
        summary: 'Create a new comment',
        requestBody: {
          required: true,
          content: {
            'application/json': {
              schema: { $ref: '#/components/schemas/CommentInput' },
            },
          },
        },
        responses: {
          '201': { description: 'Comment created successfully' },
        },
      },
    },
  },
  components: {
    schemas: {
      Comment: {
        type: 'object',
        properties: {
          id: { type: 'integer' },
          content: { type: 'string' },
          messageId: { type: 'string' },
          userId: { type: 'string' },
          createdAt: { type: 'string', format: 'date-time' },
        },
      },
      CommentInput: {
        type: 'object',
        required: ['content', 'messageId', 'userName'],
        properties: {
          content: { type: 'string' },
          messageId: { type: 'string' },
          userName: { type: 'string' },
        },
      },
    },
  },
};
const options = {
  swaggerDefinition,
  apis: ['./src/routes/*.js']
};

const swaggerSpec = swaggerJSDoc(options);

module.exports = swaggerSpec;

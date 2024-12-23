export const swaggerDocument = {
  openapi: '3.0.0',
  info: {
    title: 'Menfess Comments API',
    version: '1.0.0',
    description: 'API documentation for Menfess Comments system'
  },
  servers: [
    {
      url: 'http://yunand.vercel.app',
      description: 'Development server'
    }
  ],
  paths: {
    '/api/comments': {
      get: {
        summary: 'Get all comments for a menfess',
        parameters: [
          {
            in: 'query',
            name: 'menfessId',
            required: true,
            schema: {
              type: 'string'
            }
          }
        ],
        responses: {
          '200': {
            description: 'List of comments',
            content: {
              'application/json': {
                schema: {
                  type: 'array',
                  items: {
                    $ref: '#/components/schemas/Comment'
                  }
                }
              }
            }
          }
        }
      },
      post: {
        summary: 'Create a new comment',
        requestBody: {
          required: true,
          content: {
            'application/json': {
              schema: {
                $ref: '#/components/schemas/CommentInput'
              }
            }
          }
        },
        responses: {
          '201': {
            description: 'Comment created successfully'
          }
        }
      }
    }
  },
  components: {
    schemas: {
      Comment: {
        type: 'object',
        properties: {
          id: {
            type: 'string'
          },
          content: {
            type: 'string'
          },
          menfessId: {
            type: 'string'
          },
          userName: {
            type: 'string'
          },
          createdAt: {
            type: 'string',
            format: 'date-time'
          }
        }
      },
      CommentInput: {
        type: 'object',
        required: ['content', 'menfessId', 'userName'],
        properties: {
          content: {
            type: 'string'
          },
          menfessId: {
            type: 'string'
          },
          userName: {
            type: 'string'
          }
        }
      }
    }
  }
}
};

const options = {
  swaggerDefinition,
  apis: [path.join(__dirname, '../controllers/*.js')],
};

const swaggerSpec = swaggerJSDoc(options);

module.exports = swaggerSpec
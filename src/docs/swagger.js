const path = require('path');
const swaggerJSDoc = require('swagger-jsdoc');

const swaggerDefinition = {
  openapi: '3.0.0',
  info: {
    title: 'API Documentation',
    version: '1.0.0',
    description: 'Dokumentasi API dengan Swagger',
  },
  servers: [
    {
      url: process.env.NODE_ENV === 'production' 
        ? 'https://yunand.vercel.app' 
        : 'http://localhost:3000',
    },
  ],
  components: {
    securitySchemes: {
      BearerAuth: {
        type: 'http',
        scheme: 'bearer',
        bearerFormat: 'JWT',
      },
    },
    responses: {
      NotFound: {
        description: 'Resource tidak ditemukan',
        content: {
          'application/json': {
            schema: {
              type: 'object',
              properties: {
                message: {
                  type: 'string',
                  example: 'Resource not found',
                },
              },
            },
          },
        },
      },
      ServerError: {
        description: 'Terjadi kesalahan pada server',
        content: {
          'application/json': {
            schema: {
              type: 'object',
              properties: {
                message: {
                  type: 'string',
                  example: 'Internal server error',
                },
              },
            },
          },
        },
      },
    },
    schemas: {
      comments: {
        type: 'object',
        properties: {
          id: {
            type: 'integer',
            description: 'ID menfess yang unik',
            example: 1,
          },
          content: {
            type: 'string',
            description: 'Pengirim menfess',
            example: 'user123',
          },
          messageId: {
            type: 'string',
            description: 'Pesan dari menfess',
            example: 'Halo, ini pesan menfess!'
    
          },
          createdAt: {
            type: 'string',
            format: 'date-time',
            description: 'Tanggal dan waktu saat menfess dibuat',
            example: '2024-12-17T10:00:00Z',
          },
          updatedAt: {
            type: 'string',
            format: 'date-time',
            description: 'Tanggal dan waktu saat menfess terakhir diperbarui',
            example: '2024-12-17T12:00:00Z',
          },
        },
      },
    },
  },
  security: [
    {
      BearerAuth: [],
    },
  ],
  tags: [
    {
      name: 'comments',
      description: 'Endpoint terkait dengan comments',
    },
  ],
};

const options = {
  swaggerDefinition,
  apis: [path.join(__dirname, '../controllers/*.js')], // Pastikan lokasi file controller sesuai
};

const swaggerSpec = swaggerJSDoc(options);

module.exports = swaggerSpec;
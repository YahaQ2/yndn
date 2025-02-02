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
                message: { type: 'string', example: 'Resource not found' },
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
                message: { type: 'string', example: 'Internal server error' },
              },
            },
          },
        },
      },
    },
    schemas: {
      Comment: { // 🔴 Diubah ke PascalCase (best practice)
        type: 'object',
        properties: {
          id: {
            type: 'integer',
            description: 'ID komentar yang unik',
            example: 1,
          },
          content: {
            type: 'string',
            description: 'Isi komentar',
            example: "Ini adalah komentar untuk menfess!"
          },
          messageId: {
            type: 'integer', // 🔴 Diubah ke integer
            description: 'ID pesan yang dikomentari',
            example: 123,
          },
          createdAt: {
            type: 'string',
            format: 'date-time',
            description: 'Waktu pembuatan komentar',
            example: '2024-01-01T12:00:00Z', // 🔴 Format ISO 8601
          },
          updatedAt: {
            type: 'string',
            format: 'date-time',
            description: 'Waktu terakhir komentar diperbarui',
            example: '2024-01-01T12:30:00Z',
          },
        },
      },
    },
  },
  security: [
    { BearerAuth: [] },
  ],
  tags: [
    {
      name: 'comments',
      description: 'Operasi terkait komentar',
    },
  ],
};

const options = {
  swaggerDefinition,
  apis: [path.join(__dirname, '../controllers/*.js')], // Pastikan controller ada
};

const swaggerSpec = swaggerJSDoc(options);

module.exports = swaggerSpec;
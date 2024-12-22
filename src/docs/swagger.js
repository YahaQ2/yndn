const swaggerDocument = {
  openapi: '3.0.0',
  info: {
    title: 'Messages and Comments API',
    version: '1.0.0',
    description: 'API untuk mengelola pesan dan komentar menggunakan Supabase',
  },
  servers: [
    {
      url: 'https://yunand.vercel.app',
      description: 'API Production',
    },
  ],
  paths: {
    '/messages': {
      get: {
        summary: 'Ambil semua pesan',
        responses: {
          '200': {
            description: 'Daftar semua pesan',
            content: {
              'application/json': {
                schema: {
                  type: 'array',
                  items: { $ref: '#/components/schemas/Message' },
                },
              },
            },
          },
        },
      },
      post: {
        summary: 'Tambah pesan baru',
        requestBody: {
          required: true,
          content: {
            'application/json': {
              schema: { $ref: '#/components/schemas/NewMessage' },
            },
          },
        },
        responses: {
          '201': {
            description: 'Pesan berhasil dibuat',
            content: {
              'application/json': {
                schema: { $ref: '#/components/schemas/Message' },
              },
            },
          },
        },
      },
    },
    '/messages/{id}': {
      get: {
        summary: 'Ambil pesan berdasarkan ID',
        parameters: [
          {
            name: 'id',
            in: 'path',
            required: true,
            schema: { type: 'integer' },
            description: 'ID pesan',
          },
        ],
        responses: {
          '200': {
            description: 'Detail pesan',
            content: {
              'application/json': {
                schema: { $ref: '#/components/schemas/Message' },
              },
            },
          },
          '404': {
            description: 'Pesan tidak ditemukan',
          },
        },
      },
      delete: {
        summary: 'Hapus pesan berdasarkan ID',
        parameters: [
          {
            name: 'id',
            in: 'path',
            required: true,
            schema: { type: 'integer' },
            description: 'ID pesan',
          },
        ],
        responses: {
          '204': {
            description: 'Pesan berhasil dihapus',
          },
          '404': {
            description: 'Pesan tidak ditemukan',
          },
        },
      },
    },
    '/comments': {
      get: {
        summary: 'Ambil komentar berdasarkan ID pesan',
        parameters: [
          {
            name: 'messageId',
            in: 'query',
            required: true,
            schema: { type: 'integer' },
            description: 'ID pesan',
          },
        ],
        responses: {
          '200': {
            description: 'Daftar komentar untuk pesan',
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
        summary: 'Tambah komentar baru',
        requestBody: {
          required: true,
          content: {
            'application/json': {
              schema: { $ref: '#/components/schemas/NewComment' },
            },
          },
        },
        responses: {
          '201': {
            description: 'Komentar berhasil dibuat',
            content: {
              'application/json': {
                schema: { $ref: '#/components/schemas/Comment' },
              },
            },
          },
        },
      },
    },
  },
  components: {
    schemas: {
      Message: {
        type: 'object',
        properties: {
          id: { type: 'integer', example: 1 },
          sender: { type: 'string', example: 'John Doe' },
          recipient: { type: 'string', example: 'Jane Doe' },
          message: { type: 'string', example: 'Hello, this is a message.' },
          track: {
            type: 'string',
            example: 'https://open.spotify.com/embed/track/123456789',
          },
          createdAt: {
            type: 'string',
            format: 'date-time',
            example: '2024-12-20T14:48:00.000Z',
          },
        },
      },
      NewMessage: {
        type: 'object',
        required: ['sender', 'recipient', 'message'],
        properties: {
          sender: { type: 'string', example: 'John Doe' },
          recipient: { type: 'string', example: 'Jane Doe' },
          message: { type: 'string', example: 'Hello, this is a message.' },
          track: {
            type: 'string',
            example: 'https://open.spotify.com/embed/track/123456789',
          },
        },
      },
      Comment: {
        type: 'object',
        properties: {
          id: { type: 'integer', example: 1 },
          content: { type: 'string', example: 'This is a comment.' },
          messageId: { type: 'integer', example: 1 },
          createdAt: {
            type: 'string',
            format: 'date-time',
            example: '2024-12-20T14:50:00.000Z',
          },
        },
      },
      NewComment: {
        type: 'object',
        required: ['content', 'messageId'],
        properties: {
          content: { type: 'string', example: 'This is a comment.' },
          messageId: { type: 'integer', example: 1 },
        },
      },
    },
  },
};

module.exports = swaggerDocument;
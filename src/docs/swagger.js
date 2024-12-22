const path = require('path');
const swaggerJSDoc = require('swagger-jsdoc');
const swaggerDocument = {
  "openapi": "3.0.0",
  "info": {
    "title": "Messages and Comments API",
    "version": "1.0.0",
    "description": "API untuk mengelola pesan dan komentar menggunakan Supabase"
  },
  "servers": [
    {
      "url": "https://yunand.vercel.app",
      "description": "API Production"
    }
  ],
  "paths": {
    "/messages": {
      "get": {
        "summary": "Ambil semua pesan",
        "responses": {
          "200": {
            "description": "Daftar semua pesan",
            "content": {
              "application/json": {
                "schema": {
                  "type": "array",
                  "items": {
                    "$ref": "#/components/schemas/Message"
                  }
                }
              }
            }
          }
        }
      },
      "post": {
        "summary": "Tambah pesan baru",
        "requestBody": {
          "required": true,
          "content": {
            "application/json": {
              "schema": {
                "$ref": "#/components/schemas/NewMessage"
              }
            }
          }
        },
        "responses": {
          "201": {
            "description": "Pesan berhasil dibuat",
            "content": {
              "application/json": {
                "schema": {
                  "$ref": "#/components/schemas/Message"
                }
              }
            }
          }
        }
      }
    }
  },
  "components": {
    "schemas": {
      "Message": {
        "type": "object",
        "properties": {
          "id": { "type": "integer", "example": 1 },
          "sender": { "type": "string", "example": "John Doe" },
          "recipient": { "type": "string", "example": "Jane Doe" },
          "message": { "type": "string", "example": "Hello, this is a message." },
          "track": { "type": "string", "example": "https://open.spotify.com/embed/track/123456789" },
          "createdAt": { "type": "string", "format": "date-time", "example": "2024-12-20T14:48:00.000Z" }
        }
      },
      "NewMessage": {
        "type": "object",
        "required": ["sender", "recipient", "message"],
        "properties": {
          "sender": { "type": "string", "example": "John Doe" },
          "recipient": { "type": "string", "example": "Jane Doe" },
          "message": { "type": "string", "example": "Hello, this is a message." },
          "track": { "type": "string", "example": "https://open.spotify.com/embed/track/123456789" }
        }
      }
    }
  }
}
};

module.exports = swaggerDocument;
const options = {
  swaggerDefinition,
  apis: [path.join(__dirname, '../controllers/*.js')],
};

const swaggerSpec = swaggerJSDoc(options);

module.exports = swaggerSpec


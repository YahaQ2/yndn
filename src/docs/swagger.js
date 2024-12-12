const path = require('path');
const swaggerJSDoc = require('swagger-jsdoc');

const swaggerDefinition = {
  "openapi": "3.0.0",
  "info": {
    "title": "API Documentation",
    "description": "Dokumentasi API dengan Swagger",
    "version": "1.0.0"
  },
  "servers": [
    {
      "url": "https://unand.vercel.app"
    }
  ],
  "paths": {
    "/v1/api/menfess": {
      "get": {
        "tags": [
          "Menfess"
        ],
        "summary": "Retrieve menfess messages",
        "parameters": [
          {
            "name": "sender",
            "in": "query",
            "description": "Filter by sender name",
            "required": false,
            "style": "form",
            "explode": true,
            "schema": {
              "type": "string"
            }
          },
          {
            "name": "recipient",
            "in": "query",
            "description": "Filter by recipient name",
            "required": false,
            "style": "form",
            "explode": true,
            "schema": {
              "type": "string"
            }
          },
          {
            "name": "date",
            "in": "query",
            "description": "Filter by date (format: YYYY-MM-DD)\n",
            "required": false,
            "style": "form",
            "explode": true,
            "schema": {
              "type": "string",
              "format": "date"
            }
          }
        ],
        "responses": {
          "200": {
            "description": "Successful retrieval of menfess messages",
            "content": {
              "application/json": {
                "schema": {
                  "type": "array",
                  "items": {
                    "$ref": "#/components/schemas/Menfess"
                  }
                }
              }
            }
          },
          "404": {
            "description": "No menfess messages found"
          },
          "500": {
            "description": "Internal server error"
          }
        }
      },
      "post": {
        "tags": [
          "Menfess"
        ],
        "summary": "Membuat menfess baru",
        "requestBody": {
          "content": {
            "application/json": {
              "schema": {
                "$ref": "#/components/schemas/Menfess"
              }
            }
          },
          "required": true
        },
        "responses": {
          "201": {
            "description": "Menfess berhasil dibuat",
            "content": {
              "application/json": {
                "schema": {
                  "$ref": "#/components/schemas/Menfess"
                }
              }
            }
          },
          "400": {
            "description": "Data input tidak lengkap"
          },
          "500": {
            "description": "Terjadi kesalahan pada server"
          }
        }
      }
    },
    "/v1/api/menfess/{id}": {
      "get": {
        "tags": [
          "Menfess"
        ],
        "summary": "Menemukan menfess berdasarkan ID",
        "parameters": [
          {
            "name": "id",
            "in": "path",
            "description": "ID menfess yang akan diperbarui",
            "required": true,
            "style": "simple",
            "explode": false,
            "schema": {
              "type": "integer"
            }
          }
        ],
        "responses": {
          "200": {
            "description": "Menfess berhasil diperbarui",
            "content": {
              "application/json": {
                "schema": {
                  "$ref": "#/components/schemas/Menfess"
                }
              }
            }
          },
          "404": {
            "description": "Menfess tidak ditemukan"
          },
          "500": {
            "description": "Terjadi kesalahan pada server"
          }
        }
      },
      "put": {
        "tags": [
          "Menfess"
        ],
        "summary": "Memperbarui menfess berdasarkan ID",
        "parameters": [
          {
            "name": "id",
            "in": "path",
            "description": "ID menfess yang akan diperbarui",
            "required": true,
            "style": "simple",
            "explode": false,
            "schema": {
              "type": "integer"
            }
          }
        ],
        "requestBody": {
          "content": {
            "application/json": {
              "schema": {
                "$ref": "#/components/schemas/Menfess"
              }
            }
          },
          "required": true
        },
        "responses": {
          "200": {
            "description": "Menfess berhasil diperbarui",
            "content": {
              "application/json": {
                "schema": {
                  "$ref": "#/components/schemas/Menfess"
                }
              }
            }
          },
          "404": {
            "description": "Menfess tidak ditemukan"
          },
          "500": {
            "description": "Terjadi kesalahan pada server"
          }
        }
      },
      "delete": {
        "tags": [
          "Menfess"
        ],
        "summary": "Menghapus menfess berdasarkan ID",
        "parameters": [
          {
            "name": "id",
            "in": "path",
            "description": "ID menfess yang akan dihapus",
            "required": true,
            "style": "simple",
            "explode": false,
            "schema": {
              "type": "integer"
            }
          }
        ],
        "responses": {
          "200": {
            "description": "Menfess berhasil dihapus"
          },
          "404": {
            "description": "Menfess tidak ditemukan"
          },
          "500": {
            "description": "Terjadi kesalahan pada server"
          }
        }
      }
    }
  },
  "components": {
    "schemas": {
      "Menfess": {
        "type": "object",
        "properties": {
          "id": {
            "type": "integer",
            "description": "ID menfess yang unik"
          },
          "sender": {
            "type": "string",
            "description": "Pengirim menfess"
          },
          "message": {
            "type": "string",
            "description": "Pesan dari menfess"
          },
          "song": {
            "type": "string",
            "description": "Lagu terkait dengan menfess (opsional)"
          },
          "recipient": {
            "type": "string",
            "description": "Penerima menfess"
          },
          "createdAt": {
            "type": "string",
            "description": "Tanggal dan waktu saat menfess dibuat",
            "format": "date-time"
          },
          "updatedAt": {
            "type": "string",
            "description": "Tanggal dan waktu saat menfess terakhir diperbarui",
            "format": "date-time"
          }
        }
      }
    }
  }
}





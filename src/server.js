const express = require('express');
const { createClient } = require('@supabase/supabase-js');
const swaggerJsdoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');
const cors = require('cors');
require('dotenv').config();

const app = express();
const port = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());

// Supabase client setup
const supabaseUrl = process.env.SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_ANON_KEY;
const supabase = createClient(supabaseUrl, supabaseKey);

// Swagger configuration
const swaggerOptions = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Message and Comment API',
      version: '1.0.0',
      description: 'API for managing messages and comments',
    },
    servers: [
      {
        url: `http://localhost:${port}`,
        description: 'Development server',
      },
    ],
  },
  apis: ['./server.js'], // Path to the API docs
};

const swaggerDocs = swaggerJsdoc(swaggerOptions);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs));

/**
 * @swagger
 * /api/messages/{id}:
 *   get:
 *     summary: Get a message by ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Successful response
 *       500:
 *         description: Server error
 */
app.get('/api/messages/:id', async (req, res) => {
  const { id } = req.params;

  try {
    const { data, error } = await supabase
      .from('messages')
      .select('*')
      .eq('id', id)
      .single();

    if (error) throw error;

    res.json(data);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

/**
 * @swagger
 * /api/comments:
 *   get:
 *     summary: Get comments for a message
 *     parameters:
 *       - in: query
 *         name: messageId
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Successful response
 *       500:
 *         description: Server error
 */
app.get('/api/comments', async (req, res) => {
  const { messageId } = req.query;

  try {
    const { data, error } = await supabase
      .from('comments')
      .select('*')
      .eq('messageId', messageId)
      .order('created_at', { ascending: true });

    if (error) throw error;

    res.json(data);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

/**
 * @swagger
 * /api/comments:
 *   post:
 *     summary: Add a new comment
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               messageId:
 *                 type: string
 *               content:
 *                 type: string
 *     responses:
 *       201:
 *         description: Comment created successfully
 *       500:
 *         description: Server error
 */
app.post('/api/comments', async (req, res) => {
  const { messageId, content } = req.body;

  try {
    const { data, error } = await supabase
      .from('comments')
      .insert({ messageId, content })
      .single();

    if (error) throw error;

    res.status(201).json(data);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
  console.log(`Swagger documentation available at http://localhost:${port}/api-docs`);
});
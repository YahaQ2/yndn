const express = require('express');
const swaggerJsDoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');
const bodyParser = require('body-parser');
const dotenv = require('dotenv');
const routes = require('./routes/route'); // Pastikan file route.js Anda benar
const { checkConnection } = require('./database'); // Pastikan file database.js benar

// Load environment variables
dotenv.config();

const app = express();
const port = process.env.PORT || 3000;

// Middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Default route
app.get('/', (req, res) => {
  res.send('Hello from Server Menfess');
});

// Swagger configuration
const swaggerOptions = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Menfess API',
      version: '1.0.0',
      description: 'API documentation for Menfess server',
    },
    servers: [
      {
        url: `http://localhost:${port}`,
        description: 'Local development server',
      },
    ],
  },
  apis: ['./routes/route.js'], // Path to the API docs
};

// Swagger setup
const swaggerDocs = swaggerJsDoc(swaggerOptions);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs));

// Routes
app.use('/api', routes);

// Check Supabase connection
checkConnection();

// Start the server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
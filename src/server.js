const express = require('express');
const dotenv = require('dotenv');
const bodyParser = require('body-parser');
const swaggerUi = require('swagger-ui-express');
const swaggerSpec = require('./doc/swagger'); // Mengimpor file swagger.js
const routes = require('./routes/route'); // Pastikan file route.js Anda benar
const { checkConnection } = require('./database'); // Pastikan file database.js benar

// Load environment variables
dotenv.config();

// Membuat instance dari Express
const app = express();
const port = process.env.PORT || 3000;

// Middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Rute default
app.get('/', (req, res) => {
  res.send('Hello from Server Menfess');
});

// Setup Swagger UI
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// Menambahkan rute API
app.use('/api', routes);

// Memeriksa koneksi database
checkConnection();

// Menjalankan server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
require('dotenv').config();

const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const path = require('path');
const route = require('./routes/route');
const swaggerUi = require('swagger-ui-express');
const swaggerSpec = require('./swagger/swagger');
// Endpoint utama
app.get('/', (req, res) => {
  res.send('Hello from Server Menfess');
});

// Route API
app.use('/v1/api', route);

// Swagger Documentation
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// Static Files
app.use(express.static(path.join(__dirname, '../public')));

// Start Server
const PORT = process.env.PORT || 8000;
app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
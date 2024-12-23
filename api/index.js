import express from 'express';
import cors from 'cors';
import { swaggerDocument } from './swagger.js';
import swaggerUi from 'swagger-ui-express';
import router from './route.js';

const app = express();
app.use(cors());
app.use(express.json());

// Swagger documentation
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

// Routes
app.use('/api', router);

app.get('/', (req, res) => {
  res.send('API is running!');
});

export default app;
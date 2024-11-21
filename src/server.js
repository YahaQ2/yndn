require('dotenv').config();

const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const route = require('./routes/route');
const app = express();

app.use(cors());
app.use(bodyParser.json());


app.get('/', (req, res) => {
  res.send('Hello from Server Menfess');
});

// Route untuk API
app.use('/api', route);

const PORT = process.env.PORT || 3001;

app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));

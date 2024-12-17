require('dotenv').config();

const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const route = require('./routes/route');
const app = express();
const path = require('path');

app.use(cors());
app.use(bodyParser.json());

app.get('/', (req, res) => {
  res.send('Hello from Server Menfess');
});

// Route untuk API
app.use('/v1/api', route);

app.use(express.static(path.join(__dirname, '../public')));

const PORT = process.env.PORT || 8000;
app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));






import express from "express";
import swaggerJSDoc from "swagger-jsdoc";
import swaggerUi from "swagger-ui-express";
import { create, getAll, getById, remove, update } from "./swagger.js";


app.use(express.json());
app.use(express.urlencoded({ extended: true }));

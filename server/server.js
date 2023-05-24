require('dotenv').config({ path: './config/.env' });

const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');

const app = express();
const port = process.env.PORT || 8000;

app.use(cors);
app.use(express.json());

app.listen(port, () => {
  console.log("Server is running, you better catch it!");
});
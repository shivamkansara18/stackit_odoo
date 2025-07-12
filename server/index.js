const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const connectDB = require('./config/db');

dotenv.config();

const app = express();
connectDB(); // <--- Connect MongoDB

app.use(cors());
app.use(express.json()); // Parse incoming JSON

app.get('/', (req, res) => {
  res.send('StackIt API is running...');
});

// TODO: Add routes here

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

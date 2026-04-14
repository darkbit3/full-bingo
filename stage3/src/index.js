const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const amountRoutes = require('./route/amountRoutes');

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3003;

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use('/api', amountRoutes);

// Health check
app.get('/health', (req, res) => {
  res.json({ status: 'OK', stage: 'stage3', amount: 30 });
});

app.listen(PORT, () => {
  console.log(`Stage3 (30-api) server running on port ${PORT}`);
});

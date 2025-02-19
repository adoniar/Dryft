require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(express.json());
app.use(express.static('public'));

// MongoDB Connection
mongoose.connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
.then(() => console.log('Connected to MongoDB'))
.catch((err) => console.error('MongoDB connection error:', err));

// Routes
const tripsRouter = require('./routes/trips');
app.use('/api/trips', tripsRouter);

app.listen(PORT, () => {
    console.log(`Dryft Server Side Running...`);
    console.log(`Server running at http://localhost:${PORT}`);
});
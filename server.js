const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const cors = require('cors');
const bodyParser = require('body-parser');

dotenv.config();

const app = express();
app.use(cors());
app.use(bodyParser.json());

// MongoDB Connection
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("🚀 Connected to MongoDB"))
  .catch(err => console.error("❌ MongoDB Connection Error:", err));

// Models
const User = mongoose.model("User", new mongoose.Schema({
  name: String,
  email: { type: String, unique: true },
  password: String,
  preferences: String,
  createdAt: { type: Date, default: Date.now },
}));

const Booking = mongoose.model("Booking", new mongoose.Schema({
  userId: String,
  tripId: String,
  status: String,
  bookingDate: Date,
  paymentId: String,
  createdAt: { type: Date, default: Date.now },
}));

const Payment = mongoose.model("Payment", new mongoose.Schema({
  userId: String,
  amount: Number,
  paymentMethod: String,
  status: String,
  transactionDate: Date,
  receiptUrl: String,
  createdAt: { type: Date, default: Date.now },
}));

// Routes
app.get('/', (req, res) => {
  res.send('API is running...');
});

app.get('/favicon.ico', (req, res) => res.status(204).end());

app.post('/api/auth/register', async (req, res) => {
  try {
    const { name, email, password, preferences } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = new User({ name, email, password: hashedPassword, preferences });
    await user.save();
    res.status(201).json({ message: "User registered successfully" });
  } catch (error) {
    res.status(500).json({ error: "Error registering user" });
  }
});

app.post('/api/auth/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ error: "User not found" });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ error: "Invalid credentials" });

    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });
    res.json({ token });
  } catch (error) {
    res.status(500).json({ error: "Error logging in" });
  }
});

app.post('/api/trips/book', async (req, res) => {
  try {
    const { userId, tripId } = req.body;
    const booking = new Booking({ userId, tripId, status: "confirmed", bookingDate: new Date() });
    await booking.save();
    res.json({ message: "Trip booked successfully" });
  } catch (error) {
    res.status(500).json({ error: "Error booking trip" });
  }
});

app.post('/api/payments', async (req, res) => {
  try {
    const { userId, amount, paymentMethod } = req.body;
    const payment = new Payment({
      userId, amount, paymentMethod, status: "success", transactionDate: new Date(),
    });
    await payment.save();
    res.json({ message: "Payment processed successfully" });
  } catch (error) {
    res.status(500).json({ error: "Error processing payment" });
  }
});

// Start Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running at http://localhost:${PORT}`));
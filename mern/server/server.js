import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import cookieParser from "cookie-parser";
import { CLIENT_URL, SERVER_URL } from "./constants/index.js";
// import records from "./routes/record.js";
import authRoutes from './routes/auth.js';
import productRoutes from './routes/product.js';
import orderRoutes from './routes/order.js';

const app = express();
app.use(cookieParser());

app.use(express.json());
app.use(cors({
  origin: CLIENT_URL,
  credentials: true
}));

// MongoDB connection
mongoose.connect(process.env.ATLAS_URI)
.then(() => console.log('MongoDB connected'))
.catch((err) => console.log(err));

// Routes
// app.use("/record", records);
app.use('/auth', authRoutes);
app.use('/product', productRoutes);
app.use('/orders', orderRoutes);

const PORT = process.env.PORT || 5050;
app.listen(PORT, () => {
  console.log(`Server listening on ${SERVER_URL}`);
});

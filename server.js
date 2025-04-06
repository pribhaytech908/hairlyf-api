import express from "express";
import dotenv from "dotenv";
import connectDB from "./config/db.js";
import userRoutes from "./routes/userRoutes.js";
import productRoutes from "./routes/productRoutes.js";
import wishlistRoutes from './routes/wishlistRoutes.js'
import orderRoutes from './routes/orderRoutes.js'
import cartRoutes from './routes/cartRoutes.js'
import swaggerDocs from "./swagger.js";
import cors from "cors";
dotenv.config();
connectDB();
const app = express();
app.use(cors());
app.use(express.json());

app.use("/api/users", userRoutes);
app.use("/api/products", productRoutes);
app.use("/api/wishlist", wishlistRoutes);
app.use("/api/orders", orderRoutes);
app.use("/api/cart",cartRoutes)
swaggerDocs(app);
const PORT = process.env.PORT || 5000;
app.use(cors({
    origin: 'http://localhost:5173',
    credentials: true,
  }));
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
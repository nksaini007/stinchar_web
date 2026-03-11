const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const path = require("path");
const connectDB = require("./config/db");

// Load env variables
dotenv.config();

// Connect to MongoDB
connectDB();

const app = express();

// ✅ Middleware
app.use(cors());
app.use(express.json());

// ✅ Serve uploaded images
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

// ✅ Import routes
const userRoutes = require("./routes/userRoutes");
const productRoutes = require("./routes/productRoutes");
const categoryRoutes = require("./routes/categoryRoutes");
const orderRoutes = require("./routes/orderRoutes"); // ✅ added
const paymentRoutes = require("./routes/paymentRoutes"); // ✅ payment system
const postRoutes = require("./routes/postRoutes"); // ✅ community posts
const serviceRoutes = require("./routes/serviceRoutes");
const bookingRoutes = require("./routes/bookingRoutes");
const constructionRoutes = require("./routes/constructionRoutes"); // ✅ construction projects
const constructionPlanRoutes = require("./routes/constructionPlanRoutes"); // ✅ construction catalog plans
const planCategoryRoutes = require("./routes/planCategoryRoutes"); // ✅ plan categories
const messageRoutes = require("./routes/messageRoutes"); // ✅ messages
const reviewRoutes = require("./routes/reviewRoutes"); // ✅ reviews & ratings
const architectWorkRoutes = require("./routes/architectWorkRoutes"); // ✅ architect catalog
const laborRoutes = require("./routes/laborRoutes"); // ✅ labor management
const materialRoutes = require("./routes/materialRoutes"); // ✅ materials management
const supportRoutes = require("./routes/supportRoutes"); // ✅ support tickets

// ✅ Use routes
app.use("/api/users", userRoutes);
app.use("/api/products", productRoutes);
app.use("/api/categories", categoryRoutes);
app.use("/api/orders", orderRoutes); // ✅ order routes
app.use("/api/payments", paymentRoutes); // ✅ payment routes
app.use("/api/posts", postRoutes); // ✅ community posts
app.use("/api/services", serviceRoutes);
app.use("/api/bookings", bookingRoutes);
app.use("/api/construction", constructionRoutes);
app.use("/api/construction-plans", constructionPlanRoutes);
app.use("/api/plan-categories", planCategoryRoutes);
app.use("/api/messages", messageRoutes);
app.use("/api/reviews", reviewRoutes); // ✅ reviews & ratings
app.use("/api/architect-works", architectWorkRoutes); // ✅ architect catalog
app.use("/api/labor", laborRoutes); // ✅ labor management
app.use("/api/materials", materialRoutes); // ✅ materials management
app.use("/api/support", supportRoutes); // ✅ support tickets
app.use("/api/config", require("./routes/configRoutes")); // ✅ website config

// ✅ Test Route
app.get("/", (req, res) => {
  res.send("✅ API is running...");
});

// ✅ Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, "0.0.0.0", () =>
  console.log(`🚀 Server running on port ${PORT}`)
);

// trigger restart

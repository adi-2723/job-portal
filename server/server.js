import "./config/instrument.js";
import express from "express";
import cors from "cors";
import "dotenv/config";
import * as Sentry from "@sentry/node";

import connectDB from "./config/db.js";
import connectCloudinary from "./config/cloudinary.js";

import { clerkWebhooks } from "./controller/webhooks.js";
import companyRoutes from "./routes/companyRoutes.js";
import JobRoutes from "./routes/jobRoutes.js";
import userRoutes from "./routes/userRoutes.js";

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.get("/", (req, res) => res.send("API Working"));

app.post("/webhooks", clerkWebhooks);
app.use("/api/company", companyRoutes);
app.use("/api/jobs", JobRoutes);
app.use("/api/users", userRoutes);

Sentry.setupExpressErrorHandler(app);

// ✅ START SERVER (IMPORTANT)
const startServer = async () => {
  try {
    await connectDB();
    await connectCloudinary();

    const PORT = process.env.PORT || 5000;

    app.listen(PORT, "0.0.0.0", () => {
      console.log(`Server running on port ${PORT}`);
    });
  } catch (error) {
    console.error("Server failed to start:", error);
    process.exit(1); // 🔥 THIS IS IMPORTANT
  }
};

startServer();

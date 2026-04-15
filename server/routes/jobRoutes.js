import express from "express";
import { getJobs, getJobById, createJob } from "../controller/jobController.js";

const router = express.Router();

// ✅ GET all jobs
router.get("/", getJobs);

// ✅ GET job by id
router.get("/:id", getJobById);

// 🔥 POST create job (THIS FIXES 404)
router.post("/create", createJob);

export default router;

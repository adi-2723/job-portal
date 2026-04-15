import Job from "../models/Job.js";

// ✅ Get all jobs
export const getJobs = async (req, res) => {
  try {
    const jobs = await Job.find({ visible: true }).populate({
      path: "companyId",
      select: "-password",
    });

    res.json({ success: true, jobs });
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
};

// ✅ Get job by ID
export const getJobById = async (req, res) => {
  try {
    const { id } = req.params;

    const job = await Job.findById(id).populate({
      path: "companyId",
      select: "-password",
    });

    if (!job) {
      return res.json({
        success: false,
        message: "Job not found",
      });
    }

    res.json({ success: true, job });
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
};

// 🔥 CREATE JOB (IMPORTANT)
export const createJob = async (req, res) => {
  try {
    const { title, description, location, salary, category, companyId } =
      req.body;

    const job = new Job({
      title,
      description,
      location,
      salary,
      category,
      companyId,
      visible: true,
    });

    await job.save();

    res.json({
      success: true,
      message: "Job created",
      job,
    });
  } catch (error) {
    res.json({
      success: false,
      message: error.message,
    });
  }
};

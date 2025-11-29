import express from "express";
import usersRouter from "./users.js";

const router = express.Router();


router.get("/", (req, res) => {
  res.json({
    success: true,
    message: "API v1",
    version: "1.0.0",
    endpoints: {
      users: "/api/v1/users",
      docs: "/api/v1/docs",
    },
  });
});

router.use("/users", usersRouter);

export default router;


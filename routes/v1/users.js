import express from "express";
import { rate_limit } from "../../rate-limit/rate-limit.js";

const router = express.Router();
router.use(rate_limit);

let users = [
  { id: 1, name: "Test" },
];

router.get("/", (req, res) => {
  res.json({
    success: true,
    count: users.length,
    data: users,
  });
});
router.get("/:id", (req, res) => {
  const user = users.find((u) => u.id === parseInt(req.params.id));
  
  if (!user) {
    return res.status(404).json({
      success: false,
      error: "User not found",
    });
  }
  
  res.json({
    success: true,
    data: user,
  });
});


export default router;


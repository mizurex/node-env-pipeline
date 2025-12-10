import express from "express"
import v1Router from "./routes/v1/index.js";

const app = express();

const PORT = process.env.PORT || 3000;


app.get("/", (req, res) => {
  res.json({
    success: true,
    message: "Production Server",
  });
});

app.use("/api/v1", v1Router);

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});


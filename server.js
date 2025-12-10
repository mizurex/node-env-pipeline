import express from "express"


const app = express();

const PORT = process.env.PORT || 3000;


app.get("/", (req, res) => {
  res.json({
    success: true,
    message: "Hello World",
  });
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});


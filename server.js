import express from "express"

// Create Express app
const app = express();
const PORT = 3000;

const dup = process.env.APP_NAME
app.get('/', (req, res) => {
  console.log(`running ${dup}`)
  res.send('hola!!');
});

app.listen(PORT, () => {
  console.log(`${dup} Server running on http://localhost:${PORT}`);
});


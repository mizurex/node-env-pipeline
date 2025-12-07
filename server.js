import express from "express"
import { rate_limit } from "./rate-limit/rate-limit.js";
import v1Router from "./routes/v1/index.js";
import { createClient } from "redis";

const app = express();
const PORT = 3000;

const dup = process.env.APP_NAME;

const redisClient = createClient({
  url: process.env.REDIS_URL || "redis://localhost:6379"
});
redisClient.connect();
console.log("Connected to Redis");

app.set('trust proxy', true);


app.use(express.json());
app.use(rate_limit);


app.get('/', (req, res) => {
  res.json({ 
    message: 'hola',
    app: dup,
    version: '1.0.0',
    timestamp: new Date().toISOString(),
    endpoints: {
      api: '/api/v1',
      docs: '/api/v1/docs',
    }
  });

  console.log(`request served by ${dup}`)
});

//add data to redis
app.post('/api/v1/data',async (req, res) => {
  const {username, email, password} = req.body;

  try{
   await redisClient.lpush("data", JSON.stringify({username, email, password}));
    res.status(200).json({ message: "Data added to Redis queue", data: JSON.stringify({username, email, password}) });
  }
  catch(error){
    console.error("Error adding data to queue", error);
    res.status(500).json({ message: "Error adding data to queue", error: error.message });
  }
  
});




app.use('/api/v1', v1Router);
app.use((req, res) => {
  res.status(404).json({ 
    error: 'Not found',
    app: dup
  });
});

app.listen(PORT, () => {
  console.log(`${dup} running on http://localhost:${PORT}`);
});


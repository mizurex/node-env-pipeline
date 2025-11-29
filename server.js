import express from "express"
import { rate_limit } from "./rate-limit/rate-limit.js";
import v1Router from "./routes/v1/index.js";

const app = express();
const PORT = 3000;

const dup = process.env.APP_NAME;


app.set('trust proxy', true);


app.use(express.json());
app.use(rate_limit);

app.get('/health', (req, res) => {
  res.status(200).json({ 
    status: 'healthy', 
    app: dup,
    timestamp: new Date().toISOString()
  });
});

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


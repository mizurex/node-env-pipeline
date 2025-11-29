import { createClient } from "redis";

const redisClient = createClient({
    url: process.env.REDIS_URL || "redis://localhost:6379"
  });

await redisClient.connect();

console.log("Connected to Redis");

export const rate_limit = async (req, res, next) => {
  const ip = req.ip;
  const key = `fixed_window: ${ip}`;

  try {
    let requests = await redisClient.get(key);

    if (requests === null) {
      await redisClient.set(key, 1, { EX: 40 });
      requests = 1;
    } else {
      requests = await redisClient.incr(key);
    }

    if (requests > 10) {
      return res.json({
        message: "Too many requests",
        status: 429,
      });
    } else {
      next();
    }
  } catch (error) {
    console.error("Error in rate limiting:", error);
    return res.sendStatus(500);
  }
};

import config from "@/lib/config";
import { Redis } from "@upstash/redis";

const redis = new Redis({
  url: config.env.upstash.reddisUrl,
  token: config.env.upstash.reddisToken,
});

export default redis;

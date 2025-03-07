import redis from "@/db/redis";
import { Ratelimit } from "@upstash/ratelimit";

const ratelimit = new Ratelimit({
  redis,
  limiter: Ratelimit.fixedWindow(5, "1 m"),
  analytics: true,
  prefix: "@upstash/ratelimit",
});

export default ratelimit;

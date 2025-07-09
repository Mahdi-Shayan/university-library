const config = {
  env: {
    smtp: {
      host: process.env.SMTP_HOST!,
      port: parseInt(process.env.SMTP_PORT!, 10),
      secure: process.env.SMTP_SECURE === "true",
      user: process.env.SMTP_USER!,
      pass: process.env.SMTP_PASS!,
    },
    apiEndpoint: process.env.NEXT_PUBLIC_API_ENDPOINT!,
    imageKit: {
      publicKey: process.env.NEXT_PUBLIC_IMAGEKIT_PUBLIC_KEY!,
      urlEndpoint: process.env.NEXT_PUBLIC_IMAGEKIT_URL_ENDPOINT!,
      privateKey: process.env.IMAGEKIT_PRIVATE_KEY!,
    },
    databaseUrl: process.env.DATABASE_URL!,
    upstash: {
      reddisUrl: process.env.UPSTASH_REDIS_URL!,
      reddisToken: process.env.UPSTASH_REDIS_TOKEN!,
    },
    resend: {
      apiKey: process.env.RESEND_API_KEY!,
    },
  },
};

export default config;

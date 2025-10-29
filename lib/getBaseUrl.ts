export function getBaseUrl() {
  // 1️⃣ Running on Vercel (Preview or Production)
  if (process.env.VERCEL_URL) {
    return `https://${process.env.VERCEL_URL}`;
  }

  // 3️⃣ Local development fallback
  return "http://localhost:3000";
}

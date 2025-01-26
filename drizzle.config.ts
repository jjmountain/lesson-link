import { defineConfig } from "drizzle-kit";
import { config } from 'dotenv';

if (process.env.NODE_ENV !== 'production') {
  config({ path: '.env.local' });
}
export default defineConfig({
  schema: "./lib/schema.ts",
  out: "./drizzle/migrations",
  dialect: "postgresql",
  dbCredentials: {
    url: process.env.POSTGRES_URL!,
  },

});

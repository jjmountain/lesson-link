ALTER TABLE "users" RENAME COLUMN "name" TO "firstName";--> statement-breakpoint
ALTER TABLE "users" ADD COLUMN "lastName" text;--> statement-breakpoint
ALTER TABLE "users" DROP COLUMN IF EXISTS "gh_username";
ALTER TABLE "users" ADD COLUMN "slug" varchar(39);--> statement-breakpoint
ALTER TABLE "users" ADD CONSTRAINT "users_slug_unique" UNIQUE("slug");
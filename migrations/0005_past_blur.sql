CREATE TABLE "password_reset_codes" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"user_id" uuid NOT NULL,
	"code" text NOT NULL,
	"expires_at" timestamp with time zone NOT NULL
);
--> statement-breakpoint
ALTER TABLE "borrow_records" ALTER COLUMN "due_date" SET DATA TYPE timestamp with time zone;--> statement-breakpoint
ALTER TABLE "borrow_records" ALTER COLUMN "return_date" SET DATA TYPE timestamp with time zone;
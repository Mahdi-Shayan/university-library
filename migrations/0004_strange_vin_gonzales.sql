CREATE TABLE "daily_stats" (
	"id" serial PRIMARY KEY NOT NULL,
	"date" date NOT NULL,
	"borrow_count" integer DEFAULT 0 NOT NULL,
	"new_books_count" integer DEFAULT 0 NOT NULL,
	"user_signups" integer DEFAULT 0 NOT NULL,
	CONSTRAINT "daily_stats_date_unique" UNIQUE("date")
);
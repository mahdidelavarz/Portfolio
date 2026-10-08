-- Resets all visitor data: every row in "visitors" is deleted, and "answers" with it (cascade).
TRUNCATE TABLE "visitors" CASCADE;--> statement-breakpoint
CREATE TABLE "lab_results" (
	"visitor_id" uuid NOT NULL,
	"level_id" varchar(64) NOT NULL,
	"best_config" jsonb NOT NULL,
	"best_score" integer NOT NULL,
	"passed" boolean NOT NULL,
	"runs" integer DEFAULT 1 NOT NULL,
	"hints_used" integer DEFAULT 0 NOT NULL,
	"solution_viewed" boolean DEFAULT false NOT NULL,
	"first_passed_at" timestamp with time zone,
	"updated_at" timestamp with time zone DEFAULT now() NOT NULL,
	CONSTRAINT "lab_results_visitor_id_level_id_pk" PRIMARY KEY("visitor_id","level_id"),
	CONSTRAINT "lab_results_best_score_range" CHECK ("lab_results"."best_score" >= 0 and "lab_results"."best_score" <= 100)
);
--> statement-breakpoint
CREATE TABLE "recovery_attempts" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"username_key" varchar(40) NOT NULL,
	"ip_hash" varchar(64) NOT NULL,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
ALTER TABLE "visitors" ADD COLUMN "recovery_code_hash" varchar(200);--> statement-breakpoint
ALTER TABLE "visitors" ADD COLUMN "name_claimed_at" timestamp with time zone;--> statement-breakpoint
ALTER TABLE "lab_results" ADD CONSTRAINT "lab_results_visitor_id_visitors_id_fk" FOREIGN KEY ("visitor_id") REFERENCES "public"."visitors"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
CREATE INDEX "lab_results_first_passed_at_idx" ON "lab_results" USING btree ("first_passed_at");--> statement-breakpoint
CREATE INDEX "recovery_attempts_username_idx" ON "recovery_attempts" USING btree ("username_key","created_at");--> statement-breakpoint
CREATE INDEX "recovery_attempts_ip_idx" ON "recovery_attempts" USING btree ("ip_hash","created_at");--> statement-breakpoint
CREATE UNIQUE INDEX "visitors_display_name_lower_unique" ON "visitors" USING btree (lower("display_name"));
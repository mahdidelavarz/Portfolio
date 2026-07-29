CREATE TABLE "answers" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"visitor_id" uuid NOT NULL,
	"question_id" varchar(128) NOT NULL,
	"selected_option_id" varchar(16) NOT NULL,
	"is_correct" boolean NOT NULL,
	"response_time_ms" integer,
	"source" varchar(32),
	"answered_at" timestamp with time zone DEFAULT now() NOT NULL,
	CONSTRAINT "answers_response_time_non_negative" CHECK ("answers"."response_time_ms" is null or "answers"."response_time_ms" >= 0)
);
--> statement-breakpoint
CREATE TABLE "visitors" (
	"id" uuid PRIMARY KEY NOT NULL,
	"display_name" varchar(40),
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"last_seen_at" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
ALTER TABLE "answers" ADD CONSTRAINT "answers_visitor_id_visitors_id_fk" FOREIGN KEY ("visitor_id") REFERENCES "public"."visitors"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
CREATE UNIQUE INDEX "answers_visitor_question_unique" ON "answers" USING btree ("visitor_id","question_id");--> statement-breakpoint
CREATE INDEX "answers_visitor_idx" ON "answers" USING btree ("visitor_id");--> statement-breakpoint
CREATE INDEX "answers_question_idx" ON "answers" USING btree ("question_id");--> statement-breakpoint
CREATE INDEX "answers_answered_at_idx" ON "answers" USING btree ("answered_at");
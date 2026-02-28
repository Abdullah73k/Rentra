CREATE TABLE "AiThreads" (
	"id" uuid PRIMARY KEY NOT NULL,
	"userId" text NOT NULL,
	"assistantId" text NOT NULL,
	"threadId" text NOT NULL,
	"createdAt" timestamp with time zone DEFAULT now() NOT NULL,
	CONSTRAINT "AiThreads_userId_unique" UNIQUE("userId")
);
--> statement-breakpoint
ALTER TABLE "AiThreads" ADD CONSTRAINT "AiThreads_userId_user_id_fk" FOREIGN KEY ("userId") REFERENCES "public"."user"("id") ON DELETE cascade ON UPDATE no action;
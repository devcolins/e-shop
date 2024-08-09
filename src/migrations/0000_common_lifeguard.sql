CREATE TABLE IF NOT EXISTS "audit_logs_table" (
	"id" serial PRIMARY KEY NOT NULL,
	"user_id" integer NOT NULL,
	"action" text NOT NULL,
	"table_name" text NOT NULL,
	"record_id" integer NOT NULL,
	"timestamp" timestamp DEFAULT now()
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "categories_table" (
	"id" serial PRIMARY KEY NOT NULL,
	"name" text NOT NULL,
	"description" text,
	CONSTRAINT "categories_table_name_unique" UNIQUE("name")
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "customers_table" (
	"id" serial PRIMARY KEY NOT NULL,
	"user_id" integer NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "discounts_table" (
	"id" serial PRIMARY KEY NOT NULL,
	"code" text,
	"description" text,
	"discount_percentage" integer NOT NULL,
	"valid_from" timestamp NOT NULL,
	"valid_until" timestamp NOT NULL,
	"max_uses" integer DEFAULT 1,
	CONSTRAINT "discounts_table_code_unique" UNIQUE("code")
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "order_items_table" (
	"id" serial PRIMARY KEY NOT NULL,
	"order_id" integer NOT NULL,
	"product_id" integer NOT NULL,
	"quantity" integer NOT NULL,
	"price" integer NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "orders_table" (
	"id" serial PRIMARY KEY NOT NULL,
	"customer_id" integer NOT NULL,
	"order_date" timestamp DEFAULT now()
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "payments_table" (
	"id" serial PRIMARY KEY NOT NULL,
	"order_id" integer NOT NULL,
	"amount" integer NOT NULL,
	"payment_method" text NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "product_categories_table" (
	"id" serial PRIMARY KEY NOT NULL,
	"product_id" integer NOT NULL,
	"category_id" integer NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "product_images_table" (
	"id" serial PRIMARY KEY NOT NULL,
	"product_id" integer NOT NULL,
	"image_url" text NOT NULL,
	"alt_text" text,
	"is_primary" boolean DEFAULT false
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "product_review_attachments_table" (
	"id" serial PRIMARY KEY NOT NULL,
	"review_id" integer NOT NULL,
	"attachment_url" text NOT NULL,
	"attachment_type" text NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "products_table" (
	"id" serial PRIMARY KEY NOT NULL,
	"vendor_id" integer NOT NULL,
	"name" text NOT NULL,
	"description" text,
	"price" integer NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "reviews_table" (
	"id" serial PRIMARY KEY NOT NULL,
	"customer_id" integer NOT NULL,
	"product_id" integer NOT NULL,
	"rating" integer,
	"comment" text,
	"created_at" timestamp DEFAULT now()
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "shipping_table" (
	"id" serial PRIMARY KEY NOT NULL,
	"order_id" integer NOT NULL,
	"address" text NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "stock_table" (
	"id" serial PRIMARY KEY NOT NULL,
	"product_id" integer NOT NULL,
	"quantity" integer NOT NULL,
	"warehouse_location" text
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "users_table" (
	"id" serial PRIMARY KEY NOT NULL,
	"name" text NOT NULL,
	"password" text NOT NULL,
	"email" text NOT NULL,
	"role" text DEFAULT 'customer' NOT NULL,
	CONSTRAINT "users_table_email_unique" UNIQUE("email")
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "vendor_bank_accounts_table" (
	"id" serial PRIMARY KEY NOT NULL,
	"vendor_id" integer NOT NULL,
	"bank_name" text NOT NULL,
	"account_number" text NOT NULL,
	"routing_number" text,
	"account_type" text
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "vendors_table" (
	"id" serial PRIMARY KEY NOT NULL,
	"user_id" integer NOT NULL,
	"business_name" text NOT NULL,
	"store_name" text NOT NULL
);
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "audit_logs_table" ADD CONSTRAINT "audit_logs_table_user_id_users_table_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."users_table"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "customers_table" ADD CONSTRAINT "customers_table_user_id_users_table_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."users_table"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "order_items_table" ADD CONSTRAINT "order_items_table_order_id_orders_table_id_fk" FOREIGN KEY ("order_id") REFERENCES "public"."orders_table"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "order_items_table" ADD CONSTRAINT "order_items_table_product_id_products_table_id_fk" FOREIGN KEY ("product_id") REFERENCES "public"."products_table"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "orders_table" ADD CONSTRAINT "orders_table_customer_id_customers_table_id_fk" FOREIGN KEY ("customer_id") REFERENCES "public"."customers_table"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "payments_table" ADD CONSTRAINT "payments_table_order_id_orders_table_id_fk" FOREIGN KEY ("order_id") REFERENCES "public"."orders_table"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "product_categories_table" ADD CONSTRAINT "product_categories_table_product_id_products_table_id_fk" FOREIGN KEY ("product_id") REFERENCES "public"."products_table"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "product_categories_table" ADD CONSTRAINT "product_categories_table_category_id_categories_table_id_fk" FOREIGN KEY ("category_id") REFERENCES "public"."categories_table"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "product_images_table" ADD CONSTRAINT "product_images_table_product_id_products_table_id_fk" FOREIGN KEY ("product_id") REFERENCES "public"."products_table"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "product_review_attachments_table" ADD CONSTRAINT "product_review_attachments_table_review_id_reviews_table_id_fk" FOREIGN KEY ("review_id") REFERENCES "public"."reviews_table"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "products_table" ADD CONSTRAINT "products_table_vendor_id_vendors_table_id_fk" FOREIGN KEY ("vendor_id") REFERENCES "public"."vendors_table"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "reviews_table" ADD CONSTRAINT "reviews_table_customer_id_customers_table_id_fk" FOREIGN KEY ("customer_id") REFERENCES "public"."customers_table"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "reviews_table" ADD CONSTRAINT "reviews_table_product_id_products_table_id_fk" FOREIGN KEY ("product_id") REFERENCES "public"."products_table"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "shipping_table" ADD CONSTRAINT "shipping_table_order_id_orders_table_id_fk" FOREIGN KEY ("order_id") REFERENCES "public"."orders_table"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "stock_table" ADD CONSTRAINT "stock_table_product_id_products_table_id_fk" FOREIGN KEY ("product_id") REFERENCES "public"."products_table"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "vendor_bank_accounts_table" ADD CONSTRAINT "vendor_bank_accounts_table_vendor_id_vendors_table_id_fk" FOREIGN KEY ("vendor_id") REFERENCES "public"."vendors_table"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "vendors_table" ADD CONSTRAINT "vendors_table_user_id_users_table_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."users_table"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;

import { boolean, integer, pgTable, serial, text, timestamp } from 'drizzle-orm/pg-core';

// Users Table
export const usersTable = pgTable('users_table', {
  id: serial('id').primaryKey(),
  name: text('name').notNull(),
  password: text('password').notNull(),
  email: text('email').notNull().unique(),
  role: text('role').notNull().default('customer'), // Can be 'vendor', 'admin'
});

// Vendors Table
export const vendorsTable = pgTable('vendors_table', {
  id: serial('id').primaryKey(),
  user_id: integer('user_id')
    .references(() => usersTable.id)
    .notNull(),
  business_name: text('business_name').notNull(),
  store_name: text('store_name').notNull(),
  // Add other vendor-specific fields like address, phone, etc.
});

// Vendor Bank Accounts Table
export const vendorBankAccountsTable = pgTable('vendor_bank_accounts_table', {
  id: serial('id').primaryKey(),
  vendor_id: integer('vendor_id')
    .references(() => vendorsTable.id)
    .notNull(),
  bank_name: text('bank_name').notNull(),
  account_number: text('account_number').notNull(),
  routing_number: text('routing_number'),
  account_type: text('account_type'), // e.g., 'checking', 'savings'
});

// Customers Table
export const customersTable = pgTable('customers_table', {
  id: serial('id').primaryKey(),
  user_id: integer('user_id')
    .references(() => usersTable.id)
    .notNull(),
  // Add customer-specific fields like address, phone, etc.
});

// Products Table
export const productsTable = pgTable('products_table', {
  id: serial('id').primaryKey(),
  vendor_id: integer('vendor_id')
    .references(() => vendorsTable.id)
    .notNull(),
  name: text('name').notNull(),
  description: text('description'),
  price: integer('price').notNull(),
  // Add other product-specific fields like category, image, stock, etc.
});

// Categories Table
export const categoriesTable = pgTable('categories_table', {
  id: serial('id').primaryKey(),
  name: text('name').notNull().unique(),
  description: text('description'),
});

// Product Categories Table
export const productCategoriesTable = pgTable('product_categories_table', {
  id: serial('id').primaryKey(),
  product_id: integer('product_id')
    .references(() => productsTable.id)
    .notNull(),
  category_id: integer('category_id')
    .references(() => categoriesTable.id)
    .notNull(),
});

// Product Images Table
export const productImagesTable = pgTable('product_images_table', {
  id: serial('id').primaryKey(),
  product_id: integer('product_id')
    .references(() => productsTable.id)
    .notNull(),
  image_url: text('image_url').notNull(),
  alt_text: text('alt_text'),
  is_primary: boolean('is_primary').default(false), // Indicates if it's the primary image
});

// Stock Table
export const stockTable = pgTable('stock_table', {
  id: serial('id').primaryKey(),
  product_id: integer('product_id')
    .references(() => productsTable.id)
    .notNull(),
  quantity: integer('quantity').notNull(),
  warehouse_location: text('warehouse_location'), // Optional
});

// Discounts Table
export const discountsTable = pgTable('discounts_table', {
  id: serial('id').primaryKey(),
  code: text('code').unique(),
  description: text('description'),
  discount_percentage: integer('discount_percentage').notNull(),
  valid_from: timestamp('valid_from').notNull(),
  valid_until: timestamp('valid_until').notNull(),
  max_uses: integer('max_uses').default(1), // Maximum number of times the discount can be used
});

// Orders Table
export const ordersTable = pgTable('orders_table', {
  id: serial('id').primaryKey(),
  customer_id: integer('customer_id')
    .references(() => customersTable.id)
    .notNull(),
  order_date: timestamp('order_date').defaultNow(),
  // Add other order-specific fields like total_amount, status, etc.
});

// Order Items Table
export const orderItemsTable = pgTable('order_items_table', {
  id: serial('id').primaryKey(),
  order_id: integer('order_id')
    .references(() => ordersTable.id)
    .notNull(),
  product_id: integer('product_id')
    .references(() => productsTable.id)
    .notNull(),
  quantity: integer('quantity').notNull(),
  price: integer('price').notNull(), // Price at the time of order
});

// Shipping Table
export const shippingTable = pgTable('shipping_table', {
  id: serial('id').primaryKey(),
  order_id: integer('order_id')
    .references(() => ordersTable.id)
    .notNull(),
  address: text('address').notNull(),
  // Add other shipping-specific fields like shipping_method, tracking_number, etc.
});

// Payments Table
export const paymentsTable = pgTable('payments_table', {
  id: serial('id').primaryKey(),
  order_id: integer('order_id')
    .references(() => ordersTable.id)
    .notNull(),
  amount: integer('amount').notNull(),
  payment_method: text('payment_method').notNull(),
  // Add other payment-specific fields like transaction_id, status, etc.
});

// Reviews Table
export const reviewsTable = pgTable('reviews_table', {
  id: serial('id').primaryKey(),
  customer_id: integer('customer_id')
    .references(() => customersTable.id)
    .notNull(),
  product_id: integer('product_id')
    .references(() => productsTable.id)
    .notNull(),
  rating: integer('rating'),
  comment: text('comment'),
  created_at: timestamp('created_at').defaultNow(),
});

// Product Review Attachments Table
export const productReviewAttachmentsTable = pgTable('product_review_attachments_table', {
  id: serial('id').primaryKey(),
  review_id: integer('review_id')
    .references(() => reviewsTable.id)
    .notNull(),
  attachment_url: text('attachment_url').notNull(),
  attachment_type: text('attachment_type').notNull(), // e.g., 'image', 'video'
});

// Audit Logs Table
export const auditLogsTable = pgTable('audit_logs_table', {
  id: serial('id').primaryKey(),
  user_id: integer('user_id')
    .references(() => usersTable.id)
    .notNull(),
  action: text('action').notNull(), // e.g., 'CREATE', 'UPDATE', 'DELETE'
  table_name: text('table_name').notNull(),
  record_id: integer('record_id').notNull(), // The ID of the record that was affected
  timestamp: timestamp('timestamp').defaultNow(),
});

// TypeScript Types
export type InsertUser = typeof usersTable.$inferInsert;
export type SelectUser = typeof usersTable.$inferSelect;

export type InsertVendor = typeof vendorsTable.$inferInsert;
export type SelectVendor = typeof vendorsTable.$inferSelect;

export type InsertCustomer = typeof customersTable.$inferInsert;
export type SelectCustomer = typeof customersTable.$inferSelect;

export type InsertProduct = typeof productsTable.$inferInsert;
export type SelectProduct = typeof productsTable.$inferSelect;

export type InsertCategory = typeof categoriesTable.$inferInsert;
export type SelectCategory = typeof categoriesTable.$inferSelect;

export type InsertOrder = typeof ordersTable.$inferInsert;
export type SelectOrder = typeof ordersTable.$inferSelect;

export type InsertOrderItem = typeof orderItemsTable.$inferInsert;
export type SelectOrderItem = typeof orderItemsTable.$inferSelect;

export type InsertPayment = typeof paymentsTable.$inferInsert;
export type SelectPayment = typeof paymentsTable.$inferSelect;

export type InsertReview = typeof reviewsTable.$inferInsert;
export type SelectReview = typeof reviewsTable.$inferSelect;

export type InsertShipping = typeof shippingTable.$inferInsert;
export type SelectShipping = typeof shippingTable.$inferSelect;

export type InsertAuditLog = typeof auditLogsTable.$inferInsert;
export type SelectAuditLog = typeof auditLogsTable.$inferSelect;

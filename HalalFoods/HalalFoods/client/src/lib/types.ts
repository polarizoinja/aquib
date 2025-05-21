// Product types
export interface ProductOption {
  name: string;
  values: string[];
}

export interface ProductWithCategory extends Product {
  category: Category;
}

export interface CartItemWithProduct extends CartItem {
  product: Product;
}

export interface OrderWithItems extends Order {
  items: OrderItemWithProduct[];
}

export interface OrderItemWithProduct extends OrderItem {
  product: Product;
}

// Re-exporting types from schema.ts for frontend use
import type {
  User,
  Product,
  Category,
  CartItem,
  Order,
  OrderItem,
  ContactMessage
} from "@shared/schema";

export type {
  User,
  Product,
  Category,
  CartItem,
  Order,
  OrderItem,
  ContactMessage
};

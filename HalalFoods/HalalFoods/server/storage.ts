import {
  users, type User, type UpsertUser,
  products, type Product, type InsertProduct,
  categories, type Category, type InsertCategory,
  orders, type Order, type InsertOrder,
  orderItems, type OrderItem, type InsertOrderItem,
  cartItems, type CartItem, type InsertCartItem,
  contactMessages, type ContactMessage, type InsertContactMessage
} from "@shared/schema";

// Interface for storage operations
export interface IStorage {
  // User operations
  getUser(id: string): Promise<User | undefined>;
  getUserByEmail(email: string): Promise<User | undefined>;
  upsertUser(user: UpsertUser): Promise<User>;
  updateUser(id: string, userData: Partial<UpsertUser>): Promise<User | undefined>;
  
  // Category operations
  getCategories(): Promise<Category[]>;
  getCategoryBySlug(slug: string): Promise<Category | undefined>;
  getCategoryById(id: number): Promise<Category | undefined>;
  createCategory(category: InsertCategory): Promise<Category>;
  
  // Product operations
  getProducts(): Promise<Product[]>;
  getProductsByCategory(categoryId: number): Promise<Product[]>;
  getProductBySlug(slug: string): Promise<Product | undefined>;
  getProductById(id: number): Promise<Product | undefined>;
  getFeaturedProducts(): Promise<Product[]>;
  createProduct(product: InsertProduct): Promise<Product>;
  searchProducts(query: string): Promise<Product[]>;
  
  // Cart operations
  getCartItems(userId: string): Promise<CartItem[]>;
  addToCart(cartItem: InsertCartItem): Promise<CartItem>;
  updateCartItem(userId: string, productId: number, quantity: number): Promise<CartItem | undefined>;
  removeFromCart(userId: string, productId: number): Promise<boolean>;
  clearCart(userId: string): Promise<boolean>;
  
  // Order operations
  createOrder(order: InsertOrder, items: InsertOrderItem[]): Promise<Order>;
  getOrdersByUser(userId: string): Promise<Order[]>;
  getOrderById(id: number): Promise<Order | undefined>;
  getOrderItems(orderId: number): Promise<OrderItem[]>;
  
  // Contact operations
  createContactMessage(message: InsertContactMessage): Promise<ContactMessage>;
}

export class MemStorage implements IStorage {
  private userMap: Map<string, User>;
  private categoryMap: Map<number, Category>;
  private productMap: Map<number, Product>;
  private cartItemMap: Map<string, CartItem[]>;
  private orderMap: Map<number, Order>;
  private orderItemMap: Map<number, OrderItem[]>;
  private contactMessageMap: Map<number, ContactMessage>;
  
  private categoryId: number;
  private productId: number;
  private cartItemId: number;
  private orderId: number;
  private orderItemId: number;
  private contactMessageId: number;

  constructor() {
    this.userMap = new Map();
    this.categoryMap = new Map();
    this.productMap = new Map();
    this.cartItemMap = new Map();
    this.orderMap = new Map();
    this.orderItemMap = new Map();
    this.contactMessageMap = new Map();
    
    this.categoryId = 1;
    this.productId = 1;
    this.cartItemId = 1;
    this.orderId = 1;
    this.orderItemId = 1;
    this.contactMessageId = 1;
    
    // Initialize with default categories and products
    this.initializeData();
  }

  // Initialize default data
  private async initializeData() {
    // Create categories
    const categories = [
      { name: "Fresh Chicken Cuts", description: "High-quality fresh cuts of halal chicken", slug: "fresh-chicken-cuts" },
      { name: "Processed Chicken Products", description: "Ready-to-use processed chicken items", slug: "processed-chicken-products" },
      { name: "Marinated & Ready-to-Cook", description: "Pre-marinated and ready-to-cook chicken items", slug: "marinated-ready-to-cook" },
      { name: "Bulk Pack Options", description: "Bulk packs for restaurant needs", slug: "bulk-pack-options" },
      { name: "Value-Added Services", description: "Additional services for processing and packaging", slug: "value-added-services" },
      { name: "Eggs & Add-ons", description: "Eggs and other poultry products", slug: "eggs-add-ons" }
    ];

    for (const category of categories) {
      await this.createCategory(category);
    }

    // Create products
    const products = [
      {
        name: "Whole Chicken",
        description: "Fresh whole chicken, carefully processed according to halal standards.",
        slug: "whole-chicken",
        price: 5.99,
        imageUrl: "https://pixabay.com/get/geb4ae53284bfd5c8e540b77e8ec0c18be1c59454c4481ca08ad768b405e850ae7ae09646d11598cf81e5ce01a63cb9fa24b844a8f393137eda13b3c492b0cb6d_1280.jpg",
        categoryId: 1,
        featured: true,
        inStock: true,
        minimumOrderQuantity: 5,
        unit: "kg",
        options: [
          { name: "Type", values: ["With Skin", "Skinless"] }
        ]
      },
      {
        name: "Chicken Breast Boneless",
        description: "Premium quality boneless chicken breast cuts, perfect for a variety of dishes.",
        slug: "chicken-breast-boneless",
        price: 7.99,
        imageUrl: "https://images.unsplash.com/photo-1602470520998-f4a52199a3d6?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&h=400&q=80",
        categoryId: 1,
        featured: false,
        inStock: true,
        minimumOrderQuantity: 2,
        unit: "kg",
        options: [
          { name: "Grade", values: ["Premium"] }
        ]
      },
      {
        name: "Chicken Wings",
        description: "Delicious chicken wings, perfect for restaurants and catering businesses.",
        slug: "chicken-wings",
        price: 6.49,
        imageUrl: "https://pixabay.com/get/gdbaef659900510c6e613638027971d141109583e0ecb0db084b62e9f0af3aa5c8fdeeb54294deaf730a2de148bc371abf2b1d435d798bee547f33add664a094d_1280.jpg",
        categoryId: 1,
        featured: false,
        inStock: true,
        minimumOrderQuantity: 3,
        unit: "kg",
        options: [
          { name: "Type", values: ["Regular", "Jumbo"] }
        ]
      },
      {
        name: "Chicken Drumsticks",
        description: "Juicy and tender chicken drumsticks, cut and processed to perfection.",
        slug: "chicken-drumsticks",
        price: 5.49,
        imageUrl: "https://images.unsplash.com/photo-1587593810167-a84920ea0781?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&h=400&q=80",
        categoryId: 1,
        featured: false,
        inStock: true,
        minimumOrderQuantity: 2,
        unit: "kg",
        options: [
          { name: "Size", values: ["Standard"] }
        ]
      },
      {
        name: "Chicken Thigh Boneless",
        description: "Boneless chicken thighs, perfect for curries, grills, and more.",
        slug: "chicken-thigh-boneless",
        price: 7.29,
        imageUrl: "https://pixabay.com/get/g00bd64e6489782f7ef7d060b0a572518b00dec02fffcf6c9da1dc5f848a9a35dd7a3d574b0278599d0b58118b9bc35cc79f55412de3eab9934d9d2a0bc9f6ffa_1280.jpg",
        categoryId: 1,
        featured: false,
        inStock: true,
        minimumOrderQuantity: 2,
        unit: "kg",
        options: [
          { name: "Quality", values: ["Premium"] }
        ]
      },
      {
        name: "Chicken Mince (Kheema)",
        description: "Finely minced chicken meat, ideal for kababs, koftas, and more.",
        slug: "chicken-mince-kheema",
        price: 6.99,
        imageUrl: "https://images.unsplash.com/photo-1627662168223-7df99068099a?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&h=400&q=80",
        categoryId: 1,
        featured: false,
        inStock: true,
        minimumOrderQuantity: 2,
        unit: "kg",
        options: [
          { name: "Fat %", values: ["Regular", "Lean"] }
        ]
      },
      {
        name: "Chicken Liver",
        description: "Fresh chicken liver, cleaned and processed according to halal standards.",
        slug: "chicken-liver",
        price: 4.99,
        imageUrl: "https://images.unsplash.com/photo-1588168333986-5078d3ae3976?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&h=400&q=80",
        categoryId: 1,
        featured: false,
        inStock: true,
        minimumOrderQuantity: 1,
        unit: "kg",
        options: [
          { name: "Processing", values: ["Clean & Trimmed"] }
        ]
      },
      {
        name: "Chicken Gizzard",
        description: "Fresh chicken gizzards, cleaned and processed to perfection.",
        slug: "chicken-gizzard",
        price: 4.49,
        imageUrl: "https://images.unsplash.com/photo-1516684669134-de6f7c473a2a?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&h=400&q=80",
        categoryId: 1,
        featured: false,
        inStock: true,
        minimumOrderQuantity: 1,
        unit: "kg",
        options: [
          { name: "Cleaning", values: ["Cleaned"] }
        ]
      },
      {
        name: "Spicy Chicken Tikka",
        description: "Pre-marinated tender chicken pieces in our special blend of spices. Ready to cook, perfect for grilling or tandoor.",
        slug: "spicy-chicken-tikka",
        price: 9.99,
        imageUrl: "https://pixabay.com/get/g031bfb398738079b6eae52adc2a1b2c2661d18713964391d0a101acaf96c78150a0e012ee33811a6e60e9009f0caad7e08f8e22bb2d3393f98bca3a675e740d6_1280.jpg",
        categoryId: 3,
        featured: true,
        inStock: true,
        minimumOrderQuantity: 2,
        unit: "kg",
        options: []
      },
      {
        name: "BBQ Chicken Wings",
        description: "Marinated chicken wings in smoky BBQ sauce. Ready to cook, perfect for grilling, frying or baking.",
        slug: "bbq-chicken-wings",
        price: 8.99,
        imageUrl: "https://images.unsplash.com/photo-1527477396000-e27163b481c2?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&h=400&q=80",
        categoryId: 3,
        featured: true,
        inStock: true,
        minimumOrderQuantity: 2,
        unit: "kg",
        options: []
      },
      {
        name: "Chicken Seekh Kabab",
        description: "Ready-to-cook minced chicken skewers with aromatic spices. Perfect for grilling or pan-frying.",
        slug: "chicken-seekh-kabab",
        price: 11.99,
        imageUrl: "https://images.unsplash.com/photo-1555939594-58d7cb561ad1?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&h=400&q=80",
        categoryId: 2,
        featured: true,
        inStock: true,
        minimumOrderQuantity: 2,
        unit: "kg",
        options: []
      },
      {
        name: "5 kg Boneless Breast Pack",
        description: "Bulk pack of 5 kg boneless chicken breast. Perfect for restaurants and catering services.",
        slug: "5kg-boneless-breast-pack",
        price: 37.95,
        imageUrl: "https://images.unsplash.com/photo-1602470520998-f4a52199a3d6?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&h=400&q=80",
        categoryId: 4,
        featured: false,
        inStock: true,
        minimumOrderQuantity: 1,
        unit: "pack",
        options: []
      }
    ];

    for (const product of products) {
      await this.createProduct(product);
    }
  }

  // User operations
  async getUser(id: string): Promise<User | undefined> {
    return this.userMap.get(id);
  }

  async getUserByEmail(email: string): Promise<User | undefined> {
    for (const user of this.userMap.values()) {
      if (user.email === email) {
        return user;
      }
    }
    return undefined;
  }

  async upsertUser(userData: UpsertUser): Promise<User> {
    const { id } = userData;
    const now = new Date();
    const existingUser = this.userMap.get(id);
    
    const user: User = {
      ...userData,
      createdAt: existingUser?.createdAt ?? now,
      updatedAt: now,
    };
    
    this.userMap.set(id, user);
    return user;
  }

  async updateUser(id: string, userData: Partial<UpsertUser>): Promise<User | undefined> {
    const existingUser = this.userMap.get(id);
    if (!existingUser) return undefined;
    
    const updatedUser: User = {
      ...existingUser,
      ...userData,
      id: existingUser.id, // Ensure ID doesn't change
      updatedAt: new Date()
    };
    
    this.userMap.set(id, updatedUser);
    return updatedUser;
  }

  // Category operations
  async getCategories(): Promise<Category[]> {
    return Array.from(this.categoryMap.values());
  }

  async getCategoryBySlug(slug: string): Promise<Category | undefined> {
    for (const category of this.categoryMap.values()) {
      if (category.slug === slug) {
        return category;
      }
    }
    return undefined;
  }

  async getCategoryById(id: number): Promise<Category | undefined> {
    return this.categoryMap.get(id);
  }

  async createCategory(category: InsertCategory): Promise<Category> {
    const id = this.categoryId++;
    const newCategory: Category = { id, ...category };
    this.categoryMap.set(id, newCategory);
    return newCategory;
  }

  // Product operations
  async getProducts(): Promise<Product[]> {
    return Array.from(this.productMap.values());
  }

  async getProductsByCategory(categoryId: number): Promise<Product[]> {
    return Array.from(this.productMap.values()).filter(
      product => product.categoryId === categoryId
    );
  }

  async getProductBySlug(slug: string): Promise<Product | undefined> {
    for (const product of this.productMap.values()) {
      if (product.slug === slug) {
        return product;
      }
    }
    return undefined;
  }

  async getProductById(id: number): Promise<Product | undefined> {
    return this.productMap.get(id);
  }

  async getFeaturedProducts(): Promise<Product[]> {
    return Array.from(this.productMap.values()).filter(
      product => product.featured
    );
  }

  async createProduct(product: InsertProduct): Promise<Product> {
    const id = this.productId++;
    const now = new Date();
    const newProduct: Product = {
      id,
      ...product,
      createdAt: now,
      updatedAt: now
    };
    this.productMap.set(id, newProduct);
    return newProduct;
  }

  async searchProducts(query: string): Promise<Product[]> {
    const lowerQuery = query.toLowerCase();
    return Array.from(this.productMap.values()).filter(
      product => 
        product.name.toLowerCase().includes(lowerQuery) || 
        (product.description && product.description.toLowerCase().includes(lowerQuery))
    );
  }

  // Cart operations
  async getCartItems(userId: string): Promise<CartItem[]> {
    return this.cartItemMap.get(userId) || [];
  }

  async addToCart(cartItem: InsertCartItem): Promise<CartItem> {
    const { userId, productId } = cartItem;
    const id = this.cartItemId++;
    const now = new Date();
    
    // Check if cart exists for user
    if (!this.cartItemMap.has(userId)) {
      this.cartItemMap.set(userId, []);
    }
    
    // Check if item already exists in cart
    const userCart = this.cartItemMap.get(userId)!;
    const existingItemIndex = userCart.findIndex(item => item.productId === productId);
    
    if (existingItemIndex >= 0) {
      // Update existing item
      const existingItem = userCart[existingItemIndex];
      const updatedItem: CartItem = {
        ...existingItem,
        quantity: cartItem.quantity,
        selectedOptions: cartItem.selectedOptions,
        updatedAt: now
      };
      userCart[existingItemIndex] = updatedItem;
      return updatedItem;
    } else {
      // Add new item
      const newItem: CartItem = {
        id,
        ...cartItem,
        createdAt: now,
        updatedAt: now
      };
      userCart.push(newItem);
      return newItem;
    }
  }

  async updateCartItem(userId: string, productId: number, quantity: number): Promise<CartItem | undefined> {
    const userCart = this.cartItemMap.get(userId);
    if (!userCart) return undefined;
    
    const itemIndex = userCart.findIndex(item => item.productId === productId);
    if (itemIndex < 0) return undefined;
    
    const item = userCart[itemIndex];
    const updatedItem: CartItem = {
      ...item,
      quantity,
      updatedAt: new Date()
    };
    
    userCart[itemIndex] = updatedItem;
    return updatedItem;
  }

  async removeFromCart(userId: string, productId: number): Promise<boolean> {
    const userCart = this.cartItemMap.get(userId);
    if (!userCart) return false;
    
    const initialLength = userCart.length;
    const newCart = userCart.filter(item => item.productId !== productId);
    
    if (newCart.length === initialLength) {
      return false;
    }
    
    this.cartItemMap.set(userId, newCart);
    return true;
  }

  async clearCart(userId: string): Promise<boolean> {
    this.cartItemMap.set(userId, []);
    return true;
  }

  // Order operations
  async createOrder(orderData: InsertOrder, items: InsertOrderItem[]): Promise<Order> {
    const orderId = this.orderId++;
    const now = new Date();
    
    const order: Order = {
      id: orderId,
      ...orderData,
      createdAt: now,
      updatedAt: now
    };
    
    const orderItems: OrderItem[] = items.map(item => {
      const id = this.orderItemId++;
      return {
        id,
        ...item,
        orderId
      };
    });
    
    this.orderMap.set(orderId, order);
    this.orderItemMap.set(orderId, orderItems);
    
    // Clear user's cart after successful order
    this.clearCart(orderData.userId);
    
    return order;
  }

  async getOrdersByUser(userId: string): Promise<Order[]> {
    return Array.from(this.orderMap.values()).filter(
      order => order.userId === userId
    );
  }

  async getOrderById(id: number): Promise<Order | undefined> {
    return this.orderMap.get(id);
  }

  async getOrderItems(orderId: number): Promise<OrderItem[]> {
    return this.orderItemMap.get(orderId) || [];
  }

  // Contact operations
  async createContactMessage(messageData: InsertContactMessage): Promise<ContactMessage> {
    const id = this.contactMessageId++;
    const now = new Date();
    
    const message: ContactMessage = {
      id,
      ...messageData,
      createdAt: now
    };
    
    this.contactMessageMap.set(id, message);
    return message;
  }
}

export const storage = new MemStorage();

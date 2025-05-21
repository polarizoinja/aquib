# AL-HALAL Foods E-commerce Platform

## Overview

This project is an e-commerce platform for AL-HALAL Foods, a halal chicken and poultry products supplier targeting restaurants and food service businesses. The application follows a modern fullstack architecture with a React frontend, Express backend, and PostgreSQL database using Drizzle ORM.

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend
- **Framework**: React with TypeScript
- **Routing**: Wouter (lightweight alternative to React Router)
- **State Management**: 
  - TanStack Query (React Query) for server state
  - React Context for global application state
- **UI Components**: Custom components built on top of Radix UI primitives with shadcn/ui implementation
- **Styling**: Tailwind CSS with a custom theme focused on AL-HALAL Foods brand colors
- **Form Handling**: React Hook Form with Zod for validation

### Backend
- **Framework**: Express.js with TypeScript
- **Authentication**: Replit Auth (OpenID Connect)
- **API**: RESTful API structure with JSON responses
- **Session Management**: Express-session with PostgreSQL store
- **Database Access**: Drizzle ORM for type-safe database queries

### Database
- **Type**: PostgreSQL (via Replit PostgreSQL module)
- **ORM**: Drizzle ORM
- **Schema Validation**: Drizzle Zod for validating database operations

## Key Components

### Frontend Components

1. **Pages**: 
   - Home: Landing page with hero section, featured products, and business value propositions
   - Products: Browsable product catalog with category filtering
   - ProductDetail: Detailed view of individual products with add to cart functionality
   - Cart: Shopping cart management
   - Checkout: Order processing and payment selection
   - OrderHistory: User order tracking and history
   - About/Contact: Company information and contact form

2. **Layout Components**:
   - Navbar: Main navigation with search, cart, and authentication
   - Footer: Site-wide footer with links and company information
   - ThemeProvider: Manages application theming

3. **UI Components**:
   - Extensive collection of shadcn/ui components (Button, Card, Dialog, etc.)
   - Custom business-specific components (ProductCard, CartItem, etc.)

### Backend Components

1. **Authentication**:
   - Built on Replit Auth with OpenID Connect
   - User session management with secure cookie storage

2. **API Routes**:
   - `/api/auth/*`: Authentication-related endpoints
   - `/api/products/*`: Product catalog management
   - `/api/categories/*`: Product category operations
   - `/api/cart/*`: Shopping cart operations
   - `/api/orders/*`: Order processing and history
   - `/api/contact`: Contact form submissions

3. **Database Models**:
   - Users: Customer and restaurant account information
   - Products: Product catalog with details like price, description, etc.
   - Categories: Product categorization
   - CartItems: Temporary storage for items in users' carts
   - Orders & OrderItems: Order processing and history
   - ContactMessages: Customer inquiries 

## Data Flow

1. **Authentication Flow**:
   - User logs in via Replit Auth (OpenID Connect)
   - Session is created and stored in PostgreSQL sessions table
   - User information is fetched or created in the users table
   - Frontend stores authentication state using React Query

2. **Product Browsing Flow**:
   - Categories and products are loaded from the database
   - Frontend displays products with filtering options
   - Search functionality allows text-based queries

3. **Shopping Flow**:
   - Authenticated users can add products to cart
   - Cart is persisted in the database
   - Checkout process captures shipping/billing details
   - Orders are created and linked to user accounts

4. **Order Management Flow**:
   - Users can view order history
   - Order details include items, quantities, and status

## External Dependencies

### Frontend
- **@tanstack/react-query**: Data fetching and state management
- **@radix-ui/react-***: UI component primitives
- **tailwindcss**: Utility-first CSS framework
- **class-variance-authority**: Component style variants
- **wouter**: Lightweight routing
- **react-hook-form**: Form state management
- **zod**: Schema validation

### Backend
- **express**: Web server framework
- **openid-client & passport**: Authentication
- **express-session & connect-pg-simple**: Session management
- **drizzle-orm**: Database ORM
- **drizzle-zod**: Database schema validation

## Deployment Strategy

The application is configured for deployment on Replit with the following strategy:

1. **Development**: 
   - `npm run dev` runs the development server
   - Vite provides hot module replacement for frontend code
   - Express serves the API and static files

2. **Production Build**:
   - `npm run build` creates production-ready assets
   - Frontend: Vite builds optimized static files
   - Backend: esbuild bundles server code to ESM format

3. **Production Run**:
   - `npm run start` executes the production build
   - NODE_ENV is set to "production"
   - Static assets are served from the dist directory

4. **Database Management**:
   - `npm run db:push` updates the database schema
   - Drizzle ORM manages migrations and schema changes
   - The database is provisioned as a Replit PostgreSQL module

## Next Steps

1. **Database Setup**:
   - Complete the database schema implementation
   - Configure Postgres connection

2. **Authentication Implementation**:
   - Finalize Replit Auth integration
   - Implement user registration for restaurants

3. **Product Catalog**:
   - Implement product and category management
   - Set up product search functionality

4. **Shopping Cart & Checkout**:
   - Complete cart management functionality
   - Implement order processing and payment integration

5. **UI Refinement**:
   - Apply AL-HALAL Foods branding consistently
   - Ensure mobile responsiveness
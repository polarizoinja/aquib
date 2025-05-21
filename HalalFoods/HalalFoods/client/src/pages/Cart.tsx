import { useQuery } from "@tanstack/react-query";
import { Link } from "wouter";
import { Helmet } from "react-helmet";
import { CartItemWithProduct } from "@/lib/types";
import { useAuth } from "@/hooks/useAuth";
import { apiRequest } from "@/lib/queryClient";
import { queryClient } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Skeleton } from "@/components/ui/skeleton";
import CartItem from "@/components/CartItem";
import { ShoppingCart, ShoppingBag, ArrowRight, Trash2 } from "lucide-react";

export default function Cart() {
  const { isAuthenticated, isLoading: authLoading } = useAuth();
  const { toast } = useToast();

  // Fetch cart items
  const { 
    data: cartItems, 
    isLoading: cartLoading,
    error
  } = useQuery<CartItemWithProduct[]>({
    queryKey: ['/api/cart'],
    enabled: isAuthenticated,
  });

  // Handle clear cart
  const handleClearCart = async () => {
    try {
      await apiRequest("DELETE", "/api/cart");
      queryClient.invalidateQueries({ queryKey: ["/api/cart"] });
      toast({
        title: "Cart cleared",
        description: "All items have been removed from your cart",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to clear cart",
        variant: "destructive",
      });
    }
  };

  // Calculate cart totals
  const calculateTotals = () => {
    if (!cartItems || cartItems.length === 0) return { subtotal: 0, tax: 0, total: 0 };
    
    const subtotal = cartItems.reduce((sum, item) => {
      return sum + (item.product.price * item.quantity);
    }, 0);
    
    const tax = subtotal * 0.05; // Assuming 5% tax
    const total = subtotal + tax;
    
    return { subtotal, tax, total };
  };

  const { subtotal, tax, total } = calculateTotals();

  // Render loading state
  if (authLoading || cartLoading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="mb-6">
          <Skeleton className="h-10 w-48 mb-2" />
          <Skeleton className="h-5 w-64" />
        </div>
        <div className="flex flex-col md:flex-row gap-8">
          <div className="w-full md:w-2/3">
            {[1, 2, 3].map((i) => (
              <Skeleton key={i} className="w-full h-40 mb-4" />
            ))}
          </div>
          <div className="w-full md:w-1/3">
            <Skeleton className="w-full h-64" />
          </div>
        </div>
      </div>
    );
  }

  // Render not authenticated state
  if (!isAuthenticated) {
    return (
      <>
        <Helmet>
          <title>Shopping Cart | AL-HALAL Foods</title>
          <meta 
            name="description" 
            content="View your shopping cart at AL-HALAL Foods. Login to see your selected items."
          />
        </Helmet>
        <div className="container mx-auto px-4 py-16 text-center">
          <ShoppingCart className="mx-auto h-16 w-16 text-primary mb-4" />
          <h1 className="text-3xl font-bold mb-4 font-heading">Your Shopping Cart</h1>
          <p className="text-lg mb-8">Please log in to view your cart</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button asChild className="bg-primary hover:bg-primary-dark text-white">
              <Link href="/api/login">Log In</Link>
            </Button>
            <Button asChild variant="outline">
              <Link href="/products">Browse Products</Link>
            </Button>
          </div>
        </div>
      </>
    );
  }

  // Render empty cart
  if (!cartItems || cartItems.length === 0) {
    return (
      <>
        <Helmet>
          <title>Shopping Cart | AL-HALAL Foods</title>
          <meta 
            name="description" 
            content="Your shopping cart is currently empty. Browse our selection of premium halal chicken products."
          />
        </Helmet>
        <div className="container mx-auto px-4 py-16 text-center">
          <ShoppingCart className="mx-auto h-16 w-16 text-primary mb-4" />
          <h1 className="text-3xl font-bold mb-4 font-heading">Your Cart is Empty</h1>
          <p className="text-lg mb-8">Add some products to your cart to place an order</p>
          <Button asChild className="bg-primary hover:bg-primary-dark text-white">
            <Link href="/products">Browse Products</Link>
          </Button>
        </div>
      </>
    );
  }

  return (
    <>
      <Helmet>
        <title>Shopping Cart | AL-HALAL Foods</title>
        <meta 
          name="description" 
          content="Review and manage items in your shopping cart. Premium halal chicken products for your restaurant."
        />
      </Helmet>

      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-2 font-heading">Your Shopping Cart</h1>
        <p className="text-gray-600 mb-8">Review and update your items before checkout</p>

        <div className="flex flex-col lg:flex-row gap-8">
          {/* Cart Items */}
          <div className="w-full lg:w-2/3">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-bold">{cartItems.length} {cartItems.length === 1 ? 'Item' : 'Items'}</h2>
              <Button 
                variant="outline" 
                size="sm" 
                onClick={handleClearCart}
                className="text-destructive border-destructive hover:bg-destructive/10"
              >
                <Trash2 className="h-4 w-4 mr-2" /> Clear Cart
              </Button>
            </div>
            
            {/* Cart Items List */}
            <div className="space-y-4">
              {cartItems.map((item) => (
                <CartItem key={item.productId} item={item} />
              ))}
            </div>
          </div>

          {/* Order Summary */}
          <div className="w-full lg:w-1/3">
            <Card>
              <CardHeader>
                <CardTitle>Order Summary</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex justify-between">
                    <span>Subtotal</span>
                    <span>${subtotal.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Tax (5%)</span>
                    <span>${tax.toFixed(2)}</span>
                  </div>
                  <Separator />
                  <div className="flex justify-between font-bold">
                    <span>Total</span>
                    <span>${total.toFixed(2)}</span>
                  </div>
                </div>
              </CardContent>
              <CardFooter className="flex flex-col gap-4">
                <Button 
                  asChild
                  className="w-full bg-primary hover:bg-primary-dark text-white"
                >
                  <Link href="/checkout">
                    Proceed to Checkout <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
                <Button 
                  asChild
                  variant="outline" 
                  className="w-full"
                >
                  <Link href="/products">
                    <ShoppingBag className="mr-2 h-4 w-4" /> Continue Shopping
                  </Link>
                </Button>
              </CardFooter>
            </Card>
            
            <div className="mt-6 bg-primary/10 p-4 rounded-lg">
              <h3 className="font-bold mb-2">Delivery Information</h3>
              <p className="text-sm text-gray-700">
                All orders are delivered in temperature-controlled vehicles to ensure product freshness. 
                Orders placed before 10 AM are eligible for same-day delivery for local restaurants.
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

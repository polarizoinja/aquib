import { useState } from "react";
import { useLocation } from "wouter";
import { Helmet } from "react-helmet";
import { useQuery } from "@tanstack/react-query";
import { useAuth } from "@/hooks/useAuth";
import { CartItemWithProduct } from "@/lib/types";
import { apiRequest } from "@/lib/queryClient";
import { queryClient } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { 
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from "@/components/ui/form";
import { 
  Card, 
  CardContent, 
  CardFooter, 
  CardHeader, 
  CardTitle
} from "@/components/ui/card";
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from "@/components/ui/select";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { CheckCircle, ArrowLeft, CreditCard, Building2, Truck } from "lucide-react";

// Form validation schema
const checkoutFormSchema = z.object({
  shippingAddress: z.string().min(5, "Shipping address is required"),
  billingAddress: z.string().min(5, "Billing address is required"),
  paymentMethod: z.enum(["credit_card", "bank_transfer", "cash_on_delivery"]),
  deliveryNotes: z.string().optional(),
});

type CheckoutFormValues = z.infer<typeof checkoutFormSchema>;

export default function Checkout() {
  const [, navigate] = useLocation();
  const { user, isAuthenticated } = useAuth();
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  // Fetch cart items
  const { 
    data: cartItems, 
    isLoading: cartLoading,
  } = useQuery<CartItemWithProduct[]>({
    queryKey: ['/api/cart'],
    enabled: isAuthenticated,
  });

  // Form definition
  const form = useForm<CheckoutFormValues>({
    resolver: zodResolver(checkoutFormSchema),
    defaultValues: {
      shippingAddress: user?.restaurantAddress || "",
      billingAddress: user?.restaurantAddress || "",
      paymentMethod: "credit_card",
      deliveryNotes: "",
    },
  });

  // Calculate order totals
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

  // Handle form submission
  const onSubmit = async (data: CheckoutFormValues) => {
    if (!cartItems || cartItems.length === 0) {
      toast({
        title: "Cart is empty",
        description: "Your cart is empty. Add some products before checkout.",
        variant: "destructive",
      });
      return;
    }

    setIsSubmitting(true);

    try {
      // Prepare order data
      const orderData = {
        order: {
          ...data,
          total,
        },
        items: cartItems.map(item => ({
          productId: item.productId,
          quantity: item.quantity,
          price: item.product.price,
          selectedOptions: item.selectedOptions,
        })),
      };

      // Create order
      await apiRequest("POST", "/api/orders", orderData);
      
      // Show success message
      setIsSuccess(true);
      
      // Clear cart and invalidate queries
      queryClient.invalidateQueries({ queryKey: ["/api/cart"] });
      queryClient.invalidateQueries({ queryKey: ["/api/orders"] });
      
    } catch (error) {
      toast({
        title: "Checkout failed",
        description: "There was an error processing your order. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  // Render success page
  if (isSuccess) {
    return (
      <>
        <Helmet>
          <title>Order Confirmation | AL-HALAL Foods</title>
          <meta 
            name="description" 
            content="Your order has been successfully placed with AL-HALAL Foods."
          />
        </Helmet>
        <div className="container mx-auto px-4 py-16 text-center">
          <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <CheckCircle className="h-10 w-10 text-green-600" />
          </div>
          <h1 className="text-3xl font-bold mb-4 font-heading">Order Successful!</h1>
          <p className="text-lg mb-8 max-w-md mx-auto">
            Thank you for your order. We have received your order and will process it shortly.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button asChild className="bg-primary hover:bg-primary-dark text-white">
              <a href="/orders">View Your Orders</a>
            </Button>
            <Button asChild variant="outline">
              <a href="/products">Continue Shopping</a>
            </Button>
          </div>
        </div>
      </>
    );
  }

  // Redirect if cart is empty
  if (!cartLoading && (!cartItems || cartItems.length === 0)) {
    navigate("/cart");
    return null;
  }

  return (
    <>
      <Helmet>
        <title>Checkout | AL-HALAL Foods</title>
        <meta 
          name="description" 
          content="Complete your purchase of premium halal chicken products for your restaurant."
        />
      </Helmet>

      <div className="container mx-auto px-4 py-8">
        <div className="mb-6">
          <Button variant="ghost" asChild className="mb-4">
            <a href="/cart">
              <ArrowLeft className="mr-2 h-4 w-4" /> Back to Cart
            </a>
          </Button>
          <h1 className="text-3xl font-bold mb-2 font-heading">Checkout</h1>
          <p className="text-gray-600">Complete your order details below</p>
        </div>

        <div className="flex flex-col lg:flex-row gap-8">
          {/* Checkout Form */}
          <div className="w-full lg:w-2/3">
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                {/* Shipping Information */}
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center">
                      <Truck className="mr-2 h-5 w-5" /> Shipping Information
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <FormField
                      control={form.control}
                      name="shippingAddress"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Delivery Address</FormLabel>
                          <FormControl>
                            <Textarea 
                              placeholder="Enter your restaurant's full address" 
                              className="resize-none h-24"
                              {...field} 
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="deliveryNotes"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Delivery Notes (Optional)</FormLabel>
                          <FormControl>
                            <Textarea 
                              placeholder="Special delivery instructions or notes" 
                              className="resize-none h-24"
                              {...field} 
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </CardContent>
                </Card>

                {/* Billing Information */}
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center">
                      <Building2 className="mr-2 h-5 w-5" /> Billing Information
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <FormField
                      control={form.control}
                      name="billingAddress"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Billing Address</FormLabel>
                          <FormControl>
                            <Textarea 
                              placeholder="Enter billing address" 
                              className="resize-none h-24"
                              {...field} 
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </CardContent>
                </Card>

                {/* Payment Method */}
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center">
                      <CreditCard className="mr-2 h-5 w-5" /> Payment Method
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <FormField
                      control={form.control}
                      name="paymentMethod"
                      render={({ field }) => (
                        <FormItem>
                          <FormControl>
                            <RadioGroup
                              onValueChange={field.onChange}
                              value={field.value}
                              className="space-y-4"
                            >
                              <div className="flex items-center space-x-2">
                                <RadioGroupItem value="credit_card" id="credit_card" />
                                <label
                                  htmlFor="credit_card"
                                  className="flex items-center cursor-pointer"
                                >
                                  <CreditCard className="mr-2 h-4 w-4" />
                                  Credit Card / Debit Card
                                </label>
                              </div>
                              <div className="flex items-center space-x-2">
                                <RadioGroupItem value="bank_transfer" id="bank_transfer" />
                                <label
                                  htmlFor="bank_transfer"
                                  className="flex items-center cursor-pointer"
                                >
                                  <Building2 className="mr-2 h-4 w-4" />
                                  Bank Transfer
                                </label>
                              </div>
                              <div className="flex items-center space-x-2">
                                <RadioGroupItem value="cash_on_delivery" id="cash_on_delivery" />
                                <label
                                  htmlFor="cash_on_delivery"
                                  className="flex items-center cursor-pointer"
                                >
                                  <Truck className="mr-2 h-4 w-4" />
                                  Cash on Delivery
                                </label>
                              </div>
                            </RadioGroup>
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </CardContent>
                </Card>
                
                {/* Submit Button on mobile */}
                <div className="lg:hidden">
                  <Button 
                    type="submit" 
                    className="w-full bg-primary hover:bg-primary-dark text-white"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? "Processing..." : "Place Order"}
                  </Button>
                </div>
              </form>
            </Form>
          </div>

          {/* Order Summary */}
          <div className="w-full lg:w-1/3">
            <Card className="sticky top-20">
              <CardHeader>
                <CardTitle>Order Summary</CardTitle>
              </CardHeader>
              <CardContent>
                {/* Items Summary */}
                <div className="mb-4">
                  <h3 className="font-medium mb-2">Items ({cartItems?.length || 0})</h3>
                  <div className="space-y-2 mb-4">
                    {cartItems?.map(item => (
                      <div key={item.productId} className="flex justify-between text-sm">
                        <span>
                          {item.product.name} x {item.quantity} {item.product.unit}
                        </span>
                        <span>${(item.product.price * item.quantity).toFixed(2)}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Totals */}
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span>Subtotal</span>
                    <span>${subtotal.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Tax (5%)</span>
                    <span>${tax.toFixed(2)}</span>
                  </div>
                  <Separator className="my-2" />
                  <div className="flex justify-between font-bold text-lg">
                    <span>Total</span>
                    <span>${total.toFixed(2)}</span>
                  </div>
                </div>
              </CardContent>
              <CardFooter>
                {/* Hidden on mobile, shown on desktop */}
                <Button 
                  onClick={form.handleSubmit(onSubmit)}
                  className="w-full bg-primary hover:bg-primary-dark text-white hidden lg:flex"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? "Processing..." : "Place Order"}
                </Button>
              </CardFooter>
            </Card>
          </div>
        </div>
      </div>
    </>
  );
}

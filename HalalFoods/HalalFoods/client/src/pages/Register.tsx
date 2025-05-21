import { useState } from "react";
import { useLocation } from "wouter";
import { Helmet } from "react-helmet";
import { useAuth } from "@/hooks/useAuth";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { apiRequest } from "@/lib/queryClient";
import { queryClient } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";
import { 
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from "@/components/ui/form";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Building2, Lock, User, Utensils } from "lucide-react";

// Form validation schema
const registerFormSchema = z.object({
  restaurantName: z.string().min(2, "Restaurant name is required"),
  restaurantAddress: z.string().min(5, "Restaurant address is required"),
  phoneNumber: z.string().min(6, "Phone number is required"),
  isRestaurant: z.boolean().default(true),
});

type RegisterFormValues = z.infer<typeof registerFormSchema>;

export default function Register() {
  const [, navigate] = useLocation();
  const { user, isAuthenticated, isLoading } = useAuth();
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Form definition
  const form = useForm<RegisterFormValues>({
    resolver: zodResolver(registerFormSchema),
    defaultValues: {
      restaurantName: user?.restaurantName || "",
      restaurantAddress: user?.restaurantAddress || "",
      phoneNumber: user?.phoneNumber || "",
      isRestaurant: true,
    },
  });

  // If user is already authenticated and has already registered as a restaurant
  const isAlreadyRegistered = isAuthenticated && user?.isRestaurant;

  // Handle form submission
  const onSubmit = async (data: RegisterFormValues) => {
    if (!isAuthenticated) {
      // Redirect to login if not authenticated
      navigate("/api/login");
      return;
    }

    setIsSubmitting(true);

    try {
      // Update user profile
      await apiRequest("POST", "/api/auth/profile", data);
      
      // Invalidate user query to refresh data
      queryClient.invalidateQueries({ queryKey: ["/api/auth/user"] });
      
      toast({
        title: "Registration successful",
        description: "Your restaurant profile has been created",
      });
      
      // Redirect to products page
      setTimeout(() => navigate("/products"), 1500);
      
    } catch (error) {
      toast({
        title: "Registration failed",
        description: "There was an error registering your restaurant. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  // If loading auth state
  if (isLoading) {
    return (
      <div className="container mx-auto px-4 py-16 text-center">
        <p>Loading...</p>
      </div>
    );
  }

  // If already registered, show success message
  if (isAlreadyRegistered) {
    return (
      <>
        <Helmet>
          <title>Restaurant Registration | AL-HALAL Foods</title>
          <meta 
            name="description" 
            content="Your restaurant is already registered with AL-HALAL Foods. Start ordering premium halal chicken products for your restaurant."
          />
        </Helmet>
        <div className="container mx-auto px-4 py-16 text-center">
          <Utensils className="mx-auto h-16 w-16 text-primary mb-4" />
          <h1 className="text-3xl font-bold mb-4 font-heading">Restaurant Already Registered</h1>
          <p className="text-lg mb-8 max-w-md mx-auto">
            Your restaurant is already registered with us. You can now browse products and place orders.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button asChild className="bg-primary hover:bg-primary-dark text-white">
              <a href="/products">Browse Products</a>
            </Button>
            <Button asChild variant="outline">
              <a href="/api/logout">Logout</a>
            </Button>
          </div>
        </div>
      </>
    );
  }

  return (
    <>
      <Helmet>
        <title>Restaurant Registration | AL-HALAL Foods</title>
        <meta 
          name="description" 
          content="Register your restaurant with AL-HALAL Foods to access premium halal chicken and poultry products at wholesale prices."
        />
        <meta property="og:title" content="Restaurant Registration | AL-HALAL Foods" />
        <meta property="og:description" content="Register your restaurant with AL-HALAL Foods for wholesale access." />
        <meta property="og:type" content="website" />
      </Helmet>

      <div className="container mx-auto px-4 py-8">
        <div className="max-w-md mx-auto">
          <Card>
            <CardHeader>
              <CardTitle className="text-2xl flex items-center">
                <Building2 className="mr-2 h-6 w-6 text-primary" /> 
                Restaurant Registration
              </CardTitle>
              <CardDescription>
                Register your restaurant to access wholesale prices and exclusive offers
              </CardDescription>
            </CardHeader>
            <CardContent>
              {!isAuthenticated ? (
                <div className="text-center py-4">
                  <Lock className="mx-auto h-12 w-12 text-primary mb-4" />
                  <h2 className="text-xl font-bold mb-4">Login Required</h2>
                  <p className="mb-6 text-gray-600">
                    Please login to register your restaurant
                  </p>
                  <Button 
                    asChild
                    className="bg-primary hover:bg-primary-dark text-white"
                  >
                    <a href="/api/login">
                      <User className="mr-2 h-4 w-4" /> Login to Continue
                    </a>
                  </Button>
                </div>
              ) : (
                <Form {...form}>
                  <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                    <FormField
                      control={form.control}
                      name="restaurantName"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Restaurant Name</FormLabel>
                          <FormControl>
                            <Input placeholder="Enter restaurant name" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <FormField
                      control={form.control}
                      name="restaurantAddress"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Restaurant Address</FormLabel>
                          <FormControl>
                            <Textarea 
                              placeholder="Enter full restaurant address" 
                              className="resize-none h-20"
                              {...field} 
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <FormField
                      control={form.control}
                      name="phoneNumber"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Phone Number</FormLabel>
                          <FormControl>
                            <Input placeholder="Enter contact phone number" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <Button 
                      type="submit" 
                      className="w-full bg-primary hover:bg-primary-dark text-white"
                      disabled={isSubmitting}
                    >
                      {isSubmitting ? "Registering..." : "Register Restaurant"}
                    </Button>
                  </form>
                </Form>
              )}
            </CardContent>
            <Separator />
            <CardFooter className="flex flex-col text-center pt-4">
              <p className="text-sm text-gray-500">
                By registering, you agree to our terms and conditions and privacy policy.
              </p>
            </CardFooter>
          </Card>
        </div>
      </div>
    </>
  );
}

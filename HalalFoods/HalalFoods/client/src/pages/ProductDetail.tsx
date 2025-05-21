import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { useParams, Link } from "wouter";
import { Helmet } from "react-helmet";
import { Product } from "@/lib/types";
import { apiRequest } from "@/lib/queryClient";
import { queryClient } from "@/lib/queryClient";
import { useAuth } from "@/hooks/useAuth";
import { useToast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";
import { 
  Card, 
  CardContent, 
  CardFooter 
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from "@/components/ui/select";
import { CheckCircle, ShoppingCart, ArrowLeft } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";

export default function ProductDetail() {
  const { slug } = useParams();
  const { isAuthenticated } = useAuth();
  const { toast } = useToast();
  const [quantity, setQuantity] = useState("1");
  const [selectedOptions, setSelectedOptions] = useState<Record<string, string>>({});
  const [isAddingToCart, setIsAddingToCart] = useState(false);

  // Fetch product details
  const { data: product, isLoading, error } = useQuery<Product>({
    queryKey: [`/api/products/${slug}`],
  });

  if (error) {
    toast({
      title: "Error",
      description: "Failed to load product details. Please try again.",
      variant: "destructive",
    });
  }

  // Parse product options
  const options = product?.options ? JSON.parse(JSON.stringify(product.options)) : [];

  // Handle option selection
  const handleOptionChange = (optionName: string, value: string) => {
    setSelectedOptions(prev => ({
      ...prev,
      [optionName]: value
    }));
  };

  // Handle add to cart
  const handleAddToCart = async () => {
    if (!isAuthenticated) {
      toast({
        title: "Please log in",
        description: "You need to log in to add items to your cart",
        variant: "destructive",
      });
      return;
    }

    if (!product) return;

    // Validate that all options are selected
    if (options.length > 0) {
      for (const option of options) {
        if (!selectedOptions[option.name]) {
          toast({
            title: "Please select all options",
            description: `Please select a ${option.name.toLowerCase()} option`,
            variant: "destructive",
          });
          return;
        }
      }
    }

    setIsAddingToCart(true);
    try {
      await apiRequest("POST", "/api/cart", {
        productId: product.id,
        quantity: parseFloat(quantity),
        selectedOptions: Object.keys(selectedOptions).length > 0 ? selectedOptions : undefined
      });

      queryClient.invalidateQueries({ queryKey: ["/api/cart"] });
      
      toast({
        title: "Added to cart",
        description: `${product.name} has been added to your cart`,
      });
    } catch (error) {
      toast({
        title: "Failed to add to cart",
        description: "There was an error adding the item to your cart",
        variant: "destructive",
      });
    } finally {
      setIsAddingToCart(false);
    }
  };

  // Generate quantity options
  const getQuantityOptions = () => {
    if (!product) return null;
    
    const minQuantity = product.minimumOrderQuantity;
    const options = [];

    // Start from minimum quantity
    let currentQty = minQuantity;
    while (currentQty <= 20) {
      options.push(
        <SelectItem key={currentQty} value={currentQty.toString()}>
          {currentQty} {product.unit}
        </SelectItem>
      );
      // Increment by min quantity up to 5, then by 5
      currentQty += currentQty < 5 ? minQuantity : 5;
    }

    return options;
  };

  // Render skeleton during loading
  if (isLoading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="mb-6">
          <Skeleton className="h-8 w-48" />
        </div>
        <div className="flex flex-col md:flex-row gap-8">
          <div className="w-full md:w-1/2">
            <Skeleton className="w-full h-96 rounded-lg" />
          </div>
          <div className="w-full md:w-1/2">
            <Skeleton className="h-10 w-3/4 mb-3" />
            <Skeleton className="h-6 w-1/4 mb-6" />
            <Skeleton className="h-4 w-full mb-2" />
            <Skeleton className="h-4 w-full mb-2" />
            <Skeleton className="h-4 w-3/4 mb-6" />
            <Skeleton className="h-6 w-1/3 mb-4" />
            <Skeleton className="h-10 w-full mb-4" />
            <Skeleton className="h-12 w-full" />
          </div>
        </div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="container mx-auto px-4 py-16 text-center">
        <h2 className="text-2xl font-bold mb-4">Product Not Found</h2>
        <p className="mb-6">We couldn't find the product you're looking for.</p>
        <Button asChild className="bg-primary hover:bg-primary-dark text-white">
          <Link href="/products">Browse All Products</Link>
        </Button>
      </div>
    );
  }

  return (
    <>
      <Helmet>
        <title>{`${product.name} | AL-HALAL Foods`}</title>
        <meta 
          name="description" 
          content={product.description || `Premium quality ${product.name.toLowerCase()} from AL-HALAL Foods. Certified halal chicken products for restaurants.`}
        />
        <meta property="og:title" content={`${product.name} | AL-HALAL Foods`} />
        <meta property="og:description" content={product.description || `Premium quality ${product.name.toLowerCase()} from AL-HALAL Foods.`} />
        <meta property="og:type" content="product" />
        <meta property="og:image" content={product.imageUrl} />
      </Helmet>

      <div className="container mx-auto px-4 py-8">
        <div className="mb-6">
          <Button variant="ghost" asChild className="mb-4">
            <Link href="/products">
              <ArrowLeft className="mr-2 h-4 w-4" /> Back to Products
            </Link>
          </Button>
        </div>

        <div className="flex flex-col md:flex-row gap-8">
          {/* Product Image */}
          <div className="w-full md:w-1/2 relative">
            <div className="halal-badge">
              <CheckCircle className="h-3 w-3 mr-1 inline" /> Halal
            </div>
            <img 
              src={product.imageUrl} 
              alt={product.name} 
              className="w-full rounded-lg object-cover max-h-[500px]"
            />
          </div>

          {/* Product Details */}
          <div className="w-full md:w-1/2">
            <h1 className="text-3xl font-bold mb-2 font-heading">{product.name}</h1>
            <div className="text-2xl font-bold text-primary mb-4">
              ${product.price.toFixed(2)}/{product.unit}
            </div>
            
            <p className="text-gray-700 mb-6">{product.description}</p>
            
            <div className="mb-6">
              <div className="flex items-center text-sm bg-primary-light/10 p-2 rounded">
                <ShoppingCart className="h-4 w-4 mr-2 text-primary" /> 
                Minimum Order Quantity: {product.minimumOrderQuantity} {product.unit}
              </div>
            </div>

            {/* Product Options */}
            {options.length > 0 && (
              <Card className="mb-6">
                <CardContent className="pt-6">
                  <h3 className="font-bold mb-4">Available Options</h3>
                  <div className="space-y-4">
                    {options.map((option: any, index: number) => (
                      <div key={index}>
                        <label className="block text-sm font-medium mb-1">{option.name}:</label>
                        <Select 
                          value={selectedOptions[option.name] || ""}
                          onValueChange={(value) => handleOptionChange(option.name, value)}
                        >
                          <SelectTrigger>
                            <SelectValue placeholder={`Select ${option.name.toLowerCase()}`} />
                          </SelectTrigger>
                          <SelectContent>
                            {option.values.map((value: string, idx: number) => (
                              <SelectItem key={idx} value={value}>
                                {value}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Quantity Selector */}
            <div className="mb-6">
              <label className="block text-sm font-medium mb-1">Quantity:</label>
              <Select 
                value={quantity} 
                onValueChange={setQuantity}
              >
                <SelectTrigger className="w-full">
                  <SelectValue placeholder={`${product.minimumOrderQuantity} ${product.unit}`} />
                </SelectTrigger>
                <SelectContent>
                  {getQuantityOptions()}
                </SelectContent>
              </Select>
            </div>

            {/* Add to Cart Button */}
            <Button 
              className="w-full bg-primary hover:bg-primary-dark text-white"
              size="lg"
              onClick={handleAddToCart}
              disabled={isAddingToCart}
            >
              <ShoppingCart className="mr-2 h-5 w-5" />
              {isAddingToCart ? "Adding..." : "Add to Cart"}
            </Button>
          </div>
        </div>

        {/* Additional Information Tabs */}
        <div className="mt-12">
          <Tabs defaultValue="description">
            <TabsList className="w-full border-b">
              <TabsTrigger value="description" className="flex-1">Product Description</TabsTrigger>
              <TabsTrigger value="details" className="flex-1">Details & Storage</TabsTrigger>
              <TabsTrigger value="certification" className="flex-1">Halal Certification</TabsTrigger>
            </TabsList>
            <TabsContent value="description" className="py-4">
              <div className="space-y-4">
                <p>{product.description}</p>
                <p>Our {product.name.toLowerCase()} is carefully processed according to halal standards, ensuring the highest quality and compliance with Islamic dietary laws.</p>
              </div>
            </TabsContent>
            <TabsContent value="details" className="py-4">
              <div className="space-y-4">
                <h3 className="font-bold">Storage Instructions</h3>
                <p>Keep refrigerated at 0-4°C. For extended shelf life, freeze at -18°C. Once thawed, do not refreeze and use within 24 hours.</p>
                
                <h3 className="font-bold">Delivery Information</h3>
                <p>All products are delivered in temperature-controlled vehicles to ensure freshness. Same-day delivery available for orders placed before 10 AM.</p>
                
                <h3 className="font-bold">Product Specifications</h3>
                <ul className="list-disc pl-5 space-y-1">
                  <li>Unit: {product.unit}</li>
                  <li>Minimum Order: {product.minimumOrderQuantity} {product.unit}</li>
                  <li>Shelf Life: 3-5 days refrigerated, up to 6 months frozen</li>
                  <li>Origin: Sourced from local certified farms</li>
                </ul>
              </div>
            </TabsContent>
            <TabsContent value="certification" className="py-4">
              <div className="space-y-4">
                <h3 className="font-bold">Halal Certification</h3>
                <p>All AL-HALAL Foods products are certified by recognized Islamic authorities, ensuring complete compliance with halal standards from farm to delivery.</p>
                
                <p>Our certification process includes:</p>
                <ul className="list-disc pl-5 space-y-1">
                  <li>Regular inspection of our facilities by certified halal inspectors</li>
                  <li>Strict adherence to Islamic slaughtering methods</li>
                  <li>Complete segregation from non-halal products</li>
                  <li>Documentation and traceability throughout the supply chain</li>
                </ul>
                
                <p>Certification documents are available upon request.</p>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </>
  );
}

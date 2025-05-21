import { useState } from "react";
import { Link } from "wouter";
import { CheckCircle, ShoppingCart } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { Product } from "@/lib/types";
import { useAuth } from "@/hooks/useAuth";
import { apiRequest } from "@/lib/queryClient";
import { queryClient } from "@/lib/queryClient";

interface ProductCardProps {
  product: Product;
}

const ProductCard = ({ product }: ProductCardProps) => {
  const { isAuthenticated } = useAuth();
  const { toast } = useToast();
  const [quantity, setQuantity] = useState(product.minimumOrderQuantity.toString());
  const [isAddingToCart, setIsAddingToCart] = useState(false);

  const handleAddToCart = async () => {
    if (!isAuthenticated) {
      toast({
        title: "Please log in",
        description: "You need to log in to add items to your cart",
        variant: "destructive",
      });
      return;
    }

    setIsAddingToCart(true);
    try {
      await apiRequest("POST", "/api/cart", {
        productId: product.id,
        quantity: parseFloat(quantity),
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
    const minQuantity = product.minimumOrderQuantity;
    const options = [];

    // Add minimum quantity
    options.push(
      <SelectItem key={minQuantity} value={minQuantity.toString()}>
        {minQuantity} {product.unit}
      </SelectItem>
    );

    // Add additional quantity options
    if (minQuantity < 5) {
      options.push(
        <SelectItem key={5} value="5">
          5 {product.unit}
        </SelectItem>
      );
    }

    options.push(
      <SelectItem key={10} value="10">
        10 {product.unit}
      </SelectItem>
    );

    if (product.unit === "kg") {
      options.push(
        <SelectItem key={15} value="15">
          15 {product.unit}
        </SelectItem>
      );
    }

    return options;
  };

  // Extract product options
  const options = product.options ? JSON.parse(JSON.stringify(product.options)) : [];

  return (
    <div className="product-card bg-white rounded-lg shadow-md overflow-hidden transition duration-300 relative">
      <div className="halal-badge">
        <CheckCircle className="h-3 w-3 mr-1 inline" /> Halal
      </div>
      <Link href={`/products/${product.slug}`}>
        <img 
          src={product.imageUrl} 
          alt={product.name} 
          className="w-full h-48 object-cover"
        />
      </Link>
      <div className="p-4">
        <Link href={`/products/${product.slug}`}>
          <h3 className="font-bold text-lg mb-2 hover:text-primary">{product.name}</h3>
        </Link>
        
        {options.length > 0 && (
          <div className="flex mb-2">
            <span className="text-sm text-gray-600 mr-2">{options[0].name}:</span>
            {options[0].values.map((value: string, index: number) => (
              <span 
                key={index} 
                className="text-xs bg-gray-200 rounded-full px-2 py-1 mr-1 last:mr-0"
              >
                {value}
              </span>
            ))}
          </div>
        )}
        
        <div className="flex justify-between items-center mb-3">
          <div>
            <span className="text-lg font-bold text-primary">${product.price.toFixed(2)}</span>
            <span className="text-sm text-gray-500">/{product.unit}</span>
          </div>
          <div className="text-sm text-gray-600">
            <ShoppingCart className="h-3 w-3 mr-1 inline" /> MOQ: {product.minimumOrderQuantity}{product.unit}
          </div>
        </div>
        
        <div className="flex items-center">
          <div className="mr-3 flex-shrink-0">
            <Select
              value={quantity}
              onValueChange={setQuantity}
            >
              <SelectTrigger className="w-[80px]">
                <SelectValue placeholder={`${product.minimumOrderQuantity} ${product.unit}`} />
              </SelectTrigger>
              <SelectContent>
                {getQuantityOptions()}
              </SelectContent>
            </Select>
          </div>
          <Button 
            onClick={handleAddToCart}
            disabled={isAddingToCart}
            className="bg-primary hover:bg-primary-dark text-white py-2 px-4 rounded-lg text-sm font-medium transition duration-300 flex-grow"
          >
            {isAddingToCart ? "Adding..." : "Add to Cart"}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;

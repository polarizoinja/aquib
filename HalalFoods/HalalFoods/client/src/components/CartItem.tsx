import { useState } from "react";
import { Link } from "wouter";
import { Minus, Plus, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { apiRequest } from "@/lib/queryClient";
import { queryClient } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";
import { CartItemWithProduct } from "@/lib/types";
import { Card, CardContent } from "@/components/ui/card";

interface CartItemProps {
  item: CartItemWithProduct;
}

const CartItem = ({ item }: CartItemProps) => {
  const { toast } = useToast();
  const [isUpdating, setIsUpdating] = useState(false);
  const { product, quantity } = item;

  const handleUpdateQuantity = async (newQuantity: number) => {
    if (newQuantity < product.minimumOrderQuantity) {
      toast({
        title: "Minimum order quantity",
        description: `The minimum order quantity for ${product.name} is ${product.minimumOrderQuantity} ${product.unit}`,
        variant: "destructive",
      });
      return;
    }

    setIsUpdating(true);
    try {
      await apiRequest("PUT", `/api/cart/${product.id}`, { quantity: newQuantity });
      queryClient.invalidateQueries({ queryKey: ["/api/cart"] });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to update quantity",
        variant: "destructive",
      });
    } finally {
      setIsUpdating(false);
    }
  };

  const handleRemoveItem = async () => {
    setIsUpdating(true);
    try {
      await apiRequest("DELETE", `/api/cart/${product.id}`);
      queryClient.invalidateQueries({ queryKey: ["/api/cart"] });
      toast({
        title: "Item removed",
        description: `${product.name} has been removed from your cart`,
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to remove item",
        variant: "destructive",
      });
    } finally {
      setIsUpdating(false);
    }
  };

  return (
    <Card className="mb-4">
      <CardContent className="p-4">
        <div className="flex flex-col md:flex-row">
          <div className="w-full md:w-1/4 mb-4 md:mb-0">
            <Link href={`/products/${product.slug}`}>
              <img 
                src={product.imageUrl} 
                alt={product.name} 
                className="w-full h-28 object-cover rounded"
              />
            </Link>
          </div>
          <div className="w-full md:w-3/4 md:pl-4 flex flex-col justify-between">
            <div>
              <Link href={`/products/${product.slug}`}>
                <h3 className="font-bold text-lg mb-1 hover:text-primary">{product.name}</h3>
              </Link>
              <p className="text-gray-600 text-sm mb-2">
                {product.description?.substring(0, 100)}
                {product.description && product.description.length > 100 ? "..." : ""}
              </p>
              <div className="text-primary font-bold">${product.price.toFixed(2)}/{product.unit}</div>
            </div>
            <div className="flex justify-between items-center mt-4">
              <div className="flex items-center">
                <Button 
                  variant="outline" 
                  size="icon" 
                  className="h-8 w-8"
                  onClick={() => handleUpdateQuantity(quantity - 1)}
                  disabled={isUpdating || quantity <= product.minimumOrderQuantity}
                >
                  <Minus className="h-4 w-4" />
                </Button>
                <span className="mx-3">{quantity} {product.unit}</span>
                <Button 
                  variant="outline" 
                  size="icon" 
                  className="h-8 w-8"
                  onClick={() => handleUpdateQuantity(quantity + 1)}
                  disabled={isUpdating}
                >
                  <Plus className="h-4 w-4" />
                </Button>
              </div>
              <div className="flex items-center">
                <span className="font-bold mr-4">
                  ${(product.price * quantity).toFixed(2)}
                </span>
                <Button 
                  variant="ghost" 
                  size="icon" 
                  className="text-destructive"
                  onClick={handleRemoveItem}
                  disabled={isUpdating}
                >
                  <Trash2 className="h-5 w-5" />
                </Button>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default CartItem;

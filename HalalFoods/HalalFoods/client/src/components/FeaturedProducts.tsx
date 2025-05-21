import { useQuery } from "@tanstack/react-query";
import { Product } from "@/lib/types";
import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

const FeaturedProducts = () => {
  const { data: products, isLoading } = useQuery<Product[]>({
    queryKey: ["/api/products", { featured: true }],
  });

  if (isLoading) {
    return (
      <section className="py-12 bg-neutral">
        <div className="container mx-auto px-4 md:px-6">
          <div className="text-center mb-10">
            <Skeleton className="h-10 w-64 mx-auto" />
            <Skeleton className="h-6 w-full max-w-2xl mx-auto mt-2" />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[1, 2, 3].map((i) => (
              <Card key={i}>
                <Skeleton className="h-56 w-full rounded-t-lg" />
                <CardContent className="p-6">
                  <Skeleton className="h-7 w-3/4 mb-2" />
                  <Skeleton className="h-4 w-full mb-4" />
                  <Skeleton className="h-4 w-full mb-1" />
                  <Skeleton className="h-4 w-full mb-4" />
                  <div className="flex justify-between items-center">
                    <Skeleton className="h-6 w-20" />
                    <Skeleton className="h-9 w-28" />
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>
    );
  }

  if (!products || products.length === 0) {
    return null;
  }

  // Take only the first 3 featured products
  const featuredProducts = products.slice(0, 3);

  return (
    <section className="py-12 bg-neutral">
      <div className="container mx-auto px-4 md:px-6">
        <div className="text-center mb-10">
          <h2 className="text-3xl font-bold text-gray-800 mb-2 font-heading">Featured Products</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">Our most popular ready-to-cook items perfect for your restaurant menu</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {featuredProducts.map((product) => (
            <Card key={product.id} className="bg-white rounded-lg shadow-md overflow-hidden">
              <img 
                src={product.imageUrl} 
                alt={product.name} 
                className="w-full h-56 object-cover"
              />
              <CardContent className="p-6">
                <h3 className="text-xl font-bold mb-2">{product.name}</h3>
                <p className="text-gray-600 mb-4">
                  {product.description && product.description.length > 100
                    ? `${product.description.substring(0, 100)}...`
                    : product.description}
                </p>
                <div className="flex justify-between items-center">
                  <span className="text-lg font-bold text-primary">${product.price.toFixed(2)}/{product.unit}</span>
                  <Button 
                    asChild
                    className="bg-primary hover:bg-primary-dark text-white"
                  >
                    <Link href={`/products/${product.slug}`}>
                      View Details
                    </Link>
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturedProducts;

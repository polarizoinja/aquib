import { useState, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { useLocation, useParams } from "wouter";
import { Helmet } from "react-helmet";
import { Product, Category } from "@/lib/types";
import { Skeleton } from "@/components/ui/skeleton";
import { Button } from "@/components/ui/button";
import CategoryTabs from "@/components/CategoryTabs";
import ProductCard from "@/components/ProductCard";
import { useToast } from "@/hooks/use-toast";

export default function Products() {
  const { toast } = useToast();
  const [location] = useLocation();
  const params = useParams();
  const categorySlug = params?.slug;
  const [searchQuery, setSearchQuery] = useState("");

  // Extract search parameter from URL if present
  useEffect(() => {
    const url = new URL(window.location.href);
    const search = url.searchParams.get("search");
    if (search) {
      setSearchQuery(search);
    }
  }, [location]);

  // Fetch categories
  const { data: categories } = useQuery<Category[]>({
    queryKey: ["/api/categories"],
  });

  // Find current category
  const currentCategory = categories?.find(
    (category) => category.slug === categorySlug
  );

  // Construct query key based on params
  const queryKey = searchQuery
    ? ["/api/products", { search: searchQuery }]
    : categorySlug
    ? ["/api/products", { category: categorySlug }]
    : ["/api/products"];

  // Fetch products
  const {
    data: products,
    isLoading,
    error,
  } = useQuery<Product[]>({
    queryKey,
  });

  // Show error toast if fetch fails
  useEffect(() => {
    if (error) {
      toast({
        title: "Error",
        description: "Failed to load products. Please try again.",
        variant: "destructive",
      });
    }
  }, [error, toast]);

  // Page title based on context
  const getPageTitle = () => {
    if (searchQuery) {
      return `Search results for "${searchQuery}" | AL-HALAL Foods`;
    }
    if (currentCategory) {
      return `${currentCategory.name} | AL-HALAL Foods`;
    }
    return "All Products | AL-HALAL Foods";
  };

  // Meta description based on context
  const getPageDescription = () => {
    if (searchQuery) {
      return `Find halal chicken and poultry products matching "${searchQuery}" at AL-HALAL Foods. Premium products for restaurants.`;
    }
    if (currentCategory) {
      return currentCategory.description || `Browse our selection of ${currentCategory.name.toLowerCase()} at AL-HALAL Foods. Premium halal chicken products for restaurants.`;
    }
    return "Browse our complete selection of halal chicken and poultry products for restaurants. High-quality, certified halal products delivered fresh.";
  };

  // Render skeleton loaders during loading
  const renderSkeletons = () => {
    return Array(8).fill(null).map((_, i) => (
      <div key={i} className="bg-white rounded-lg shadow-md overflow-hidden">
        <Skeleton className="w-full h-48" />
        <div className="p-4">
          <Skeleton className="w-3/4 h-6 mb-2" />
          <Skeleton className="w-full h-4 mb-2" />
          <Skeleton className="w-1/3 h-4 mb-3" />
          <div className="flex items-center">
            <Skeleton className="w-14 h-8 mr-3" />
            <Skeleton className="w-full h-10" />
          </div>
        </div>
      </div>
    ));
  };

  return (
    <>
      <Helmet>
        <title>{getPageTitle()}</title>
        <meta name="description" content={getPageDescription()} />
        <meta property="og:title" content={getPageTitle()} />
        <meta property="og:description" content={getPageDescription()} />
        <meta property="og:type" content="website" />
      </Helmet>

      <section className="py-8 bg-neutral">
        <div className="container mx-auto px-4 md:px-6">
          <div className="text-center mb-8">
            {searchQuery ? (
              <>
                <h1 className="text-3xl font-bold text-gray-800 mb-2 font-heading">
                  Search Results for "{searchQuery}"
                </h1>
                <p className="text-gray-600">
                  Showing products matching your search
                </p>
              </>
            ) : (
              <>
                <h1 className="text-3xl font-bold text-gray-800 mb-2 font-heading">
                  {currentCategory ? currentCategory.name : "All Products"}
                </h1>
                <p className="text-gray-600">
                  {currentCategory
                    ? currentCategory.description
                    : "Browse our complete selection of premium halal chicken products"}
                </p>
              </>
            )}
          </div>

          {/* Category Tabs */}
          {!searchQuery && <CategoryTabs active={categorySlug || "all"} />}

          {/* Search results clear button */}
          {searchQuery && (
            <div className="mb-6 flex justify-center">
              <Button
                variant="outline"
                onClick={() => window.location.href = "/products"}
              >
                Clear search and show all products
              </Button>
            </div>
          )}

          {/* Products Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mt-6">
            {isLoading ? (
              renderSkeletons()
            ) : products && products.length > 0 ? (
              products.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))
            ) : (
              <div className="col-span-full text-center py-12">
                <h3 className="text-xl font-bold mb-2">No products found</h3>
                <p className="text-gray-600 mb-4">
                  {searchQuery
                    ? `We couldn't find any products matching "${searchQuery}"`
                    : "There are no products in this category yet"}
                </p>
                {searchQuery && (
                  <Button
                    onClick={() => window.location.href = "/products"}
                    className="bg-primary hover:bg-primary-dark text-white"
                  >
                    View All Products
                  </Button>
                )}
              </div>
            )}
          </div>
        </div>
      </section>
    </>
  );
}

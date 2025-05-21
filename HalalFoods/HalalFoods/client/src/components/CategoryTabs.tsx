import { useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Category } from "@/lib/types";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Skeleton } from "@/components/ui/skeleton";
import { useLocation } from "wouter";

interface CategoryTabsProps {
  active?: string;
  onChange?: (slug: string) => void;
}

const CategoryTabs = ({ active, onChange }: CategoryTabsProps) => {
  const [, navigate] = useLocation();
  const [activeCategory, setActiveCategory] = useState<string>(active || "all");
  
  const { data: categories, isLoading } = useQuery<Category[]>({
    queryKey: ["/api/categories"],
  });

  useEffect(() => {
    if (active) {
      setActiveCategory(active);
    }
  }, [active]);

  const handleCategoryChange = (slug: string) => {
    setActiveCategory(slug);
    
    if (onChange) {
      onChange(slug);
    } else {
      if (slug === "all") {
        navigate("/products");
      } else {
        navigate(`/products/category/${slug}`);
      }
    }
  };

  if (isLoading) {
    return (
      <div className="w-full overflow-x-auto pb-2">
        <Skeleton className="h-10 w-full" />
      </div>
    );
  }

  return (
    <div className="w-full overflow-x-auto pb-2">
      <Tabs value={activeCategory} onValueChange={handleCategoryChange} className="w-max">
        <TabsList className="bg-muted/50">
          <TabsTrigger 
            value="all"
            className="text-base py-2 px-4 data-[state=active]:bg-primary data-[state=active]:text-white"
          >
            All Products
          </TabsTrigger>
          
          {categories?.map((category) => (
            <TabsTrigger 
              key={category.id} 
              value={category.slug}
              className="text-base py-2 px-4 data-[state=active]:bg-primary data-[state=active]:text-white"
            >
              {category.name}
            </TabsTrigger>
          ))}
        </TabsList>
      </Tabs>
    </div>
  );
};

export default CategoryTabs;

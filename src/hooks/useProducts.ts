import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/lib/supabase";
import { Product, products as mockProducts } from "@/data/products";

export const useProducts = () => {
  return useQuery({
    queryKey: ["products"],
    queryFn: async (): Promise<Product[]> => {
      try {
        const { data, error } = await supabase
          .from("products")
          .select("*")
          .order("created_at", { ascending: false });

        if (error) {
          console.warn("Supabase Error, using mock data:", error.message);
          return mockProducts;
        }

        return data && data.length > 0 ? data : mockProducts;
      } catch (error) {
        console.warn("Failed to fetch from Supabase, using mock data:", error);
        return mockProducts;
      }
    },
    initialData: mockProducts,
  });
};

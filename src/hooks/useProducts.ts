import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/lib/supabase";
import { Product } from "@/data/products";

// Hook mẫu để lấy dữ liệu từ bảng 'products' trên Supabase
// Bạn có thể dùng cách tương tự cho categories, users, v.v.
export const useProducts = () => {
  return useQuery({
    queryKey: ["products"],
    queryFn: async (): Promise<Product[]> => {
      // Gọi API Supabase để lấy toàn bộ products
      const { data, error } = await supabase
        .from("products")
        .select("*");
      
      if (error) {
        console.error("Supabase Error:", error.message);
        throw new Error(error.message);
      }
      
      return data as Product[];
    },
    // Nếu chưa có kết nối Supabase thật, bạn có thể uncomment dòng dưới đây
    // để fallback về data mock tạm thời trong quá trình dev:
    // initialData: () => import("@/data/products").then(m => m.products),
  });
};

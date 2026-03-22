import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/lib/supabase";
import { Package, ShoppingBag, TrendingUp, DollarSign } from "lucide-react";
import { useAuth } from "@/contexts/useAuth";

const DashboardPage = () => {
  const user = useAuth();

  const { data: products } = useQuery({
    queryKey: ["admin-products-count"],
    queryFn: async () => {
      const { count, error } = await supabase
        .from("products")
        .select("*", { count: "exact", head: true });
      if (error) throw error;
      return count || 0;
    },
  });

  const stats = [
    {
      label: "Tổng sản phẩm",
      value: products || 0,
      icon: Package,
      color: "bg-blue-500",
    },
    {
      label: "Đơn hàng",
      value: 0,
      icon: ShoppingBag,
      color: "bg-purple-500",
    },
    {
      label: "Doanh thu",
      value: "0₫",
      icon: DollarSign,
      color: "bg-green-500",
    },
    {
      label: "Tăng trưởng",
      value: "0%",
      icon: TrendingUp,
      color: "bg-orange-500",
    },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-foreground">Dashboard</h1>
        <p className="text-muted-foreground">Xin chào, {user?.name || "Admin"}!</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat) => (
          <div
            key={stat.label}
            className="bg-white rounded-xl p-6 shadow-sm border"
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">{stat.label}</p>
                <p className="text-2xl font-bold mt-1">{stat.value}</p>
              </div>
              <div className={`${stat.color} p-3 rounded-lg`}>
                <stat.icon className="h-6 w-6 text-white" />
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="bg-white rounded-xl p-6 shadow-sm border">
        <h2 className="text-lg font-semibold mb-4">Chào mừng đến Admin Panel</h2>
        <p className="text-muted-foreground">
          Quản lý cửa hàng cây cảnh của bạn. Sử dụng menu bên trái để điều hướng.
        </p>
        <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-4">
          <a
            href="/admin/products"
            className="p-4 border rounded-lg hover:bg-gray-50 transition-colors"
          >
            <Package className="h-8 w-8 text-primary mb-2" />
            <h3 className="font-medium">Quản lý sản phẩm</h3>
            <p className="text-sm text-muted-foreground">
              Thêm, sửa, xóa sản phẩm
            </p>
          </a>
          <a
            href="/"
            className="p-4 border rounded-lg hover:bg-gray-50 transition-colors"
          >
            <ShoppingBag className="h-8 w-8 text-primary mb-2" />
            <h3 className="font-medium">Xem cửa hàng</h3>
            <p className="text-sm text-muted-foreground">
              Xem trang web của bạn
            </p>
          </a>
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;

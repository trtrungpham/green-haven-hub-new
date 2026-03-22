import { products } from "@/data/products";
import ProductCard from "./ProductCard";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";

const BestSellers = () => (
  <section className="py-12 md:py-16 bg-gradient-earth">
    <div className="container mx-auto px-4">
      <div className="flex items-end justify-between mb-10">
        <div>
          <h2 className="font-display text-2xl md:text-3xl font-semibold text-foreground">Bán chạy nhất</h2>
          <p className="text-muted-foreground mt-1">Được yêu thích bởi hàng ngàn khách hàng</p>
        </div>
        <Button variant="link" asChild className="hidden md:flex">
          <Link to="/products">Xem tất cả <ArrowRight className="ml-1 h-4 w-4" /></Link>
        </Button>
      </div>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
        {products.slice(0, 8).map((p, i) => (
          <ProductCard key={p.id} product={p} index={i} />
        ))}
      </div>
      <div className="mt-8 text-center md:hidden">
        <Button variant="outline" asChild>
          <Link to="/products">Xem tất cả sản phẩm</Link>
        </Button>
      </div>
    </div>
  </section>
);

export default BestSellers;

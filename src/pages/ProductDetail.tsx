import { useParams, Link } from "react-router-dom";
import { products, formatPrice } from "@/data/products";
import AnnouncementBar from "@/components/AnnouncementBar";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ChatButton from "@/components/ChatButton";
import ProductCard from "@/components/ProductCard";
import { Button } from "@/components/ui/button";
import { ShoppingCart, Droplets, Sun, PawPrint, ChevronLeft } from "lucide-react";
import { useState } from "react";

import NotFound from "./NotFound";

const bundleOptions = [
  { id: "plant", label: "Chỉ lấy cây", priceAdd: 0 },
  { id: "plant-pot", label: "Cây + Chậu gốm", priceAdd: 120000 },
  { id: "plant-pot-soil", label: "Cây + Chậu + Đất dinh dưỡng", priceAdd: 180000 },
];

const ProductDetail = () => {
  const { slug } = useParams();
  const product = products.find((p) => p.slug === slug);
  const [bundle, setBundle] = useState("plant");

  if (!product) {
    return <NotFound />;
  }

  const selectedBundle = bundleOptions.find((b) => b.id === bundle)!;
  const totalPrice = product.price + selectedBundle.priceAdd;
  const related = products.filter((p) => p.id !== product.id && p.category === product.category).slice(0, 4);

  return (
    <div className="min-h-screen">
      <AnnouncementBar />
      <Header />
      <div className="container mx-auto px-4 py-8">
        <Link to="/products" className="inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-primary mb-6">
          <ChevronLeft className="h-4 w-4" /> Quay lại danh mục
        </Link>

        <div className="grid md:grid-cols-2 gap-8 lg:gap-12">
          {/* Image */}
          <div className="rounded-2xl overflow-hidden bg-card shadow-soft">
            <img src={product.image} alt={product.name} className="w-full aspect-square object-cover" />
          </div>

          {/* Info */}
          <div>
            <h1 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-2">{product.name}</h1>
            <p className="text-muted-foreground mb-6">{product.short_desc}</p>

            <div className="flex items-baseline gap-3 mb-6">
              <span className="text-3xl font-bold text-primary">{formatPrice(totalPrice)}</span>
              {product.original_price && bundle === "plant" && (
                <span className="text-lg text-muted-foreground line-through">{formatPrice(product.original_price)}</span>
              )}
            </div>

            {/* Care Card */}
            <div className="bg-card rounded-xl p-5 shadow-soft mb-6">
              <h3 className="font-display font-semibold text-foreground mb-3">Hướng dẫn chăm sóc</h3>
              <div className="grid grid-cols-3 gap-4 text-center">
                <div className="flex flex-col items-center gap-1.5">
                  <Droplets className="h-6 w-6 text-blue-500" />
                  <span className="text-xs text-muted-foreground">Tưới nước</span>
                  <span className="text-sm font-medium text-foreground">{product.water}</span>
                </div>
                <div className="flex flex-col items-center gap-1.5">
                  <Sun className="h-6 w-6 text-gold" />
                  <span className="text-xs text-muted-foreground">Ánh sáng</span>
                  <span className="text-sm font-medium text-foreground">
                    {product.light === "direct" ? "Nắng trực tiếp" : product.light === "indirect" ? "Tán xạ" : "Bóng râm"}
                  </span>
                </div>
                <div className="flex flex-col items-center gap-1.5">
                  <PawPrint className="h-6 w-6 text-terracotta" />
                  <span className="text-xs text-muted-foreground">Thú cưng</span>
                  <span className="text-sm font-medium text-foreground">
                    {product.pet_safe ? "An toàn ✅" : "Cẩn thận ⚠️"}
                  </span>
                </div>
              </div>
            </div>

            {/* Bundle Select */}
            <div className="mb-6">
              <label className="text-sm font-medium text-foreground mb-2 block">Lựa chọn đi kèm</label>
              <div className="space-y-2">
                {bundleOptions.map((opt) => (
                  <label
                    key={opt.id}
                    className={`flex items-center justify-between p-3 rounded-lg border cursor-pointer transition-colors ${
                      bundle === opt.id ? "border-primary bg-accent" : "border-border hover:border-primary/30"
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <input
                        type="radio"
                        name="bundle"
                        value={opt.id}
                        checked={bundle === opt.id}
                        onChange={(e) => setBundle(e.target.value)}
                        className="accent-primary"
                      />
                      <span className="text-sm text-foreground">{opt.label}</span>
                    </div>
                    {opt.priceAdd > 0 && (
                      <span className="text-sm text-muted-foreground">+{formatPrice(opt.priceAdd)}</span>
                    )}
                  </label>
                ))}
              </div>
            </div>

            <Button variant="hero" size="lg" className="w-full mb-4">
              <ShoppingCart className="h-5 w-5 mr-2" />
              Thêm vào giỏ hàng — {formatPrice(totalPrice)}
            </Button>

            {/* Description */}
            <div className="mt-8">
              <h3 className="font-display font-semibold text-foreground mb-3">Mô tả sản phẩm</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">{product.description}</p>
            </div>
          </div>
        </div>

        {/* Related Products */}
        {related.length > 0 && (
          <div className="mt-16">
            <h2 className="font-display text-2xl font-semibold text-foreground mb-6">Sản phẩm tương tự</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
              {related.map((p, i) => (
                <ProductCard key={p.id} product={p} index={i} />
              ))}
            </div>
          </div>
        )}
      </div>
      <Footer />
      <ChatButton />
    </div>
  );
};

export default ProductDetail;

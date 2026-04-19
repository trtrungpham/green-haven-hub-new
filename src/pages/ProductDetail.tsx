import { useParams, Link } from "react-router-dom";
import { useState } from "react";
import { products, formatPrice } from "@/data/products";
import AnnouncementBar from "@/components/AnnouncementBar";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ChatBot from "@/components/ChatBot";
import ProductCard from "@/components/ProductCard";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { 
  ShoppingCart, Share2, ChevronLeft, Truck, Shield, Star, 
  MessageCircle, Plus, Minus, Heart, Check, Store, Clock, Leaf
} from "lucide-react";

const bundleOptions = [
  { id: "plant", label: "Chỉ lấy cây", priceAdd: 0 },
  { id: "plant-pot", label: "Cây + Chậu gốm", priceAdd: 120000 },
  { id: "plant-pot-soil", label: "Cây + Chậu + Đất dinh dưỡng", priceAdd: 180000 },
];

const reviewImages = [
  "https://picsum.photos/seed/review1/200",
  "https://picsum.photos/seed/review2/200",
  "https://picsum.photos/seed/review3/200",
];

const reviews = [
  { name: "Nguyễn***", rating: 5, date: "15/04/2026", content: "Cây đẹp, giao hàng nhanh chóng! Đóng gói cẩn thận, cây không bị hư gì. Shop uy tín 👍", images: ["img1", "img2"] },
  { name: "Trần***", rating: 5, date: "14/04/2026", content: "Tuyệt vời! Cây Monstera đẹp hơn trong hình. Lá xanh mượt, rất khỏe. Giao đúng ngày luôn!", images: ["img1"] },
  { name: "Lê***", rating: 5, date: "12/04/2026", content: "Mua lần 2 rồi, lần nào cũng okie. Shop chăm sóc khách hàng cực tốt. Đề xuất mọi người nên mua ở đây!", images: ["img1", "img2", "img3"] },
];

const ProductDetail = () => {
  const { slug } = useParams();
  const product = products.find((p) => p.slug === slug);
  const [bundle, setBundle] = useState("plant");
  const [quantity, setQuantity] = useState(1);

  if (!product) return <NotFound />;

  const selectedBundle = bundleOptions.find((b) => b.id === bundle)!;
  const totalPrice = product.price + selectedBundle.priceAdd;
  const related = products.filter((p) => p.id !== product.id).slice(0, 10);

  return (
    <div className="min-h-screen bg-gray-50 pb-20">
      {/* Sticky Header */}
      <div className="sticky top-0 z-50 bg-white border-b">
        <div className="flex items-center justify-between px-4 py-3">
          <Link to="/products" className="p-2 -ml-2 hover:bg-gray-100 rounded-full">
            <ChevronLeft className="h-6 w-6" />
          </Link>
          <div className="flex items-center gap-1">
            <Button variant="ghost" size="icon" className="rounded-full">
              <Share2 className="h-5 w-5" />
            </Button>
            <Link to="/cart" className="p-2 hover:bg-gray-100 rounded-full relative">
              <ShoppingCart className="h-5 w-5" />
            </Link>
          </div>
        </div>
      </div>

      {/* Main Image */}
      <div className="bg-white">
        <div className="aspect-square relative overflow-hidden">
          <img src={product.image} alt={product.name} className="w-full h-full object-cover" />
          <Button variant="ghost" size="icon" className="absolute top-4 right-4 bg-white/80 backdrop-blur rounded-full shadow">
            <Heart className="h-5 w-5" />
          </Button>
        </div>
      </div>

      {/* Price Section */}
      <div className="bg-white px-4 py-3 border-b">
        <div className="flex items-baseline gap-2">
          <span className="text-2xl font-bold text-red-500">{formatPrice(totalPrice)}</span>
          {product.original_price && (
            <span className="text-base text-gray-400 line-through">{formatPrice(product.original_price)}</span>
          )}
        </div>
        <div className="flex items-center gap-2 mt-1">
          <span className="text-xs font-medium text-red-500">✓ Giảm 18%</span>
        </div>
      </div>

      {/* Shipping */}
      <div className="bg-white px-4 py-3 border-b">
        <div className="flex items-center gap-2 text-sm">
          <Truck className="h-4 w-4 text-green-600" />
          <span className="text-green-600 font-medium">Miễn phí vận chuyển</span>
        </div>
      </div>

      {/* Bundle Options */}
      <div className="bg-white px-4 py-3 border-b">
        <p className="text-sm font-medium mb-2">Chọn combo:</p>
        <div className="space-y-2">
          {bundleOptions.map((option) => (
            <button
              key={option.id}
              onClick={() => setBundle(option.id)}
              className={`w-full flex items-center justify-between p-3 rounded-lg border-2 transition-all ${
                bundle === option.id 
                  ? "border-red-500 bg-red-50" 
                  : "border-gray-200 hover:border-gray-300"
              }`}
            >
              <span className={`font-medium ${bundle === option.id ? "text-red-600" : "text-gray-700"}`}>
                {option.label}
              </span>
              <span className={`text-sm ${bundle === option.id ? "text-red-600" : "text-gray-500"}`}>
                {option.priceAdd > 0 ? `+${formatPrice(option.priceAdd)}` : ""}
              </span>
              {bundle === option.id && (
                <Check className="h-5 w-5 text-red-500" />
              )}
            </button>
          ))}
        </div>
      </div>

      {/* Good Product Banner */}
      <div className="bg-gradient-to-r from-amber-100 to-yellow-100 px-4 py-3 mx-4 mt-4 rounded-xl">
        <div className="flex items-center gap-2">
          <Shield className="h-5 w-5 text-amber-500" />
          <span className="text-amber-700 font-medium">Sản phẩm tốt - Đã kiểm duyệt</span>
        </div>
      </div>

      {/* Voucher */}
      <div className="bg-white px-4 py-3 border-b mt-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="text-sm font-medium"> voucher</span>
            <span className="text-xs bg-red-100 text-red-600 px-2 py-0.5 rounded">GIẢM 10K</span>
          </div>
          <Button variant="link" className="text-red-500 h-auto p-0">Lưu</Button>
        </div>
      </div>

      {/* Reviews */}
      <div className="bg-white px-4 py-3 border-b mt-4">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2">
            <span className="font-medium">Đánh giá</span>
            <span className="text-sm text-gray-500">(378)</span>
          </div>
          <Button variant="link" className="text-red-500 h-auto p-0">Xem tất cả</Button>
        </div>
        
        {/* Rating Summary */}
        <div className="flex items-center gap-2 mb-3">
          <div className="flex">
            {[1,2,3,4,5].map((star) => (
              <Star key={star} className={`h-4 w-4 ${star <= 5 ? "fill-amber-400 text-amber-400" : "text-gray-300"}`} />
            ))}
          </div>
          <span className="text-sm text-gray-500">5.0</span>
        </div>

        {/* Review Images */}
        <div className="flex gap-2 overflow-x-auto pb-2">
          {reviewImages.map((img, i) => (
            <img key={i} src={img} alt={`review ${i+1}`} className="w-16 h-16 rounded-lg object-cover flex-shrink-0" />
          ))}
        </div>

        {/* Sample Reviews */}
        <div className="space-y-4 mt-4">
          {reviews.slice(0, 3).map((review, i) => (
            <div key={i} className="border-b pb-3 last:border-0">
              <div className="flex items-center gap-2 mb-1">
                <div className="w-6 h-6 bg-gray-200 rounded-full flex items-center justify-center text-xs font-medium">
                  {review.name[0]}
                </div>
                <span className="text-sm font-medium">{review.name}</span>
                <Star className="h-3 w-3 fill-amber-400 text-amber-400" />
                <Star className="h-3 w-3 fill-amber-400 text-amber-400" />
                <Star className="h-3 w-3 fill-amber-400 text-amber-400" />
                <Star className="h-3 w-3 fill-amber-400 text-amber-400" />
                <Star className="h-3 w-3 fill-amber-400 text-amber-400" />
              </div>
              <p className="text-sm text-gray-600 line-clamp-2">{review.content}</p>
              <p className="text-xs text-gray-400 mt-1">{review.date}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Product Description */}
      <div className="bg-white px-4 py-3 border-b mt-4">
        <h3 className="font-medium mb-2">Thông tin sản phẩm</h3>
        <p className="text-sm text-gray-600">{product.description}</p>
        <div className="mt-3 space-y-1 text-sm">
          <p><span className="text-gray-500">Loại:</span> {product.category}</p>
          <p><span className="text-gray-500">Ánh sáng:</span> {product.light}</p>
          <p><span className="text-gray-500">Cách chăm sóc:</span> {product.care}</p>
        </div>
      </div>

      {/* Related Products - Vertical/Staggered - 10 items */}
      <div className="px-4 py-4">
        <h3 className="font-medium mb-3">Sản phẩm tương tự</h3>
        <div className="grid grid-cols-2 gap-3">
          {related.map((p) => (
            <Link key={p.id} to={`/product/${p.slug}`} className="block">
              <div className="bg-white rounded-xl overflow-hidden shadow-sm">
                <img src={p.image} alt={p.name} className="w-full aspect-square object-cover" />
                <div className="p-2">
                  <p className="text-sm font-medium line-clamp-2">{p.name}</p>
                  <p className="text-red-500 font-bold">{formatPrice(p.price)}</p>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>

      {/* Shop Info - At the bottom as original */}
      <div className="bg-white px-4 py-4 border-t mt-4">
        <div className="flex items-center gap-3 py-2">
          <div className="w-14 h-14 bg-gradient-to-r from-red-500 to-rose-500 rounded-xl flex items-center justify-center text-white font-bold text-lg">
            VX
          </div>
          <div className="flex-1">
            <p className="font-semibold text-lg">Vườn Xanh Shop</p>
            <div className="flex items-center gap-1 text-xs text-gray-500">
              <Clock className="h-3 w-3" />
              <span>Online 4 phút trước</span>
            </div>
          </div>
          <Button className="bg-red-500 hover:bg-red-600 border-0">
            <MessageCircle className="h-4 w-4 mr-1" />
            Chat
          </Button>
        </div>
      </div>

      {/* Shop Full Info - Like old website */}
      <div className="bg-white px-4 py-6 border-t mt-4 space-y-4">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 bg-gradient-to-r from-red-500 to-rose-500 rounded-lg flex items-center justify-center">
            <Leaf className="h-4 w-4 text-white" />
          </div>
          <span className="font-semibold">Vườn Xanh</span>
        </div>
        <p className="text-sm text-gray-500 leading-relaxed">
          Mang thiên nhiên vào không gian sống của bạn. Cây cảnh chất lượng, giao hàng tận nơi.
        </p>
        
        <div className="grid grid-cols-2 gap-4 text-sm">
          <div>
            <h4 className="font-medium mb-2">Danh mục</h4>
            <div className="space-y-1 text-gray-500 text-xs">
              <p>Cây để bàn</p>
              <p>Cây đại sảnh</p>
              <p>Sen đá</p>
              <p>Quà tặng</p>
            </div>
          </div>
          <div>
            <h4 className="font-medium mb-2">Chính sách</h4>
            <div className="space-y-1 text-gray-500 text-xs">
              <p>Đổi trả 7 ngày nếu cây héo</p>
              <p>Bảo hành 30 ngày cho chậu</p>
              <p>Miễn phí ship từ 500k</p>
            </div>
          </div>
        </div>

        <div className="text-sm text-gray-500">
          <h4 className="font-medium mb-2">Liên hệ</h4>
          <p className="text-xs">123 Nguyễn Văn Cừ, Q.5, TP.HCM</p>
          <p className="text-xs">0901 234 567</p>
          <p className="text-xs">hello@vuonxanh.vn</p>
          <p className="text-xs">8:00 - 18:00 (T2-CN)</p>
        </div>
      </div>

      {/* Bottom Action Bar - Fixed - Red Buy Button */}
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t px-4 py-3 flex items-center gap-3 z-50">
        <Button variant="outline" size="icon" className="rounded-full border-gray-300">
          <MessageCircle className="h-5 w-5" />
        </Button>
        <Link to="/cart" className="flex-1">
          <Button variant="outline" className="w-full rounded-full border-red-500 text-red-500">
            <ShoppingCart className="h-4 w-4 mr-2" />
            Giỏ hàng
          </Button>
        </Link>
        <Button className="flex-[2] rounded-full bg-red-500 hover:bg-red-600 border-0">
          Mua ngay
        </Button>
      </div>

      <ChatBot />
    </div>
  );
};

function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <p>Không tìm thấy sản phẩm</p>
    </div>
  );
}

export default ProductDetail;
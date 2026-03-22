import { useState } from "react";
import AnnouncementBar from "@/components/AnnouncementBar";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ChatBot from "@/components/ChatBot";
import { Button } from "@/components/ui/button";
import { formatPrice } from "@/data/products";
import { Trash2, Gift, Truck, Calendar } from "lucide-react";
import { Link } from "react-router-dom";

const Cart = () => {
  const [giftNote, setGiftNote] = useState("");
  const [deliveryTime, setDeliveryTime] = useState("anytime");

  // Static empty cart for now
  return (
    <div className="min-h-screen">
      <AnnouncementBar />
      <Header />
      <div className="container mx-auto px-4 py-8">
        <h1 className="font-display text-3xl font-bold text-foreground mb-8">Giỏ hàng</h1>

        <div className="text-center py-20">
          <p className="text-muted-foreground text-lg mb-4">Giỏ hàng trống</p>
          <Button variant="hero" asChild>
            <Link to="/products">Khám phá cây cảnh</Link>
          </Button>
        </div>

        {/* Gift & Delivery options (visible when cart has items) */}
        <div className="hidden max-w-lg mx-auto space-y-6 mt-8">
          <div className="bg-card rounded-xl p-5 shadow-soft">
            <div className="flex items-center gap-2 mb-3">
              <Gift className="h-5 w-5 text-terracotta" />
              <h3 className="font-display font-semibold text-foreground">Ghi chú quà tặng</h3>
            </div>
            <textarea
              value={giftNote}
              onChange={(e) => setGiftNote(e.target.value)}
              placeholder="Nhập nội dung thiệp tặng..."
              className="w-full rounded-lg border border-border bg-background px-3 py-2 text-sm resize-none h-20 focus:ring-2 focus:ring-ring"
            />
          </div>

          <div className="bg-card rounded-xl p-5 shadow-soft">
            <div className="flex items-center gap-2 mb-3">
              <Calendar className="h-5 w-5 text-primary" />
              <h3 className="font-display font-semibold text-foreground">Thời gian giao hàng</h3>
            </div>
            <select
              value={deliveryTime}
              onChange={(e) => setDeliveryTime(e.target.value)}
              className="w-full rounded-lg border border-border bg-background px-3 py-2 text-sm focus:ring-2 focus:ring-ring"
            >
              <option value="anytime">Bất kỳ lúc nào</option>
              <option value="weekend">Cuối tuần (T7-CN)</option>
              <option value="morning">Sáng (8:00-12:00)</option>
              <option value="afternoon">Chiều (13:00-18:00)</option>
            </select>
          </div>
        </div>
      </div>
      <Footer />
      <ChatBot />
    </div>
  );
};

export default Cart;

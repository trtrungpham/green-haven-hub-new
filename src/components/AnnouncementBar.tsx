import { Truck } from "lucide-react";

const AnnouncementBar = () => (
  <div className="bg-gradient-forest py-2.5 px-4 text-center">
    <p className="text-sm font-medium text-primary-foreground flex items-center justify-center gap-2">
      <Truck className="h-4 w-4" />
      Miễn phí vận chuyển nội thành cho đơn hàng từ 500.000₫ 🌿
    </p>
  </div>
);

export default AnnouncementBar;

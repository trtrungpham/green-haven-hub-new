import { Leaf, MapPin, Phone, Mail, Clock } from "lucide-react";
import { Link } from "react-router-dom";

const Footer = () => (
  <footer className="bg-foreground text-primary-foreground">
    <div className="container mx-auto px-4 py-12 md:py-16">
      <div className="grid md:grid-cols-4 gap-8">
        <div>
          <div className="flex items-center gap-2 mb-4">
            <Leaf className="h-6 w-6" />
            <span className="font-display text-lg font-bold">Vườn Xanh</span>
          </div>
          <p className="text-sm text-primary-foreground/70 leading-relaxed">
            Mang thiên nhiên vào không gian sống của bạn. Cây cảnh chất lượng, giao hàng tận nơi.
          </p>
        </div>

        <div>
          <h4 className="font-display font-semibold mb-4">Danh mục</h4>
          <div className="space-y-2 text-sm text-primary-foreground/70">
            <Link to="/products" className="block hover:text-primary-foreground transition-colors">Cây để bàn</Link>
            <Link to="/products" className="block hover:text-primary-foreground transition-colors">Cây đại sảnh</Link>
            <Link to="/products" className="block hover:text-primary-foreground transition-colors">Sen đá</Link>
            <Link to="/products" className="block hover:text-primary-foreground transition-colors">Quà tặng</Link>
          </div>
        </div>

        <div>
          <h4 className="font-display font-semibold mb-4">Chính sách</h4>
          <div className="space-y-2 text-sm text-primary-foreground/70">
            <p>Đổi trả trong 7 ngày nếu cây héo do vận chuyển</p>
            <p>Bảo hành 30 ngày cho chậu gốm</p>
            <p>Miễn phí ship nội thành từ 500k</p>
          </div>
        </div>

        <div>
          <h4 className="font-display font-semibold mb-4">Liên hệ</h4>
          <div className="space-y-3 text-sm text-primary-foreground/70">
            <div className="flex items-start gap-2">
              <MapPin className="h-4 w-4 mt-0.5 shrink-0" />
              <span>123 Nguyễn Văn Cừ, Q.5, TP.HCM</span>
            </div>
            <div className="flex items-center gap-2">
              <Phone className="h-4 w-4 shrink-0" />
              <span>0901 234 567</span>
            </div>
            <div className="flex items-center gap-2">
              <Mail className="h-4 w-4 shrink-0" />
              <span>hello@vuonxanh.vn</span>
            </div>
            <div className="flex items-center gap-2">
              <Clock className="h-4 w-4 shrink-0" />
              <span>8:00 - 18:00 (T2-CN)</span>
            </div>
          </div>
        </div>
      </div>

      <div className="border-t border-primary-foreground/10 mt-10 pt-6 text-center text-xs text-primary-foreground/50">
        © 2026 Vườn Xanh. Tất cả quyền được bảo lưu.
      </div>
    </div>
  </footer>
);

export default Footer;

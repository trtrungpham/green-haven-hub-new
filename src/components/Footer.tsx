import { Leaf, MapPin, Phone, Mail, Clock } from "lucide-react";
import { Link } from "react-router-dom";

const Footer = () => (
  <footer className="bg-white text-gray-800 border-t">
    <div className="container mx-auto px-4 py-8">
      <div className="grid md:grid-cols-4 gap-6">
        <div>
          <div className="flex items-center gap-2 mb-3">
            <div className="w-8 h-8 bg-gradient-to-r from-red-500 to-rose-500 rounded-lg flex items-center justify-center">
              <Leaf className="h-4 w-4 text-white" />
            </div>
            <span className="font-semibold text-base">Vườn Xanh</span>
          </div>
          <p className="text-xs text-gray-500 leading-relaxed">
            Mang thiên nhiên vào không gian sống của bạn. Cây cảnh chất lượng, giao hàng tận nơi.
          </p>
        </div>

        <div>
          <h4 className="font-semibold mb-3 text-sm">Danh mục</h4>
          <div className="space-y-2 text-xs text-gray-500">
            <Link to="/products" className="block hover:text-red-500 transition-colors">Cây để bàn</Link>
            <Link to="/products" className="block hover:text-red-500 transition-colors">Cây đại sảnh</Link>
            <Link to="/products" className="block hover:text-red-500 transition-colors">Sen đá</Link>
            <Link to="/products" className="block hover:text-red-500 transition-colors">Quà tặng</Link>
          </div>
        </div>

        <div>
          <h4 className="font-semibold mb-3 text-sm">Chính sách</h4>
          <div className="space-y-2 text-xs text-gray-500">
            <p>Đổi trả trong 7 ngày nếu cây héo do vận chuyển</p>
            <p>Bảo hành 30 ngày cho chậu gốm</p>
            <p>Miễn phí ship nội thành từ 500k</p>
          </div>
        </div>

        <div>
          <h4 className="font-semibold mb-3 text-sm">Liên hệ</h4>
          <div className="space-y-2 text-xs text-gray-500">
            <div className="flex items-start gap-2">
              <MapPin className="h-3 w-3 mt-0.5 shrink-0 text-red-500" />
              <span>123 Nguyễn Văn Cừ, Q.5, TP.HCM</span>
            </div>
            <div className="flex items-center gap-2">
              <Phone className="h-3 w-3 shrink-0 text-red-500" />
              <span>0901 234 567</span>
            </div>
            <div className="flex items-center gap-2">
              <Mail className="h-3 w-3 shrink-0 text-red-500" />
              <span>hello@vuonxanh.vn</span>
            </div>
            <div className="flex items-center gap-2">
              <Clock className="h-3 w-3 shrink-0 text-red-500" />
              <span>8:00 - 18:00 (T2-CN)</span>
            </div>
          </div>
        </div>
      </div>

      <div className="border-t border-gray-100 mt-6 pt-4 text-center text-xs text-gray-400">
        © 2026 Vườn Xanh. Tất cả quyền được bảo lưu.
      </div>
    </div>
  </footer>
);

export default Footer;
import { Star } from "lucide-react";
import { motion } from "framer-motion";

const testimonials = [
  {
    name: "Minh Anh",
    text: "Cây đóng gói rất cẩn thận, ship về vẫn tươi xanh. Sẽ mua thêm!",
    rating: 5,
    avatar: "MA",
  },
  {
    name: "Thanh Hà",
    text: "Mua cây Kim Tiền tặng sếp, được khen là có gu. Cảm ơn Vườn Xanh!",
    rating: 5,
    avatar: "TH",
  },
  {
    name: "Đức Phong",
    text: "Tư vấn nhiệt tình, gửi cả video cây thật trước khi giao. Rất uy tín.",
    rating: 5,
    avatar: "DP",
  },
];

const SocialProof = () => (
  <section className="py-12 md:py-16 bg-card">
    <div className="container mx-auto px-4">
      <h2 className="font-display text-2xl md:text-3xl font-semibold text-center mb-10 text-foreground">
        Khách hàng nói gì?
      </h2>
      <div className="grid md:grid-cols-3 gap-6 max-w-4xl mx-auto">
        {testimonials.map((t, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.15 }}
            className="bg-background rounded-xl p-6 shadow-soft"
          >
            <div className="flex gap-1 mb-3">
              {Array.from({ length: t.rating }).map((_, j) => (
                <Star key={j} className="h-4 w-4 fill-gold text-gold" />
              ))}
            </div>
            <p className="text-sm text-foreground mb-4 leading-relaxed">"{t.text}"</p>
            <div className="flex items-center gap-3">
              <div className="h-9 w-9 rounded-full bg-accent flex items-center justify-center text-xs font-semibold text-accent-foreground">
                {t.avatar}
              </div>
              <span className="text-sm font-medium text-foreground">{t.name}</span>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  </section>
);

export default SocialProof;

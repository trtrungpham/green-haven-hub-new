import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import heroImage from "@/assets/hero-plants.jpg";

const HeroSection = () => (
  <section className="relative overflow-hidden">
    <div className="absolute inset-0">
      <img src={heroImage} alt="Không gian sống xanh" className="w-full h-full object-cover" />
      <div className="absolute inset-0 bg-gradient-to-r from-foreground/70 via-foreground/40 to-transparent" />
    </div>
    <div className="container mx-auto px-4 relative z-10 py-24 md:py-36 lg:py-44">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="max-w-xl"
      >
        <h1 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold text-primary-foreground leading-tight mb-6">
          Mang rừng xanh vào căn hộ của bạn
        </h1>
        <p className="text-lg text-primary-foreground/80 mb-8 font-body">
          Khám phá bộ sưu tập cây cảnh được chọn lọc kỹ lưỡng, kèm hướng dẫn chăm sóc chi tiết cho mọi không gian sống.
        </p>
        <div className="flex gap-4">
          <Button variant="hero" size="lg" asChild>
            <Link to="/products">Mua ngay</Link>
          </Button>
          <Button variant="outline" size="lg" className="border-primary-foreground/30 text-primary-foreground bg-primary-foreground/10 hover:bg-primary-foreground/20 hover:text-primary-foreground" asChild>
            <Link to="/blog">Cẩm nang chăm sóc</Link>
          </Button>
        </div>
      </motion.div>
    </div>
  </section>
);

export default HeroSection;

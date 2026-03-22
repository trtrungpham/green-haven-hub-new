import { useState } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";

const elements = [
  { id: "kim", name: "Kim", emoji: "🥇", color: "bg-yellow-100 text-yellow-800", desc: "Cây lá tròn, màu trắng/vàng" },
  { id: "moc", name: "Mộc", emoji: "🌿", color: "bg-green-100 text-green-800", desc: "Cây lá xanh tươi, phát triển mạnh" },
  { id: "thuy", name: "Thủy", emoji: "💧", color: "bg-blue-100 text-blue-800", desc: "Cây thủy sinh, lá mềm mại" },
  { id: "hoa", name: "Hỏa", emoji: "🔥", color: "bg-red-100 text-red-800", desc: "Cây lá đỏ, hoa rực rỡ" },
  { id: "tho", name: "Thổ", emoji: "⛰️", color: "bg-amber-100 text-amber-800", desc: "Sen đá, xương rồng, cây mọng nước" },
];

const FengShuiSection = () => {
  const [selected, setSelected] = useState<string | null>(null);

  return (
    <section className="py-12 md:py-16">
      <div className="container mx-auto px-4">
        <div className="text-center mb-10">
          <h2 className="font-display text-2xl md:text-3xl font-semibold text-foreground">
            🧭 Tìm cây theo mệnh của bạn
          </h2>
          <p className="text-muted-foreground mt-2">Chọn mệnh phong thủy để xem cây phù hợp</p>
        </div>

        <div className="flex flex-wrap justify-center gap-3 md:gap-4 mb-8">
          {elements.map((el) => (
            <button
              key={el.id}
              onClick={() => setSelected(selected === el.id ? null : el.id)}
              className={`flex items-center gap-2 px-5 py-3 rounded-full text-sm font-medium transition-all duration-200 ${
                selected === el.id
                  ? "bg-primary text-primary-foreground shadow-card scale-105"
                  : "bg-card text-foreground shadow-soft hover:shadow-card"
              }`}
            >
              <span className="text-lg">{el.emoji}</span>
              {el.name}
            </button>
          ))}
        </div>

        <AnimatePresence mode="wait">
          {selected && (
            <motion.div
              key={selected}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="text-center"
            >
              <p className="text-muted-foreground mb-4">
                {elements.find((e) => e.id === selected)?.desc}
              </p>
              <Link
                to={`/products?element=${selected}`}
                className="inline-flex items-center gap-2 text-primary font-medium hover:underline"
              >
                Xem cây phù hợp mệnh {elements.find((e) => e.id === selected)?.name} →
              </Link>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
};

export default FengShuiSection;

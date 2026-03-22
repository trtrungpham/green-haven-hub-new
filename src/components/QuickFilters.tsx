import { Link } from "react-router-dom";
import { motion } from "framer-motion";

const filters = [
  { icon: "🌱", label: "Cây để bàn", slug: "desk" },
  { icon: "🌳", label: "Cây đại sảnh", slug: "lobby" },
  { icon: "🌵", label: "Sen đá", slug: "succulent" },
  { icon: "🎁", label: "Quà tặng", slug: "gift" },
];

const QuickFilters = () => (
  <section className="py-12 md:py-16">
    <div className="container mx-auto px-4">
      <h2 className="font-display text-2xl md:text-3xl font-semibold text-center mb-10 text-foreground">
        Bạn đang tìm gì?
      </h2>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6 max-w-2xl mx-auto">
        {filters.map((f, i) => (
          <motion.div
            key={f.slug}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.1 }}
          >
            <Link
              to={`/products?category=${f.slug}`}
              className="flex flex-col items-center gap-3 p-6 rounded-2xl bg-card hover:bg-accent transition-colors shadow-soft hover:shadow-card group"
            >
              <span className="text-4xl group-hover:scale-110 transition-transform">{f.icon}</span>
              <span className="text-sm font-medium text-foreground">{f.label}</span>
            </Link>
          </motion.div>
        ))}
      </div>
    </div>
  </section>
);

export default QuickFilters;

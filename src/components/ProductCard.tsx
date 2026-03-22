import { ShoppingCart } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { Product, formatPrice } from "@/data/products";
import { motion } from "framer-motion";

interface ProductCardProps {
  product: Product;
  index?: number;
}

const ProductCard = ({ product, index = 0 }: ProductCardProps) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ delay: index * 0.1 }}
    className="group"
  >
    <Link to={`/product/${product.slug}`} className="block">
      <div className="relative overflow-hidden rounded-xl bg-card shadow-soft hover:shadow-card transition-all duration-300">
        <div className="aspect-[3/4] overflow-hidden">
          <img
            src={product.image}
            alt={product.name}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
            loading="lazy"
          />
        </div>
        {product.originalPrice && (
          <span className="absolute top-3 left-3 bg-terracotta text-primary-foreground text-xs font-semibold px-2.5 py-1 rounded-full">
            -{Math.round((1 - product.price / product.originalPrice) * 100)}%
          </span>
        )}
        <div className="p-4">
          <h3 className="font-display text-base font-semibold text-foreground mb-1">{product.name}</h3>
          <p className="text-xs text-muted-foreground mb-3">{product.shortDesc}</p>
          <div className="flex items-center justify-between">
            <div className="flex items-baseline gap-2">
              <span className="text-lg font-bold text-primary">{formatPrice(product.price)}</span>
              {product.originalPrice && (
                <span className="text-sm text-muted-foreground line-through">{formatPrice(product.originalPrice)}</span>
              )}
            </div>
            <Button size="icon" variant="ghost" className="h-9 w-9 bg-accent hover:bg-primary hover:text-primary-foreground transition-colors" onClick={(e) => { e.preventDefault(); }}>
              <ShoppingCart className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>
    </Link>
  </motion.div>
);

export default ProductCard;

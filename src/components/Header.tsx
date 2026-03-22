import { ShoppingCart, Search, Menu, Leaf } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { useState } from "react";

const Header = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 bg-background/80 backdrop-blur-md border-b border-border">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2">
          <Leaf className="h-7 w-7 text-primary" />
          <span className="font-display text-xl font-bold text-foreground">Vườn Xanh</span>
        </Link>

        <nav className="hidden md:flex items-center gap-8">
          <Link to="/" className="text-sm font-medium text-foreground hover:text-primary transition-colors">Trang chủ</Link>
          <Link to="/products" className="text-sm font-medium text-muted-foreground hover:text-primary transition-colors">Cây cảnh</Link>
          <Link to="/blog" className="text-sm font-medium text-muted-foreground hover:text-primary transition-colors">Cẩm nang</Link>
          <Link to="/contact" className="text-sm font-medium text-muted-foreground hover:text-primary transition-colors">Liên hệ</Link>
        </nav>

        <div className="flex items-center gap-3">
          <Button variant="ghost" size="icon" className="text-muted-foreground">
            <Search className="h-5 w-5" />
          </Button>
          <Button variant="ghost" size="icon" className="relative text-muted-foreground">
            <ShoppingCart className="h-5 w-5" />
            <span className="absolute -top-1 -right-1 h-5 w-5 rounded-full bg-terracotta text-primary-foreground text-xs flex items-center justify-center font-semibold">0</span>
          </Button>
          <Button variant="ghost" size="icon" className="md:hidden text-muted-foreground" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
            <Menu className="h-5 w-5" />
          </Button>
        </div>
      </div>

      {mobileMenuOpen && (
        <div className="md:hidden border-t border-border bg-background px-4 py-4 space-y-3">
          <Link to="/" className="block text-sm font-medium text-foreground" onClick={() => setMobileMenuOpen(false)}>Trang chủ</Link>
          <Link to="/products" className="block text-sm font-medium text-muted-foreground" onClick={() => setMobileMenuOpen(false)}>Cây cảnh</Link>
          <Link to="/blog" className="block text-sm font-medium text-muted-foreground" onClick={() => setMobileMenuOpen(false)}>Cẩm nang</Link>
          <Link to="/contact" className="block text-sm font-medium text-muted-foreground" onClick={() => setMobileMenuOpen(false)}>Liên hệ</Link>
        </div>
      )}
    </header>
  );
};

export default Header;

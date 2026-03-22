import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/lib/supabase";
import { Product, products as mockProducts } from "@/data/products";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Package,
  Plus,
  Pencil,
  Trash2,
  Search,
  X,
} from "lucide-react";
import { formatPrice } from "@/data/products";

const emptyProduct = {
  name: "",
  slug: "",
  price: 0,
  original_price: null as number | null,
  image: "",
  category: "desk",
  light: "indirect",
  care: "easy",
  benefit: "air",
  element: "moc",
  water: "1 lần/tuần",
  pet_safe: false,
  description: "",
  short_desc: "",
};

const ProductsPage = () => {
  const [search, setSearch] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [formData, setFormData] = useState(emptyProduct);

  const { data: products = [], isLoading } = useQuery({
    queryKey: ["admin-products"],
    queryFn: async (): Promise<Product[]> => {
      try {
        const { data, error } = await supabase
          .from("products")
          .select("*")
          .order("created_at", { ascending: false });

        if (error) {
          console.warn("Supabase Error, using mock data:", error.message);
          return mockProducts;
        }

        return data && data.length > 0 ? data : mockProducts;
      } catch (error) {
        console.warn("Failed to fetch from Supabase, using mock data:", error);
        return mockProducts;
      }
    },
    initialData: mockProducts,
  });
  const queryClient = useQueryClient();

  const createMutation = useMutation({
    mutationFn: async (product: typeof formData) => {
      const { error } = await supabase.from("products").insert([product]);
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["admin-products"] });
      setIsModalOpen(false);
      setFormData(emptyProduct);
    },
  });

  const updateMutation = useMutation({
    mutationFn: async ({ id, ...product }: typeof formData & { id: string }) => {
      const { error } = await supabase
        .from("products")
        .update(product)
        .eq("id", id);
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["admin-products"] });
      setIsModalOpen(false);
      setSelectedProduct(null);
      setFormData(emptyProduct);
    },
  });

  const deleteMutation = useMutation({
    mutationFn: async (id: string) => {
      const { error } = await supabase.from("products").delete().eq("id", id);
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["admin-products"] });
      setIsDeleteOpen(false);
      setSelectedProduct(null);
    },
  });

  const filteredProducts = products.filter(
    (p) =>
      p.name.toLowerCase().includes(search.toLowerCase()) ||
      p.slug.toLowerCase().includes(search.toLowerCase())
  );

  const handleOpenCreate = () => {
    setSelectedProduct(null);
    setFormData(emptyProduct);
    setIsModalOpen(true);
  };

  const handleOpenEdit = (product: Product) => {
    setSelectedProduct(product);
    setFormData({
      name: product.name,
      slug: product.slug,
      price: product.price,
      original_price: product.original_price,
      image: product.image,
      category: product.category,
      light: product.light,
      care: product.care,
      benefit: product.benefit,
      element: product.element,
      water: product.water,
      pet_safe: product.pet_safe,
      description: product.description,
      short_desc: product.short_desc,
    });
    setIsModalOpen(true);
  };

  const handleOpenDelete = (product: Product) => {
    setSelectedProduct(product);
    setIsDeleteOpen(true);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (selectedProduct) {
      updateMutation.mutate({ id: selectedProduct.id, ...formData });
    } else {
      createMutation.mutate(formData);
    }
  };

  const handleSlugify = (text: string) => {
    const slug = text
      .toLowerCase()
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .replace(/[^\w\s-]/g, "")
      .replace(/\s+/g, "-")
      .replace(/--+/g, "-")
      .trim();
    setFormData((prev) => ({ ...prev, slug }));
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Quản lý sản phẩm</h1>
          <p className="text-muted-foreground">Tổng cộng {products.length} sản phẩm</p>
        </div>
        <Button onClick={handleOpenCreate}>
          <Plus className="h-4 w-4 mr-2" />
          Thêm sản phẩm
        </Button>
      </div>

      <div className="bg-white rounded-xl shadow-sm border">
        <div className="p-4 border-b">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Tìm kiếm sản phẩm..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="pl-10"
            />
          </div>
        </div>

        {isLoading ? (
          <div className="p-8 text-center text-muted-foreground">
            Đang tải...
          </div>
        ) : (
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Hình ảnh</TableHead>
                <TableHead>Tên sản phẩm</TableHead>
                <TableHead>Giá</TableHead>
                <TableHead>Danh mục</TableHead>
                <TableHead className="text-right">Thao tác</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredProducts.map((product) => (
                <TableRow key={product.id}>
                  <TableCell>
                    <img
                      src={product.image}
                      alt={product.name}
                      className="w-12 h-12 object-cover rounded-lg"
                    />
                  </TableCell>
                  <TableCell>
                    <div>
                      <p className="font-medium">{product.name}</p>
                      <p className="text-sm text-muted-foreground">{product.slug}</p>
                    </div>
                  </TableCell>
                  <TableCell>
                    <span className="font-medium text-primary">
                      {formatPrice(product.price)}
                    </span>
                    {product.original_price && (
                      <span className="text-sm text-muted-foreground line-through ml-2">
                        {formatPrice(product.original_price)}
                      </span>
                    )}
                  </TableCell>
                  <TableCell>
                    <span className="px-2 py-1 bg-gray-100 rounded text-sm">
                      {product.category}
                    </span>
                  </TableCell>
                  <TableCell className="text-right">
                    <div className="flex items-center justify-end gap-2">
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => handleOpenEdit(product)}
                      >
                        <Pencil className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="text-red-500 hover:text-red-600"
                        onClick={() => handleOpenDelete(product)}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
              {filteredProducts.length === 0 && (
                <TableRow>
                  <TableCell colSpan={5} className="text-center py-8">
                    <Package className="h-12 w-12 mx-auto text-muted-foreground mb-2" />
                    <p className="text-muted-foreground">Không tìm thấy sản phẩm</p>
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        )}
      </div>

      <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
        <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>
              {selectedProduct ? "Sửa sản phẩm" : "Thêm sản phẩm mới"}
            </DialogTitle>
          </DialogHeader>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>Tên sản phẩm</Label>
                <Input
                  value={formData.name}
                  onChange={(e) => {
                    setFormData((prev) => ({ ...prev, name: e.target.value }));
                    if (!selectedProduct) handleSlugify(e.target.value);
                  }}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label>Slug</Label>
                <Input
                  value={formData.slug}
                  onChange={(e) =>
                    setFormData((prev) => ({ ...prev, slug: e.target.value }))
                  }
                  required
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>Giá</Label>
                <Input
                  type="number"
                  value={formData.price}
                  onChange={(e) =>
                    setFormData((prev) => ({
                      ...prev,
                      price: parseInt(e.target.value) || 0,
                    }))
                  }
                  required
                />
              </div>
              <div className="space-y-2">
                <Label>Giá gốc (không bắt buộc)</Label>
                <Input
                  type="number"
                  value={formData.original_price || ""}
                  onChange={(e) =>
                    setFormData((prev) => ({
                      ...prev,
                      original_price: e.target.value ? parseInt(e.target.value) : null,
                    }))
                  }
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label>Image URL</Label>
              <Input
                value={formData.image}
                onChange={(e) =>
                  setFormData((prev) => ({ ...prev, image: e.target.value }))
                }
                placeholder="plant-image.jpg"
              />
            </div>

            <div className="grid grid-cols-3 gap-4">
              <div className="space-y-2">
                <Label>Danh mục</Label>
                <select
                  className="w-full rounded-lg border border-input bg-background px-3 py-2"
                  value={formData.category}
                  onChange={(e) =>
                    setFormData((prev) => ({ ...prev, category: e.target.value }))
                  }
                >
                  <option value="desk">Cây để bàn</option>
                  <option value="lobby">Cây đại sảnh</option>
                  <option value="succulent">Sen đá</option>
                </select>
              </div>
              <div className="space-y-2">
                <Label>Ánh sáng</Label>
                <select
                  className="w-full rounded-lg border border-input bg-background px-3 py-2"
                  value={formData.light}
                  onChange={(e) =>
                    setFormData((prev) => ({ ...prev, light: e.target.value }))
                  }
                >
                  <option value="direct">Nắng trực tiếp</option>
                  <option value="indirect">Ánh sáng tán xạ</option>
                  <option value="shade">Bóng râm</option>
                </select>
              </div>
              <div className="space-y-2">
                <Label>Mức độ chăm sóc</Label>
                <select
                  className="w-full rounded-lg border border-input bg-background px-3 py-2"
                  value={formData.care}
                  onChange={(e) =>
                    setFormData((prev) => ({ ...prev, care: e.target.value }))
                  }
                >
                  <option value="easy">Dễ</option>
                  <option value="medium">Trung bình</option>
                  <option value="hard">Khó</option>
                </select>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>Lợi ích</Label>
                <select
                  className="w-full rounded-lg border border-input bg-background px-3 py-2"
                  value={formData.benefit}
                  onChange={(e) =>
                    setFormData((prev) => ({ ...prev, benefit: e.target.value }))
                  }
                >
                  <option value="air">Lọc không khí</option>
                  <option value="decor">Trang trí</option>
                </select>
              </div>
              <div className="space-y-2">
                <Label>Mệnh phong thủy</Label>
                <select
                  className="w-full rounded-lg border border-input bg-background px-3 py-2"
                  value={formData.element}
                  onChange={(e) =>
                    setFormData((prev) => ({ ...prev, element: e.target.value }))
                  }
                >
                  <option value="kim">Kim</option>
                  <option value="moc">Mộc</option>
                  <option value="thuy">Thủy</option>
                  <option value="hoa">Hỏa</option>
                  <option value="tho">Thổ</option>
                </select>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>Tưới nước</Label>
                <Input
                  value={formData.water}
                  onChange={(e) =>
                    setFormData((prev) => ({ ...prev, water: e.target.value }))
                  }
                />
              </div>
              <div className="space-y-2">
                <Label>An toàn cho thú cưng</Label>
                <div className="flex items-center gap-4 mt-2">
                  <label className="flex items-center gap-2">
                    <input
                      type="radio"
                      checked={formData.pet_safe === true}
                      onChange={() =>
                        setFormData((prev) => ({ ...prev, pet_safe: true }))
                      }
                    />
                    Có
                  </label>
                  <label className="flex items-center gap-2">
                    <input
                      type="radio"
                      checked={formData.pet_safe === false}
                      onChange={() =>
                        setFormData((prev) => ({ ...prev, pet_safe: false }))
                      }
                    />
                    Không
                  </label>
                </div>
              </div>
            </div>

            <div className="space-y-2">
              <Label>Mô tả ngắn</Label>
              <Input
                value={formData.short_desc}
                onChange={(e) =>
                  setFormData((prev) => ({ ...prev, short_desc: e.target.value }))
                }
              />
            </div>

            <div className="space-y-2">
              <Label>Mô tả chi tiết</Label>
              <textarea
                className="w-full rounded-lg border border-input bg-background px-3 py-2 min-h-[100px]"
                value={formData.description}
                onChange={(e) =>
                  setFormData((prev) => ({ ...prev, description: e.target.value }))
                }
              />
            </div>

            <DialogFooter>
              <Button
                type="button"
                variant="outline"
                onClick={() => setIsModalOpen(false)}
              >
                Hủy
              </Button>
              <Button
                type="submit"
                disabled={createMutation.isPending || updateMutation.isPending}
              >
                {createMutation.isPending || updateMutation.isPending
                  ? "Đang lưu..."
                  : "Lưu"}
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>

      <Dialog open={isDeleteOpen} onOpenChange={setIsDeleteOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Xóa sản phẩm</DialogTitle>
          </DialogHeader>
          <p>
            Bạn có chắc muốn xóa sản phẩm "{selectedProduct?.name}"? Hành động này
            không thể hoàn tác.
          </p>
          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setIsDeleteOpen(false)}
            >
              Hủy
            </Button>
            <Button
              variant="destructive"
              onClick={() => selectedProduct && deleteMutation.mutate(selectedProduct.id)}
              disabled={deleteMutation.isPending}
            >
              {deleteMutation.isPending ? "Đang xóa..." : "Xóa"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default ProductsPage;

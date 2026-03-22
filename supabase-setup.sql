-- ============================================
-- SUPABASE SETUP SCRIPT - Green Haven Hub
-- Run this in Supabase SQL Editor
-- ============================================

-- 1. Tạo bảng products
CREATE TABLE IF NOT EXISTS products (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  slug TEXT UNIQUE NOT NULL,
  price NUMERIC DEFAULT 0,
  original_price NUMERIC,
  image TEXT,
  category TEXT DEFAULT 'desk',
  light TEXT DEFAULT 'indirect',
  care TEXT DEFAULT 'easy',
  benefit TEXT DEFAULT 'air',
  element TEXT DEFAULT 'moc',
  water TEXT DEFAULT '1 lần/tuần',
  pet_safe BOOLEAN DEFAULT false,
  description TEXT,
  short_desc TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 2. Bật Row Level Security
ALTER TABLE products ENABLE ROW LEVEL SECURITY;

-- 3. Policy cho phép đọc công khai
CREATE POLICY "Allow public reads" ON products FOR SELECT USING (true);

-- 4. Policy cho phép insert/update (nếu cần)
CREATE POLICY "Allow inserts" ON products FOR INSERT WITH CHECK (true);
CREATE POLICY "Allow updates" ON products FOR UPDATE USING (true);

-- 5. Seed data (8 sản phẩm mẫu)
INSERT INTO products (name, slug, price, original_price, image, category, light, care, benefit, element, water, pet_safe, description, short_desc) VALUES
(
  'Cây Kim Tiền',
  'cay-kim-tien',
  350000,
  420000,
  'plant-money-tree.jpg',
  'desk',
  'indirect',
  'easy',
  'air',
  'kim',
  '1 lần/tuần',
  true,
  'Cây Kim Tiền mang lại tài lộc, may mắn cho gia chủ. Với dáng cây đẹp và lá xanh bóng, đây là lựa chọn hoàn hảo cho bàn làm việc hoặc phòng khách.',
  'Mang tài lộc, dễ chăm sóc'
),
(
  'Monstera Deliciosa',
  'monstera-deliciosa',
  480000,
  NULL,
  'plant-monstera.jpg',
  'lobby',
  'indirect',
  'medium',
  'air',
  'moc',
  '2 lần/tuần',
  false,
  'Monstera với lá xẻ thùy đặc trưng, mang phong cách nhiệt đới vào không gian sống. Cây phát triển nhanh và tạo điểm nhấn ấn tượng.',
  'Phong cách nhiệt đới, lá xẻ thùy độc đáo'
),
(
  'Cây Lưỡi Hổ',
  'cay-luoi-ho',
  220000,
  NULL,
  'plant-snake.jpg',
  'desk',
  'shade',
  'easy',
  'air',
  'kim',
  '2 tuần/lần',
  false,
  'Cây Lưỡi Hổ là bậc thầy lọc không khí, đặc biệt hiệu quả vào ban đêm. Cực kỳ dễ chăm sóc, phù hợp cho người bận rộn.',
  'Lọc không khí, siêu dễ chăm'
),
(
  'Trầu Bà',
  'trau-ba',
  180000,
  NULL,
  'plant-pothos.jpg',
  'desk',
  'shade',
  'easy',
  'air',
  'thuy',
  '1 lần/tuần',
  false,
  'Trầu Bà với lá hình tim xinh xắn, dễ trồng và phát triển mạnh. Thích hợp treo hoặc để trên kệ cao cho dây leo rủ xuống.',
  'Lá hình tim, dễ trồng'
),
(
  'Sen Đá Hỗn Hợp',
  'sen-da-hon-hop',
  150000,
  NULL,
  'plant-succulent.jpg',
  'succulent',
  'direct',
  'easy',
  'decor',
  'tho',
  '2 tuần/lần',
  true,
  'Bộ sen đá hỗn hợp nhiều màu sắc, đựng trong chậu đá tự nhiên. Món quà tặng ý nghĩa và dễ chăm sóc.',
  'Nhiều màu sắc, quà tặng ý nghĩa'
),
(
  'Cây Lan Ý',
  'cay-lan-y',
  280000,
  NULL,
  'plant-peace-lily.jpg',
  'desk',
  'shade',
  'medium',
  'air',
  'thuy',
  '2 lần/tuần',
  false,
  'Cây Lan Ý với hoa trắng thanh khiết, là biểu tượng của hòa bình và sự trong sáng. Lọc không khí cực tốt, thích hợp cho phòng ngủ.',
  'Hoa trắng thanh khiết, lọc không khí'
),
(
  'Cây Bàng Singapore',
  'cay-bang-singapore',
  650000,
  780000,
  'plant-fiddle.jpg',
  'lobby',
  'indirect',
  'hard',
  'decor',
  'moc',
  '1 lần/tuần',
  true,
  'Cây Bàng Singapore với lá lớn hình violin, là điểm nhấn hoàn hảo cho phòng khách rộng. Mang lại vẻ sang trọng và gần gũi thiên nhiên.',
  'Sang trọng, điểm nhấn phòng khách'
),
(
  'Cây Cao Su',
  'cay-cao-su',
  320000,
  NULL,
  'plant-rubber.jpg',
  'lobby',
  'indirect',
  'easy',
  'air',
  'hoa',
  '1 lần/tuần',
  false,
  'Cây Cao Su với lá xanh đậm bóng mượt, tượng trưng cho sự kiên cường. Lọc không khí hiệu quả và rất dễ chăm sóc.',
  'Lá bóng mượt, kiên cường'
)
ON CONFLICT (slug) DO NOTHING;

-- 6. Kiểm tra dữ liệu
SELECT * FROM products;

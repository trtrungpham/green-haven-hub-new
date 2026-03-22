export interface Product {
  id: string;
  name: string;
  slug: string;
  price: number;
  originalPrice?: number;
  image: string;
  category: string;
  light: string;
  care: string;
  benefit: string;
  element: string; // phong thủy
  water: string;
  petSafe: boolean;
  description: string;
  shortDesc: string;
}

import plantMoneyTree from "@/assets/plant-money-tree.jpg";
import plantMonstera from "@/assets/plant-monstera.jpg";
import plantSnake from "@/assets/plant-snake.jpg";
import plantPothos from "@/assets/plant-pothos.jpg";
import plantSucculent from "@/assets/plant-succulent.jpg";
import plantPeaceLily from "@/assets/plant-peace-lily.jpg";
import plantFiddle from "@/assets/plant-fiddle.jpg";
import plantRubber from "@/assets/plant-rubber.jpg";

export const products: Product[] = [
  {
    id: "1",
    name: "Cây Kim Tiền",
    slug: "cay-kim-tien",
    price: 350000,
    originalPrice: 420000,
    image: plantMoneyTree,
    category: "desk",
    light: "indirect",
    care: "easy",
    benefit: "air",
    element: "kim",
    water: "1 lần/tuần",
    petSafe: true,
    description: "Cây Kim Tiền mang lại tài lộc, may mắn cho gia chủ. Với dáng cây đẹp và lá xanh bóng, đây là lựa chọn hoàn hảo cho bàn làm việc hoặc phòng khách.",
    shortDesc: "Mang tài lộc, dễ chăm sóc",
  },
  {
    id: "2",
    name: "Monstera Deliciosa",
    slug: "monstera-deliciosa",
    price: 480000,
    image: plantMonstera,
    category: "lobby",
    light: "indirect",
    care: "medium",
    benefit: "air",
    element: "moc",
    water: "2 lần/tuần",
    petSafe: false,
    description: "Monstera với lá xẻ thùy đặc trưng, mang phong cách nhiệt đới vào không gian sống. Cây phát triển nhanh và tạo điểm nhấn ấn tượng.",
    shortDesc: "Phong cách nhiệt đới, lá xẻ thùy độc đáo",
  },
  {
    id: "3",
    name: "Cây Lưỡi Hổ",
    slug: "cay-luoi-ho",
    price: 220000,
    image: plantSnake,
    category: "desk",
    light: "shade",
    care: "easy",
    benefit: "air",
    element: "kim",
    water: "2 tuần/lần",
    petSafe: false,
    description: "Cây Lưỡi Hổ là bậc thầy lọc không khí, đặc biệt hiệu quả vào ban đêm. Cực kỳ dễ chăm sóc, phù hợp cho người bận rộn.",
    shortDesc: "Lọc không khí, siêu dễ chăm",
  },
  {
    id: "4",
    name: "Trầu Bà",
    slug: "trau-ba",
    price: 180000,
    image: plantPothos,
    category: "desk",
    light: "shade",
    care: "easy",
    benefit: "air",
    element: "thuy",
    water: "1 lần/tuần",
    petSafe: false,
    description: "Trầu Bà với lá hình tim xinh xắn, dễ trồng và phát triển mạnh. Thích hợp treo hoặc để trên kệ cao cho dây leo rủ xuống.",
    shortDesc: "Lá hình tim, dễ trồng",
  },
  {
    id: "5",
    name: "Sen Đá Hỗn Hợp",
    slug: "sen-da-hon-hop",
    price: 150000,
    image: plantSucculent,
    category: "succulent",
    light: "direct",
    care: "easy",
    benefit: "decor",
    element: "tho",
    water: "2 tuần/lần",
    petSafe: true,
    description: "Bộ sen đá hỗn hợp nhiều màu sắc, đựng trong chậu đá tự nhiên. Món quà tặng ý nghĩa và dễ chăm sóc.",
    shortDesc: "Nhiều màu sắc, quà tặng ý nghĩa",
  },
  {
    id: "6",
    name: "Cây Lan Ý",
    slug: "cay-lan-y",
    price: 280000,
    image: plantPeaceLily,
    category: "desk",
    light: "shade",
    care: "medium",
    benefit: "air",
    element: "thuy",
    water: "2 lần/tuần",
    petSafe: false,
    description: "Cây Lan Ý với hoa trắng thanh khiết, là biểu tượng của hòa bình và sự trong sáng. Lọc không khí cực tốt, thích hợp cho phòng ngủ.",
    shortDesc: "Hoa trắng thanh khiết, lọc không khí",
  },
  {
    id: "7",
    name: "Cây Bàng Singapore",
    slug: "cay-bang-singapore",
    price: 650000,
    originalPrice: 780000,
    image: plantFiddle,
    category: "lobby",
    light: "indirect",
    care: "hard",
    benefit: "decor",
    element: "moc",
    water: "1 lần/tuần",
    petSafe: true,
    description: "Cây Bàng Singapore với lá lớn hình violin, là điểm nhấn hoàn hảo cho phòng khách rộng. Mang lại vẻ sang trọng và gần gũi thiên nhiên.",
    shortDesc: "Sang trọng, điểm nhấn phòng khách",
  },
  {
    id: "8",
    name: "Cây Cao Su",
    slug: "cay-cao-su",
    price: 320000,
    image: plantRubber,
    category: "lobby",
    light: "indirect",
    care: "easy",
    benefit: "air",
    element: "hoa",
    water: "1 lần/tuần",
    petSafe: false,
    description: "Cây Cao Su với lá xanh đậm bóng mượt, tượng trưng cho sự kiên cường. Lọc không khí hiệu quả và rất dễ chăm sóc.",
    shortDesc: "Lá bóng mượt, kiên cường",
  },
];

export const formatPrice = (price: number) => {
  return new Intl.NumberFormat("vi-VN").format(price) + "₫";
};

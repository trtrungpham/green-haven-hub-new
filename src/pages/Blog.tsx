import AnnouncementBar from "@/components/AnnouncementBar";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ChatBot from "@/components/ChatBot";
import { BookOpen } from "lucide-react";

const blogPosts = [
  {
    title: "Cách cứu cây bị thối rễ",
    excerpt: "Hướng dẫn chi tiết từng bước để cứu sống cây yêu của bạn khi phát hiện rễ bị thối.",
    category: "Chăm sóc",
    readTime: "5 phút",
  },
  {
    title: "5 loại cây trồng phòng ngủ giúp ngủ ngon",
    excerpt: "Những loại cây không chỉ đẹp mà còn giúp cải thiện chất lượng giấc ngủ của bạn.",
    category: "Gợi ý",
    readTime: "4 phút",
  },
  {
    title: "Cách chọn cây phong thủy theo tuổi",
    excerpt: "Tìm hiểu cây nào phù hợp với mệnh và tuổi của bạn để mang lại may mắn.",
    category: "Phong thủy",
    readTime: "6 phút",
  },
  {
    title: "Hướng dẫn tưới nước đúng cách cho từng loại cây",
    excerpt: "Mỗi loại cây cần lượng nước khác nhau. Đây là cách tưới đúng để cây luôn xanh tốt.",
    category: "Chăm sóc",
    readTime: "3 phút",
  },
];

const Blog = () => (
  <div className="min-h-screen">
    <AnnouncementBar />
    <Header />
    <div className="container mx-auto px-4 py-8">
      <div className="text-center mb-12">
        <h1 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-3">Cẩm nang chăm sóc cây</h1>
        <p className="text-muted-foreground max-w-lg mx-auto">Kiến thức hữu ích giúp bạn trở thành "bậc thầy" trồng cây tại nhà</p>
      </div>

      <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto">
        {blogPosts.map((post, i) => (
          <article key={i} className="bg-card rounded-xl p-6 shadow-soft hover:shadow-card transition-shadow cursor-pointer">
            <div className="flex items-center gap-2 mb-3">
              <span className="text-xs font-medium px-2.5 py-1 rounded-full bg-accent text-accent-foreground">{post.category}</span>
              <span className="text-xs text-muted-foreground flex items-center gap-1">
                <BookOpen className="h-3 w-3" /> {post.readTime}
              </span>
            </div>
            <h2 className="font-display text-lg font-semibold text-foreground mb-2">{post.title}</h2>
            <p className="text-sm text-muted-foreground leading-relaxed">{post.excerpt}</p>
          </article>
        ))}
      </div>
    </div>
    <Footer />
    <ChatBot />
  </div>
);

export default Blog;

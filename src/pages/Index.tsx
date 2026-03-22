import AnnouncementBar from "@/components/AnnouncementBar";
import Header from "@/components/Header";
import HeroSection from "@/components/HeroSection";
import QuickFilters from "@/components/QuickFilters";
import BestSellers from "@/components/BestSellers";
import FengShuiSection from "@/components/FengShuiSection";
import SocialProof from "@/components/SocialProof";
import Footer from "@/components/Footer";
import ChatButton from "@/components/ChatButton";

const Index = () => (
  <div className="min-h-screen">
    <AnnouncementBar />
    <Header />
    <HeroSection />
    <QuickFilters />
    <BestSellers />
    <FengShuiSection />
    <SocialProof />
    <Footer />
    <ChatButton />
  </div>
);

export default Index;

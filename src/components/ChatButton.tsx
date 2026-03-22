import { MessageCircle } from "lucide-react";
import { Button } from "@/components/ui/button";

const ChatButton = () => (
  <Button
    variant="hero"
    size="icon"
    className="fixed bottom-6 right-6 z-50 h-14 w-14 rounded-full shadow-elevated hover:shadow-card"
    onClick={() => window.open("https://zalo.me/", "_blank")}
  >
    <MessageCircle className="h-6 w-6" />
  </Button>
);

export default ChatButton;

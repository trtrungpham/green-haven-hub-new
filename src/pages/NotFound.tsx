import { useLocation } from "react-router-dom";
import { useEffect } from "react";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error("404 Error: User attempted to access non-existent route:", location.pathname);
    
    // SEO FIX: Add noindex meta tag to prevent Soft 404
    document.title = "404 - Không tìm thấy trang";
    let meta = document.querySelector('meta[name="robots"]') as HTMLMetaElement;
    let addedMeta = false;
    
    if (!meta) {
      meta = document.createElement('meta');
      meta.name = "robots";
      document.head.appendChild(meta);
      addedMeta = true;
    }
    
    const originalContent = meta.content;
    meta.content = "noindex, nofollow";

    return () => {
      // Cleanup to allow indexing on other valid pages after navigating away
      if (addedMeta) {
        document.head.removeChild(meta);
      } else {
        meta.content = originalContent;
      }
    };
  }, [location.pathname]);

  return (
    <div className="flex min-h-screen items-center justify-center bg-muted">
      <div className="text-center">
        <h1 className="mb-4 text-4xl font-bold">404</h1>
        <p className="mb-4 text-xl text-muted-foreground">Oops! Page not found</p>
        <a href="/" className="text-primary underline hover:text-primary/90">
          Return to Home
        </a>
      </div>
    </div>
  );
};

export default NotFound;

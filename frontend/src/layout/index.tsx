import { useEffect, useState } from "react";
import Footer from "./footer";
import Header from "./header";
import { Outlet } from "react-router-dom";
import Loader from "@/components/ui/custom-loader";

const Layout = () => {

      const [loading, setLoading] = useState(true);

  useEffect(() => {
    const handleLoad = () => {
      setLoading(false);
    };

    // 1. Wait for all images
    const imagePromises = Array.from(document.images).map((img) => {
      if (img.complete) return Promise.resolve();
      return new Promise((resolve) => {
        img.onload = img.onerror = resolve;
      });
    });

    // 2. Wait for fonts (using FontFaceSet API)
    const fontPromise = document.fonts.ready;

    // Wait for all
    Promise.all([...imagePromises, fontPromise]).then(handleLoad);
  }, []);

  if (loading) {
    return (
      <div className="fixed inset-0 flex items-center justify-center z-50">
        <Loader/>
      </div>
    );
  }
  
return(
    <div className="min-h-screen">
    <Header />
    <Outlet />
    <Footer />
   </div>
)

}

export default Layout;
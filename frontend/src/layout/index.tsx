import { useEffect, useState } from "react";
import Footer from "./footer";
import Header from "./header";
import { Outlet } from "react-router-dom";
import Loader from "@/components/ui/custom-loader";
import ScrollToTop from "@/components/scrollToTheTop";

const Layout = () => {

      const [loading, setLoading] = useState(true);

  useEffect(() => {
    const handleLoad = () => {
      setLoading(false);
    };

    const imagePromises = Array.from(document.images).map((img) => {
      if (img.complete) return Promise.resolve();
      return new Promise((resolve) => {
        img.onload = img.onerror = resolve;
      });
    });

    const fontPromise = document.fonts.ready;

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
    <div className="min-h-screen transition-color duration-300">
    <ScrollToTop/>
    <Header />
    <Outlet />
    <Footer />
   </div>
)

}

export default Layout;
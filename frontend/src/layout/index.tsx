import Home from "@/pages/home-page";
import Footer from "./footer";
import Header from "./header";

const Layout = () => {
return(
    <div className="min-h-screen">
    <Header />
    <Home/>
    <Footer />
   </div>
)

}

export default Layout;
import Footer from "./footer";
import Header from "./header";
import { Outlet } from "react-router-dom";

const Layout = () => {
return(
    <div className="min-h-screen">
    <Header />
    <Outlet />
    <Footer />
   </div>
)

}

export default Layout;
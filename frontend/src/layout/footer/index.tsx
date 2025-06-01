import logo from "@/assets/Neighbourly logo.svg"
import {
  Facebook,
  Twitter,
  Instagram, 
  Music,
} from "lucide-react";

const Footer = () => {

    return(
        <div className="h-[465px] px-[120px] py-[119px] mt-20 shadow-top">
                <div className="flex justify-between items-center w-full h-full">
 <div className="flex gap-[24px] items-center">
          <img src={logo} alt="" />
        <h1 className="piedra-regular text-[64px] text-main">
            Neighbourly
        </h1>
        </div>
        <div className="px-6 py-10 text-[24px] font-[500] text-black">
      <div className="grid grid-cols-2 gap-x-12 gap-y-2">
        <a href="#">About Us</a>
        <a href="#">Privacy Policy</a>
        <a href="#">Contact</a>
        <a href="#">Terms of Service</a>
        <a href="#">Q&amp;A</a>
      </div>

      <div className="flex items-center gap-2 pt-4">
        <span>Follow Us:</span>
        <Facebook className="w-5 h-5" />
        <Twitter className="w-5 h-5" />
        <Music className="w-5 h-5" />
        <Instagram className="w-5 h-5" />
      </div>
    </div>
        </div>
        </div>
    )
}



export default Footer;
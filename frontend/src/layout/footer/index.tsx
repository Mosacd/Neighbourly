import logo from "@/assets/Neighbourly logo.svg"
import fb from "@/assets/mediaLinks/basil_facebook-outline.svg"
import tw from "@/assets/mediaLinks/prime_twitter.svg"
import tt from "@/assets/mediaLinks/meteor-icons_tiktok.svg"
import inst from "@/assets/mediaLinks/mdi_instagram.svg"

const Footer = () => {

    return(
        <div className="h-[320px] sm:h-[400px] 2xl:h-[465px] p-[24px] md:py-[95px] md:px-[40px] xl:px-[80px] 2xl:px-[120px] 2xl:py-[119px] mt-[80px] sm:mt-[120px] shadow-top">
                <div className="flex flex-col md:flex-row gap-10 sm:justify-between sm:items-center w-full h-full m-auto max-w-[1200px] 2xl:max-w-[1475px]">
 <div className="flex gap-[8px] sm:gap-[24px] items-center">
          <img className="w-full max-w-[40px] sm:max-w-[80px] 2xl:max-w-[96px]" src={logo} alt="" />
        <h1 className="piedra-regular text-2xl sm:text-[3.25rem] 2xl:text-[4rem] text-main">
            Neighbourly
        </h1>
        </div>
        <div className="lg:px-6  sm:mt-0 sm:py-5 md:py-10 text-md sm:text-lg 2xl:text-xl  noto-sans-semibold">
      <div className="grid grid-cols-2 gap-x-5 gap-y-6 sm:gap-x-12">
        <a href="#">About Us</a>
        <a href="#">Privacy Policy</a>
        <a href="#">Contact</a>
        <a href="#">Terms of Service</a>
        <a href="#">Q&amp;A</a>
      </div>

      <div className="flex items-center gap-4 pt-8">
        <span>Follow Us:</span>
        <a href="#"><img src={fb} alt="" /></a>
         <a href="#"><img src={tw} alt="" /></a>
        <a href="#"><img src={tt} alt="" /></a>
        <a href="#"><img src={inst} alt="" /></a>
      </div>
    </div>
        </div>
        </div>
    )
}



export default Footer;
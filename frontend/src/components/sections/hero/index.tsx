import hero from "@/assets/hero.png"
import { Button } from "@/components/ui/button";

const Hero = () => {

    return(
        <div className="flex justify-between items-center w-full max-w-[1552px] mt-[120px] mb-[120px] m-auto">
            <img src={hero} alt="heroImage" />
            <div className="w-full max-w-[590px]">
                <h1 className="noto-sans-semibold text-[40px]">Become a Volunteer With <span className="piedra-regular text-main tracking-[2px] text-[64px]">Us</span></h1>
                <p className="noto-sans-regular text-[24px]">Discover meaningful volunteer opportunities and join a community that's changing the world</p>   
                <Button className="mt-15" variant={"default"}>Start Exploring</Button>     
            </div>
        </div>
    )
}


export default Hero;
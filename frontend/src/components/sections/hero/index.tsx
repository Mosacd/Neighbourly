import hero from "@/assets/hero.png"
import { Button } from "@/components/ui/button";

const Hero = () => {

    return(
        <div className="flex justify-between items-center w-full max-w-[1303px] 2xl:max-w-[1552px] mt-[120px] m-auto">
            <img className="w-full max-w-[570.5px] 2xl:max-w-[695px]" src={hero} alt="heroImage" />
            <div className="w-full max-w-[570.05px] 2xl:max-w-[590px]">
                <h1 className="noto-sans-semibold text-2xl 2xl:text-3xl mb-8">Become a Volunteer With <span className="piedra-regular text-main leading-[100%] tracking-[2px] text-[56px] 2xl:text-[64px]">Us</span></h1>
                <p className="noto-sans-regular text-lg 2xl:text-xl">Discover meaningful volunteer opportunities and join a community that's changing the world</p>   
                <Button className="mt-10" variant={"default"}>Start Exploring</Button>     
            </div>
        </div>
    )
}


export default Hero;
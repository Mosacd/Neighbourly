import hero from "@/assets/hero.png"
import { Button } from "@/components/ui/button";

const Hero = () => {

    return(
        <div className="flex flex-col gap-[32px] lg:flex-row justify-center 2xl:gap-[162px] items-center w-full max-w-[1303px] 2xl:max-w-[1552px] mt-[120px] m-auto">
            <img className="w-full sm:max-w-[570.5px] 2xl:max-w-[695px]" src={hero} alt="heroImage" />
            <div className="flex flex-col w-full text-center items-center lg:items-start lg:text-start max-w-[570.05px] 2xl:max-w-[590px]">
                <h1 className="noto-sans-semibold text-xl sm:text-2xl 2xl:text-3xl mb-6 sm:mb-8">Become a Volunteer With <span className="piedra-regular text-main leading-[100%] sm:tracking-[2px] text-[46px] sm:text-[56px] 2xl:text-[64px]">Us</span></h1>
                <p className="noto-sans-regular text-md sm:text-lg 2xl:text-xl">Discover meaningful volunteer opportunities and join a community that's changing the world</p>   
                <Button className="mt-8 sm:mt-10 max-lg:h-[53px] max-lg:text-[24px] w-full max-w-[343px] lg:w-fit" variant={"default"}>Start Exploring</Button>     
            </div>
        </div>
    )
}


export default Hero;
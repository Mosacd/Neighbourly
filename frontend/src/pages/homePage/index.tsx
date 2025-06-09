import About from "@/components/sections/about";
import CaruselSection from "@/components/sections/carusels/HomeSection";
import Hero from "@/components/sections/hero";

const Home = () => {
return  (
    <div className="flex flex-col gap-[120px]">
        <div className="px-[16px] sm:px-[30px]">
    <Hero/>
    </div>
    <CaruselSection/>
    <div className="px-[30px]">
    <About/>
    </div>
    </div>
    )
}


export default Home;
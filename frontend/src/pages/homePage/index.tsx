import About from "@/components/sections/about";
import CaruselSection from "@/components/sections/carusels/HomeSection";
import Hero from "@/components/sections/hero";

const Home = () => {
return  (
    <div className="flex flex-col gap-[120px]">
    <Hero/>
    <CaruselSection/>
    <About/>
    </div>
    )
}


export default Home;
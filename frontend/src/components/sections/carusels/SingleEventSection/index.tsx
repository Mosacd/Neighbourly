import CaruselEvent from "@/components/ui/custom-elements/carusels/customCarusel2";


const CaruselSection = () => {

return(    
                <div className="m-auto flex flex-col items-center justify-center py-[26px]">
                            <h1 className="noto-sans-semibold text-2xl md:text-3xl 2xl:text-4xl mb-[32px] md:mb-[48px]">
                            Similar Events
                            </h1>
                            
            <div className="w-full flex justify-center md:px-[60px] lg:px-[70px]">
                            <CaruselEvent/>
                             </div>
                </div>
)
}


export default CaruselSection;
import CaruselEvent from "@/components/ui/custom-elements/carusels/customCarusel2";


const CaruselSection = () => {

return(    
                <div className="m-auto flex flex-col items-center justify-center py-[26px]">
                            <h1 className="noto-sans-semibold text-[48px] mb-[48px]">
                            Similar Events
                            </h1>
                            
            <div className="w-full flex justify-center px-[40px]">
                            <CaruselEvent/>
                             </div>
                </div>
)
}


export default CaruselSection;
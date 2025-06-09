import CaruselHome from "@/components/ui/custom-elements/carusels/customCarusel1";


const CaruselSection = () => {

return(    <div className="h-[720px] md:h-[640px] 2xl:h-[720px] w-full bg-[#FFF5D7]">
                <div className="m-auto flex flex-col items-center justify-center py-[26px]">
                            <h1 className="noto-sans-semibold text-2xl md:text-3xl 2xl:text-4xl mb-[32px] md:mb-[48px]">
                            Upcoming Events
                            </h1>
                                        <div className="w-full flex justify-center md:px-[70px]">

                            <CaruselHome/>
                            </div>
                </div>
    </div>
)
}


export default CaruselSection;
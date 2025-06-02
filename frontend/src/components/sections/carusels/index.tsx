import CaruselHome from "@/components/ui/custom-elements/customCarusel";


const CaruselSection = () => {

return(    <div className="h-[720px] w-full bg-[#FFF5D7]">
                <div className="max-w-[1363px] m-auto flex flex-col items-center justify-center py-[26px]">
                            <h1 className="noto-sans-semibold text-[48px] mb-[48px]">
                            Upcoming Events
                            </h1>
                            <CaruselHome/>
                </div>
    </div>
)
}


export default CaruselSection;
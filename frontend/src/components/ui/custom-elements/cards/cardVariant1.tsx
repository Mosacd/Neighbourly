import { Link } from "react-router-dom";
import { Button } from "../../button";
import type { VolunteerOpportunity } from "@/dummyData";

const CardForHome: React.FC<{ data: VolunteerOpportunity }> = ({ data }) => {
  return (
    <div className="bg-[#FFDD71] border-2 border-main m-auto shadow-md py-[21px] 2xl:py-[29px] px-[16px] 2xl:px-[24px] rounded-[24px] max-w-[1200px] 2xl:max-w-[1363px] w-full active:cursor-grabbing select-none">
      <div className="flex justify-between items-center gap-6 2xl:gap-10">
        <div className="w-full max-w-[852px]">
          <h1 className="noto-sans-semibold text-2xl 2xl:text-3xl mb-[40px] 2xl:mb-[48px]">
            {data.title}
          </h1>
          <p className="noto-sans-regular text-lg 2xl:text-xl text-[#545454] mb-[26px] 2xl:mb-[32px]">
            {data.description}
          </p>
          <Link to={`/Events/${data.id}`}>
            <Button className="px-6" variant={"secondary"}>See More</Button>
          </Link>
        </div>
        <div className="flex-shrink-0">
        <img
  className="rounded-[24px] w-[320px] h-[288px] 2xl:w-[400px] 2xl:h-[361px] object-cover"
  src={data.image}
  alt=""
/>

        </div>
      </div>
    </div>
  );
};

export default CardForHome;

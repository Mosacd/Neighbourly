import { Link } from "react-router-dom";
import { Button } from "../../button";
import type { VolunteerOpportunity } from "@/dummyData";

const CardForHome: React.FC<{ data: VolunteerOpportunity }> = ({ data }) => {
  return (
    <div className="bg-[#FFDD71] max-md:h-[481px] md:max-h-[423px] border-2 border-main m-auto shadow-md py-[21px] 2xl:py-[29px] px-[16px] 2xl:px-[24px] rounded-[24px] max-w-[375px] md:max-w-[1200px] 2xl:max-w-[1363px] w-full active:cursor-grabbing select-none">
      <div className="flex flex-col-reverse md:flex-row justify-between items-center gap-6 2xl:gap-10">
        <div className="w-full max-w-[852px] flex flex-col items-center text-center md:text-start md:items-start">
          <h1 className="noto-sans-semibold text-xl md:text-2xl 2xl:text-3xl line-clamp-2 mb-[24px] md:mb-[40px] 2xl:mb-[48px]">
            {data.title}
          </h1>
          <p className="noto-sans-regular hidden md:block text-lg 2xl:text-xl line-clamp-3 text-[#545454] mb-[26px] 2xl:mb-[32px]">
            {data.description}
          </p>
          <Link className="w-full md:w-fit" to={`/Events/${data.id}`}>
            <Button className="px-6 w-full max-md:text-[24px] max-md:h-[53px]" variant={"secondary"}>See More</Button>
          </Link>
        </div>
        <div className="flex-shrink-0">
        <img
  className="rounded-[24px] w-[296px] h-[268px] md:w-[320px] md:h-[288px] 2xl:w-[400px] 2xl:h-[361px] object-cover"
  src={data.image}
  alt=""
/>

        </div>
      </div>
    </div>
  );
};

export default CardForHome;

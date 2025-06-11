import { Input } from "../../input";
// import searchSign from "@/assets/ri_search-line.svg"
const SearchBar = () => {

    return(
        <div className="relative group w-full max-w-[648px] 2xl:max-w-[830px]">
        <Input placeholder="search..." className="h-[42px] 2xl:h-[53px] rounded-[8px] border-2 py-[10px] px-[24px] pl-[52px] noto-sans-semibold border-[#696363]"/>
    <svg
        className="absolute left-4 top-1/2 -translate-y-1/2 w-[24px] h-[24px] 2xl:w-[32px] 2xl:h-[32px] fill-[#696363] group-focus-within:fill-black pointer-events-none"
        width="32"
        height="33"
        viewBox="0 0 32 33"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path d="M24.0412 22.656L29.7518 28.3653L27.8652 30.252L22.1558 24.5413C20.0315 26.2443 17.3892 27.1705 14.6665 27.1666C8.0425 27.1666 2.6665 21.7906 2.6665 15.1666C2.6665 8.54263 8.0425 3.16663 14.6665 3.16663C21.2905 3.16663 26.6665 8.54263 26.6665 15.1666C26.6704 17.8893 25.7441 20.5316 24.0412 22.656ZM21.3665 21.6666C23.0583 19.9262 24.0032 17.5938 23.9998 15.1666C23.9998 10.0106 19.8225 5.83329 14.6665 5.83329C9.5105 5.83329 5.33317 10.0106 5.33317 15.1666C5.33317 20.3226 9.5105 24.5 14.6665 24.5C17.0937 24.5034 19.4261 23.5584 21.1665 21.8666L21.3665 21.6666Z" />
      </svg>
        </div>
    )
    
}


export default SearchBar;
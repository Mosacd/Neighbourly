import darkModeSVG from "@/assets/darkMode.svg"
import { useTheme } from "@/components/themeProvider";

const ToggleSwitch = () => {
    const {theme, setTheme } = useTheme()

      const isOn = theme === "dark";

  const handleToggle = () => {
    setTheme(isOn ? "light" : "dark");
  };

  return (
    <button
      onClick={handleToggle}
      className={`
        relative hover:cursor-pointer inline-flex h-[48px] w-[96px] max-2xl:lg:h-[40px] max-2xl:lg:w-[80px] items-center rounded-full transition-colors duration-300 ease-in-out focus:outline-none
        ${isOn 
          ? 'bg-main dark:bg-yellow-600'
          : 'bg-gray-300'
        }
      `}
    >
      <img src={darkModeSVG}
        className={`
          inline-block h-10 w-10 max-2xl:lg:h-8 max-2xl:lg:w-8 transform rounded-full bg-white shadow-lg transition-transform duration-300 ease-in-out
          ${isOn ? 'translate-x-13 max-2xl:lg:translate-x-11' : 'translate-x-1'}
        `}
      />
    </button>
  );
};

export default ToggleSwitch;
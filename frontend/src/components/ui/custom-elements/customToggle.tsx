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
        relative hover:cursor-pointer inline-flex h-[40px] w-[80px] 2xl:h-[48px] 2xl:w-[96px] items-center rounded-full transition-colors duration-200 ease-in-out focus:outline-none
        ${isOn 
          ? 'bg-main'
          : 'bg-gray-300'
        }
      `}
    >
      <img src={darkModeSVG}
        className={`
          inline-block h-8 w-8 2xl:h-10 2xl:w-10 transform rounded-full bg-white shadow-lg transition-transform duration-200 ease-in-out
          ${isOn ? 'translate-x-11 2xl:translate-x-13' : 'translate-x-1'}
        `}
      />
    </button>
  );
};

export default ToggleSwitch;
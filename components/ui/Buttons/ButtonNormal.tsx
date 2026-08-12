import { usePathname } from "next/navigation";
import React from "react";

interface ButtonProps {
  title: string;
  onClick?: () => void;
}

const ButtonNormal: React.FC<ButtonProps> = ({ title, onClick }) => {
  const pathName = usePathname();

  const handleDefaultClickAction = () => {
    console.log("Button used at: ", pathName);
  };

  return (
    <button onClick={onClick || handleDefaultClickAction}
    className="px-6 py-2 bg-[#D9D9D9] text-zinc-950 text-sm font-normal border rounded-full hover:bg-[#D9D9D9]/10 cursor-pointer"
    >
      {title}
    </button>
  );
};

export default ButtonNormal;
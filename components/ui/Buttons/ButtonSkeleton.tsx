import { usePathname } from "next/navigation";
import React from "react";


const ButtonSkeleton: React.FC = () => {
  return (
    <button 
    className="px-6 py-2 bg-[#D9D9D9] text-[#D9D9D9] text-sm font-normal border rounded-full hover:bg-[#D9D9D9]/10 cursor-pointer animate-pulse"
    >
      ARX
    </button>
  );
};

export default ButtonSkeleton;
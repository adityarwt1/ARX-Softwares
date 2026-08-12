import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";

interface ButtonRedirect {
  href:string
  title: string;
  onClick?: () => void;
}

const ButtonRedirect: React.FC<ButtonRedirect> = ({href, title, onClick }) => {
  const pathName = usePathname();

  const handleDefaultClickAction = () => {
    console.log("Button used at: ", pathName);
  };

  return (
    <Link href={href}>
    <button onClick={onClick || handleDefaultClickAction}
    className="px-8 py-2 bg-[#D9D9D9] text-zinc-950 text-sm font-normal border rounded-full transition-all duration-200 hover:bg-zinc-950 hover:text-white  cursor-pointer"
    >
      {title}
    </button>
    </Link>

  );
};

export default ButtonRedirect;
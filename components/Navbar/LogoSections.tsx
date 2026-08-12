import Link from "next/link";
import React from "react";

const Logo: React.FC = () => {
    return (
        <Link
            href="/"
            className="text-zinc-950 w-full text-4xl font-sans font-extrabold flex items-center justify-start"
        >
            <span>ARX</span>
        </Link>
    )
}
export default Logo
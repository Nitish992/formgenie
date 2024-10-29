
import Link from "next/link";
import { Grip } from "lucide-react";
import { UserButton } from "@clerk/nextjs";


function Header() {
    return (
        <header className="w-full h-[80px] flex justify-between items-center px-4 md:px-6 bg-white bg-opacity-90 backdrop-filter backdrop-blur-md shadow-md sticky top-0 z-50">
            <div className="flex items-center space-x-2">
                <Link href={"/dashboard"} className="flex items-center space-x-1">

                    <p className="text-xl text-neutral-500">FormsGenie</p>
                </Link>
            </div>

            {/* <div className="flex items-center md:justify-between md:flex-1 max-w-lg lg:max-w-4xl xl:max-w-5xl">
                <div className="flex items-center"> */}
            <UserButton afterSignOutUrl="/" />
            {/* </div>
            </div> */}
        </header>
    );
}

export default Header;

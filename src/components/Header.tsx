
import Link from "next/link";
import { UserButton } from "@clerk/nextjs";
import Image from 'next/image'


/*************  ✨ Codeium Command ⭐  *************/
/**
 * The topmost header of the application, containing the app title
 * and a button to sign in or out.
 *
 * @returns The header element.
 */
/******  bdda2dfa-2f2f-4b98-b13b-3ffae3a84d9a  *******/function Header() {
    return (
        <header className="w-full h-[80px] flex justify-between items-center px-4 md:px-6 bg-white bg-opacity-90 backdrop-filter backdrop-blur-md shadow-md sticky top-0 z-50">
            <div className="flex items-center space-x-2">
                <Image
                    src="/logo.png"
                    width={70}
                    height={70}
                    alt=""
                />
                <Link href={"/dashboard"} className="flex items-center space-x-1">
                    <p className="text-xl  font-bold text-xl md:text-4xl flex items-center">ForMatic</p>
                </Link>
            </div>

            {/* Flex container for right-aligned items */}
            <div className="flex items-center space-x-4 ml-auto">
                <Link href={"/"} className="flex items-center space-x-1">
                    <p className="text-sm text-neutral-500">Home</p>
                </Link>
                <UserButton />
            </div>
        </header>
    );
}

export default Header;

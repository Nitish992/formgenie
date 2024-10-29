
import Link from "next/link";
import { UserButton } from "@clerk/nextjs";



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

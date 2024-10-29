import { NotepadText } from "lucide-react";
import { Button } from "@/components/ui/button";
import { SignInButton, SignedIn, SignedOut, UserButton } from "@clerk/nextjs";
import Image from 'next/image'
function LandingHeader() {
    return (
        <header className="w-full h-[80px] flex justify-between items-center px-4 md:px-6 bg-white bg-opacity-90 backdrop-filter backdrop-blur-md shadow-md sticky top-0 z-50">
            <div className="font-bold text-xl md:text-4xl flex items-center">
                {/* <FormInputIcon className="w-6 h-6 mr-2" /> */}
                {/* <BookText className="w-6 h-6 mr-2" /> */}
                {/* <NotepadText className="w-6 h-6 mr-2" /> */}
                <Image
                    src="/logo.png"
                    width={70}
                    height={70}
                    className="p-2"
                    alt=""
                />
                ForMatic
            </div>

            <nav>
                <ul className="flex items-center gap-4 ">
                    <li>
                        <Button variant="link" className="text-black">Home</Button>
                    </li>
                    {/* <li>
                        <Button variant="link">About</Button>
                    </li>
                    <li>
                        <Button variant="link">Services</Button>
                    </li>
                    <li>
                        <Button variant="link">Contact</Button>
                    </li> */}
                    <li>
                        <SignedOut>
                            <Button asChild>
                                <SignInButton mode="modal" forceRedirectUrl="/dashboard" />
                            </Button>
                        </SignedOut>
                        <SignedIn>
                            <UserButton afterSignOutUrl="/" />
                        </SignedIn>
                    </li>
                </ul>
            </nav>
        </header>
    );
}

export default LandingHeader;
import Image from 'next/image'
function SubmitFormHeader() {
    return (
        <header className="w-full h-[80px] flex justify-between items-center px-4 md:px-6 bg-white bg-opacity-90 backdrop-filter backdrop-blur-md shadow-md sticky top-0 z-50">
            <div className="flex items-center space-x-2">
                <Image
                    src="/logo.png"
                    width={70}
                    height={70}
                    className="p-2"
                    alt=""
                />
                <p className="text-xl font-bold md:text-4xl flex items-center tracking-widest">ForMatic</p>
            </div>
        </header >
    );
}

export default SubmitFormHeader;

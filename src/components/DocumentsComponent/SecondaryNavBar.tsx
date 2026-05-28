    const sections = [
        "Getting Started",
        "Developers Guide",
        "Non - Developers Guide",
        "Contact us",
        "tutorial",
        "status"
    ]
type SecondaryBarProps = {
    setCurrentSection: React.Dispatch<React.SetStateAction<string>>;
};

const SecondaryBar = ({ setCurrentSection }: SecondaryBarProps) => {
    return (
      <div className="bg-[#ffffff] flex border-b items-center border-[#dee3ea] w-full h-full px-4 overflow-hidden">
            <div className="flex gap-6 w-auto h-[80%]">
                {sections.map((section, idx) => (
                    <button key={idx} className="text-sm w-fit p-2 hover:bg-[#dee3ea] rounded cursor-pointer flex items-center" onClick={()=>setCurrentSection(section)} >{section}</button>
                ))}
            </div>
        </div>
    )
}
export default SecondaryBar
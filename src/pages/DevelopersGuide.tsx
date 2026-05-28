import { useState } from "react"

import NavBar from "../components/DocumentsComponent/navBar"
import SecondaryBar from "../components/DocumentsComponent/SecondaryNavBar"

import GettingStarted from "../components/DocumentsComponent/GettingStarted"
const DevelopersGuide = () => {

    const [currentSection, setCurrentSection] = useState("Getting Started")

    const selectedSection: Record<string, React.ReactElement> = {
        "Getting Started" : <GettingStarted/>,
        // "Developers Guide",
        // "Non - Developers Guide",
        // "Contact us",
        // "tutorial",
        // "status"
    }

    return (
<div className="w-screen flex items-center flex-col h-screen">
  <div className="relative w-full flex-col h-[15%] bg-[#f9f8f7]">
    <div className="absolute w-full top-0 h-[50%]"><NavBar /></div>
    <div className="absolute w-full bottom-0 h-[50%]"><SecondaryBar setCurrentSection={setCurrentSection} /></div>
  </div>
  <div className="flex-1 w-full h-[85%] items-center  overflow-auto">
    {selectedSection[currentSection] ?? <div>Coming</div>}
  </div>
</div>
    )
}

export default DevelopersGuide
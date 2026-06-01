
import { Outlet } from "react-router-dom"
import NavBar from "../components/DocumentsComponent/navBar"
import SecondaryBar from "../components/DocumentsComponent/SecondaryNavBar"

const DevelopersGuide = () => {

      return (
    <div className="w-screen flex flex-col h-screen bg-white dark:bg-zinc-950 transition-colors duration-200">
 
      {/* Top nav + secondary bar — always visible */}
      <div className="flex-shrink-0 w-full" style={{ height: "15%" }}>
        <div className="h-[50%] w-full">
          <NavBar />
        </div>
        <div className="h-[50%] w-full">
          <SecondaryBar />
        </div>
      </div>
 
      {/* Main content — only this changes per route */}
      <div className="flex-1 w-full overflow-hidden">
        <Outlet />
      </div>
 
    </div>
  );
};

export default DevelopersGuide
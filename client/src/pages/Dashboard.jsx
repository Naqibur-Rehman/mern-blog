import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { AiFillCloseCircle } from "react-icons/ai";

import DashSidebar from "../components/DashSidebar";
import DashProfile from "../components/DashProfile";
import { HiMenu } from "react-icons/hi";

const Dashboard = () => {
  const location = useLocation();
  const [tab, setTab] = useState("");
  const [toggleSidebar, setToggleSidebar] = useState(false);
  useEffect(() => {
    const urlParams = new URLSearchParams(location.search);
    const tabFromUrl = urlParams.get("tab");
    setTab(tabFromUrl);
  }, [location.search]);

  return (
    <div className="min-h-screen flex justify-start items-start">
      {/* sidebar */}
      <div className="hidden md:flex h-screen flex-initial">
        <DashSidebar />
      </div>
      <div className="flex md:hidden ">
        <div className="p-2 flex flex-row justify-between items-center shadow-md">
          <HiMenu
            size={24}
            className="cursor-pointer"
            onClick={() => setToggleSidebar(true)}
          />
        </div>
        {toggleSidebar && (
          <div className="fixed w-3/5 dark:bg-gray-800 h-screen overflow-y-auto shadow-md z-10 animate-slide-in">
            <div className="absolute w-full flex justify-end items-center p-2 ">
              <AiFillCloseCircle
                fontSize={24}
                className="cursor-pointer"
                onClick={() => setToggleSidebar(false)}
              />
            </div>
            <DashSidebar closeToggle={setToggleSidebar} />
          </div>
        )}
      </div>
      {/* profile ... */}
      <div className="w-5/6">{tab === "profile" && <DashProfile />}</div>
    </div>
  );
};

export default Dashboard;

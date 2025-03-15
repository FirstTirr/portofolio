import NavHome from "./NavHome";
import NavMenu from "./NavMenu";
import { useEffect } from "react";

export default function Nav() {
  useEffect(() => {
    // Debug log to verify the component is rendering
    console.log("Nav component mounted");
  }, []);

  return (
    <nav className="pointer-events-none fixed z-[999] h-full w-full">
      {/* Test element to verify z-index and positioning */}
      <div className="absolute top-0 left-0 p-4 bg-red-500 text-white">
        Test Element
      </div>
      
      <NavHome />
      <NavMenu />
    </nav>
  );
}
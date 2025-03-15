import NavHome from "./NavHome";
import NavMenu from "./NavMenu";

export default function Nav() {

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
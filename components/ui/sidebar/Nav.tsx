import NavHome from "./NavHome";
import NavMenu from "./NavMenu";


export default function Nav() {

  return (
    <nav className="pointer-events-none fixed z-[999] h-full w-full">
      {/* Test element to verify z-index and positioning */}
      
      
      <NavHome />
      <NavMenu />
    </nav>
  );
}
//@ts-nocheck
"use client";

import useIsomorphicLayoutEffect from "@/components/hooks/useIsomorphicLayoutEffect";
import { cn } from "@/lib/utils";
import gsap from "gsap";
import { useRef, useState } from "react";
import MagneticEffect from "@/components/providers/MagneticEffect";
import NavMenuBtn from "./NavBtn";
import NavMenuLine from "./NavLine";
import NavMenuLink from "./NavLink";
import NavMenuSocial from "./NavSocial";
import { useRouter } from "next/navigation";

export default function NavMenu() {
  const [active, setActive] = useState<boolean>(false);
  const menuRef = useRef<HTMLDivElement | null>(null);
  const menuBgRef = useRef<HTMLDivElement | null>(null);

  const toggleHamburger = (status: boolean) => {
    setActive(status);
  };

  useIsomorphicLayoutEffect(() => {
    gsap.context(() => {
      if (active) {
        gsap.to(menuRef.current, { x: 0, duration: 0.8, ease: "power3.inOut" });
        gsap.to(".nav-rounded", {
          scaleX: 0,
          duration: 0.8,
          ease: "power3.inOut",
        });
        gsap.to(menuBgRef.current, {
          opacity: 1,
          duration: 0.8,
          ease: "power3.inOut",
        });
      } else {
        gsap.to(menuRef.current, {
          x: "140%",
          duration: 0.8,
          ease: "power3.inOut",
        });
        gsap.to(".nav-rounded", {
          scaleX: 1,
          duration: 0.8,
          ease: "power3.inOut",
        });
        gsap.to(menuBgRef.current, {
          opacity: 0,
          duration: 0.8,
          ease: "power3.inOut",
        });
      }
    }, menuRef);
  }, [active]);

  const handleKeyDown = (e: KeyboardEvent) => {
    if (e.key === "Escape") {
      setActive(false);
    }
  };

  // Updated handleScroll function using window.scrollTo for smooth scrolling
  const handleScroll = (id: string) => {
    const element = document.querySelector(id);
    if (element) {
      window.scrollTo({
        top: element.getBoundingClientRect().top + window.pageYOffset,
        behavior: "smooth",
      });
      setActive(false); // Close the menu after scrolling
    }
  };

  const router = useRouter();

  return (
    <>
      <div
        ref={menuBgRef}
        className={cn(
          "nav-menu-bg absolute left-0 top-0 h-screen w-full bg-gradient-to-r from-black/[.13] via-black/[.16] to-black/[.35] opacity-0",
          active ? "pointer-events-auto" : "pointer-events-none",
        )}
        onClick={() => setActive(false)}
        onKeyDown={() => handleKeyDown}
      ></div>
      <div
        ref={menuRef}
        className={cn(
          "nav-menu pointer-events-auto absolute right-0 top-0 flex h-full w-full max-w-lg translate-x-[150%] flex-col justify-between bg-zinc-800 pb-12 pt-[clamp(3.5rem,10vh,5rem)] text-6xl text-white will-change-transform [-webkit-perspective:1000] dark:bg-zinc-200",
        )}
      >
        <div className="nav-rounded absolute left-0 top-[-10%] z-[-1] h-[120%] w-[80%] -translate-x-1/2 rounded-[100%_100%] bg-zinc-800 will-change-transform [-webkit-perspective:1000] dark:bg-zinc-200"></div>
        <div>
          <NavMenuLine title={"Navigation 🧭"} />
        </div>
        <div>
          <MagneticEffect>
            <NavMenuLink
              title={"Home"}
              active={active}
              duration={1}
              handleScroll={() => handleScroll("#hero")}
            />
          </MagneticEffect>
          <MagneticEffect>
            <NavMenuLink
              title={"About"}
              active={active}
              duration={1}
              handleScroll={() => handleScroll("#about")}
            />
          </MagneticEffect>
          <MagneticEffect>
            <NavMenuLink
              title={"Testimonials"}
              active={active}
              duration={1.2}
              handleScroll={() => handleScroll("#testimonials")}
            />
          </MagneticEffect>
          <MagneticEffect>
            <NavMenuLink
              title={"Skills"}
              active={active}
              duration={1.3}
              handleScroll={() => handleScroll("#skills")}
            />
          </MagneticEffect>
          <MagneticEffect>
            <NavMenuLink
              title={"Projects"}
              active={active}
              duration={1.3}
              handleScroll={() => {
                router.push("/projects");
              }}
            />
          </MagneticEffect>
        </div>
        <div>
          <NavMenuLine title={"Links"} />
          <div className="flex gap-x-2 px-[clamp(1.25rem,3vw,2.5rem)] text-base">
            <MagneticEffect>
              <NavMenuSocial
                title="Github"
                active={active}
                classes="pr-6"
                duration={1}
                link="https://github.com/dityaperdana"
              />
            </MagneticEffect>
            <MagneticEffect>
              <NavMenuSocial
                title="Dicoding"
                active={active}
                classes="pr-6"
                duration={1.2}
                link="https://www.dicoding.com/users/raditya_alfarisi/academies"
              />
            </MagneticEffect>
            <MagneticEffect>
              <NavMenuSocial
                title="Instagram"
                active={active}
                classes="pr-6"
                duration={1.4}
                link="https://www.instagram.com/radityaalfarisi2009/_"
              />
            </MagneticEffect>
            <MagneticEffect>
              <NavMenuSocial
                title="Tiktok"
                active={active}
                classes="pr-6"
                duration={1.6}
                link="https://www.tiktok.com/@ditya_perdana?is_from_webapp=1&sender_device=pc"
              />
            </MagneticEffect>
            <MagneticEffect>
              <NavMenuSocial
                title="Email"
                active={active}
                classes="pr-6"
                duration={1.8}
                link="mailto:athallarafardhan44@gmail.com"
              />
            </MagneticEffect>
          </div>
          <div className="flex px-[clamp(1.25rem,3vw,2.5rem)]">
          </div>
        </div>
      </div>
      <NavMenuBtn active={active} toggleHamburger={toggleHamburger} />
    </>
  );
}
import About from "@/components/About";
import Skill from "@/components/Skill";
import Footer from "@/components/Footer";
import { InteractiveHoverButton } from "@/components/magicui/interactive-hover-button";
import { VelocityScroll } from "@/components/magicui/scroll-based-velocity";
import { TypingAnimation } from "@/components/magicui/typing-animation";
import ThemeToggle from "@/components/ThemeToggle";
import { ContainerScroll } from "@/components/ui/container-scroll-animation";
import { div } from "framer-motion/client";
import Image from "next/image";
import { RippleButton } from "@/components/magicui/ripple-button";
import Link from "next/link";

export default function Home() {
  return (
    <>
      <div className="flex flex-col items-center justify-center relative">
        <div className="min-h-screen sm:translate-y-36 translate-y-[14rem] flex-col grid grid-rows-[20px_1fr_20px] items-center justify-items-center p-8 pb-20 gap-9 sm:p-20 font-[family-name:var(--font-geist-sans)]">
          <TypingAnimation className="text-blue-400 text-center text-8xl font-black italic">
            FATHIR ADZAN SATIA
          </TypingAnimation>
        </div>

        <div className="px-9 flex sm:flex-row flex-col gap-2 sm:gap-[7rem] md:gap-[5rem] justify-center -mt-96 lg:-mt-[30rem]">
          <InteractiveHoverButton>Download CV</InteractiveHoverButton>

          <InteractiveHoverButton><Link href="./project">project</Link></InteractiveHoverButton>
            

          <InteractiveHoverButton><Link href="https://wa.me/6281266591758">My WhatsApp</Link></InteractiveHoverButton>
        </div>
        <VelocityScroll
          numRows={1}
          defaultVelocity={7}
          className="mt-28 min-h-screen min-w-full"
        >
          King Madrid
        </VelocityScroll>
      </div>

      <About />
      <Skill />
      <Footer />
    </>
  );
}

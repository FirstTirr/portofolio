import { InteractiveHoverButton } from "@/components/magicui/interactive-hover-button";
import { VelocityScroll } from "@/components/magicui/scroll-based-velocity";
import { TypingAnimation } from "@/components/magicui/typing-animation";
import { ScratchToReveal } from "./ui/scratch-to-reveal";
import Link from "next/link";

export default function Home() {
  return (
    <>
      <div className="flex flex-col items-center justify-center relative">
        <div className="overflow-hidden min-h-[100vh] min-w-full flex flex-col items-center justify-center relative pb-20 gap-9 font-[family-name:var(--font-geist-sans)]">
          <TypingAnimation className="text-blue-400 text-center text-8xl sm:text-8xl md:text-9xl lg:text-[7rem] font-black italic ">
            FATHIR ADZAN SATIA
          </TypingAnimation>
        </div>

        <div className="px-9 flex flex-col sm:flex-row gap-4 sm:gap-8 md:gap-12 justify-center -mt-[10rem] sm:-mt-[9rem] md:-mt-[29rem] lg:-mt-[25rem]">
          <InteractiveHoverButton>
            <Link href="/cv">Download CV</Link>
          </InteractiveHoverButton>

          <InteractiveHoverButton>
            <Link href="/project">My Project</Link>
          </InteractiveHoverButton>

          <InteractiveHoverButton>
            <Link href="https://wa.me/6281266591758">My WhatsApp</Link>
          </InteractiveHoverButton>
        </div>

        <div className="mt-16 flex flex-col sm:flex-row items-center sm:items-start gap-8 sm:gap-12">
          <p className="text-center sm:text-left text-3xl font-bold text-gray-600 dark:text-gray-300 sm:mr-4 sm:mt-4 md:mt-23 lg:mt-27">
            Scratch <span className="text-blue-400">For My</span> Photo{" "}
            <span className="sm:hidden">👇</span>
            <span className="hidden sm:inline">👉</span>
          </p>

          <ScratchToReveal
            width={320}
            height={320}
            minScratchPercentage={70}
            className="flex items-center justify-center overflow-hidden rounded-2xl border-2 bg-gray-100"
            gradientColors={["#A97CF8", "#F38CB8", "#FDCC92"]}
          >
            <p className="text-9xl">
              <img src="foto-home.jpg" alt="me" />
            </p>
          </ScratchToReveal>
        </div>

        <VelocityScroll
          numRows={1}
          defaultVelocity={7}
          className="mt-28 min-h-screen min-w-full"
        >
          Frontend Developer
        </VelocityScroll>
      </div>
    </>
  );
}
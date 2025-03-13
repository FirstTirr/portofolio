import { p } from "framer-motion/client";
import React from "react";
import { SkillContainer } from "@/components/ui/SkillContainer";
import { CardBody, CardContainer, CardItem } from "./ui/3d-card";
import { Link } from "lucide-react";

const Skill = () => {
  return (
    <>
      <div className="text-center text-4xl font-bold -mt-96">
        <p>My Achievment</p>
        <div className="flex justify-center space-x-10 mt-10">
          <CardContainer className="inter-var">
            <CardBody className="bg-gray-50 relative group/card dark:hover:shadow-2xl dark:hover:shadow-emerald-500/[0.1] dark:bg-black dark:border-white/[0.2] border-black/[0.1] w-auto sm:w-[30rem] h-auto rounded-xl p-6 border">
              <CardItem
                translateZ="50"
                className="text-xl font-bold text-neutral-600 dark:text-white"
              >
                Sertifikat Kemalasan
              </CardItem>
              <CardItem
                as="p"
                translateZ="60"
                className="text-neutral-500 text-sm max-w-sm mt-2 dark:text-neutral-300"
              >
                Ingin Menjadi Programmer Namun Enggan Ngoding
              </CardItem>
              <CardItem translateZ="100" className="w-full mt-4">
                <img
                  src="malas.jpg"
                  height="1000"
                  width="1000"
                  className="h-60 w-full object-cover rounded-xl group-hover/card:shadow-xl"
                  alt="thumbnail"
                />
              </CardItem>
              <div className="flex justify-between items-center mt-20">
                {/* <CardItem
                  translateZ={20}
                  href="https://twitter.com/mannupaaji"
                  target="__blank"
                  className="px-4 py-2 rounded-xl text-xs font-normal dark:text-white"
                >
                </CardItem>
                <CardItem
                  translateZ={20}
                  as="button"
                  className="px-4 py-2 rounded-xl bg-black dark:bg-white dark:text-black text-white text-xs font-bold"
                >
                </CardItem> */}
              </div>
            </CardBody>
          </CardContainer>

          <CardContainer className="inter-var">
            <CardBody className="bg-gray-50 relative group/card dark:hover:shadow-2xl dark:hover:shadow-emerald-500/[0.1] dark:bg-black dark:border-white/[0.2] border-black/[0.1] w-auto sm:w-[30rem] h-auto rounded-xl p-6 border">
              <CardItem
                translateZ="50"
                className="text-xl font-bold text-neutral-600 dark:text-white"
              >
                Sertifikat Python
              </CardItem>
              <CardItem
                as="p"
                translateZ="60"
                className="text-neutral-500 text-sm max-w-sm mt-2 dark:text-neutral-300"
              >
                Menguasai Dasar-dasar Pemrograman Python
              </CardItem>
              <CardItem translateZ="100" className="w-full mt-4">
                <img
                  src="py.svg"
                  height="1000"
                  width="1000"
                  className="h-60 w-full object-cover rounded-xl group-hover/card:shadow-xl"
                  alt="thumbnail"
                />
              </CardItem>
              <div className="flex justify-between items-center mt-20">
                {/* <CardItem
                  translateZ={20}
                  href="https://twitter.com/mannupaaji"
                  target="__blank"
                  className="px-4 py-2 rounded-xl text-xs font-normal dark:text-white"
                >
                </CardItem>
                <CardItem
                  translateZ={20}
                  as="button"
                  className="px-4 py-2 rounded-xl bg-black dark:bg-white dark:text-black text-white text-xs font-bold"
                >
                </CardItem> */}
              </div>
            </CardBody>
          </CardContainer>
        </div>
      </div>
    </>
  );
};

export default Skill;
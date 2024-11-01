"use client";
import React from "react";
import { MacbookScroll } from "../ui/macbook-scroll";
import Link from "next/link";

const Hero = () => {
  return (
    <div className="overflow-hidden dark:bg-[#0B0B0F] bg-white w-full">
      <MacbookScroll
        title={
          <span className="font-bold text-6xl">
            Create amazing agents with <br/>no-code flows.
          </span>
        }
        badge={
          <Link href="https://peerlist.io/manuarora">
          </Link>
        }
        src={`/image.png`}
        showGradient={false}
      />
    </div>
  );
};

export default Hero;

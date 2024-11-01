'use client';
import React from 'react';
import { MacbookScroll } from '../ui/macbook-scroll';
import Link from 'next/link';

const Hero = () => {
  return (
    <div className="w-full overflow-hidden bg-white dark:bg-[#0B0B0F]">
      <MacbookScroll
        title={
          <span className="text-6xl font-bold">
            Create amazing agents with <br />
            no-code flows.
          </span>
        }
        badge={<Link href="https://peerlist.io/manuarora"></Link>}
        src={`/image.png`}
        showGradient={false}
      />
    </div>
  );
};

export default Hero;

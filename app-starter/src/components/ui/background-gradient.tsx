"use client";
import { cn } from "@/lib/utils";
import React from "react";
import { motion } from "framer-motion";

export const BackgroundGradient = ({
  children,
  className,
  containerClassName,
  animate = true,
}: {
  children?: React.ReactNode;
  className?: string;
  containerClassName?: string;
  animate?: boolean;
}) => {
  const variants = {
    initial: {
      backgroundPosition: "0 50%",
    },
    animate: {
      backgroundPosition: ["0, 50%", "100% 50%", "0 50%"],
    },
  };
  return (
    <div className={cn("relative p-[4px] group", containerClassName)}>
      <motion.div
        variants={animate ? variants : undefined}
        initial={animate ? "initial" : undefined}
        animate={animate ? "animate" : undefined}
        transition={
          animate
            ? {
                duration: 5,
                repeat: Infinity,
                repeatType: "reverse",
              }
            : undefined
        }
        style={{
          backgroundSize: animate ? "400% 400%" : undefined,
        }}
        className={cn(
          "absolute inset-0 z-[1] opacity-90 group-hover:opacity-100 blur-xl transition duration-100 will-change-transform",
          "bg-[radial-gradient(circle_farthest-side_at_0_100%,#18CCFC,transparent),radial-gradient(circle_farthest-side_at_100%_0,#6344F5,transparent),radial-gradient(circle_farthest-side_at_100%_100%,#AE48FF,transparent),radial-gradient(circle_farthest-side_at_0_0,#1ca0fb,#141316),radial-gradient(circle_farthest-side_at_50%_50%,#ff6b81,transparent),radial-gradient(circle_farthest-side_at_25%_25%,#7a7dff,transparent),radial-gradient(circle_farthest-side_at_75%_75%,#ffcb6b,transparent)]"
        )}
        /*
            #18CCFC: Starts as a light cyan/blue.
#6344F5: A purple hue.
#AE48FF: A soft violet, transitioning to zero opacity at the end.

          */
      />

      <div className={cn("relative z-10", className)}>{children}</div>
    </div>
  );
};

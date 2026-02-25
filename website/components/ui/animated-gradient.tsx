"use client";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";

export const AnimatedGradientBackground = ({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) => {
  return (
    <div className={cn("relative overflow-hidden", className)}>
      <motion.div
        className="absolute inset-0 z-0"
        animate={{
          background: [
            "radial-gradient(circle at 0% 0%, rgba(23, 23, 23, 0.08) 0%, transparent 50%)",
            "radial-gradient(circle at 100% 0%, rgba(64, 64, 64, 0.08) 0%, transparent 50%)",
            "radial-gradient(circle at 100% 100%, rgba(115, 115, 115, 0.08) 0%, transparent 50%)",
            "radial-gradient(circle at 0% 100%, rgba(23, 23, 23, 0.08) 0%, transparent 50%)",
            "radial-gradient(circle at 0% 0%, rgba(23, 23, 23, 0.08) 0%, transparent 50%)",
          ],
        }}
        transition={{
          duration: 10,
          repeat: Infinity,
          ease: "linear",
        }}
      />
      {children}
    </div>
  );
};

export const FloatingOrbs = () => {
  return (
    <>
      <motion.div
        className="absolute top-0 right-0 w-[500px] h-[500px] rounded-full bg-gradient-to-br from-neutral-400/20 to-neutral-600/20 blur-3xl"
        animate={{
          x: [0, 50, 0],
          y: [0, -50, 0],
          scale: [1, 1.1, 1],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />
      <motion.div
        className="absolute bottom-0 left-0 w-[400px] h-[400px] rounded-full bg-gradient-to-br from-neutral-500/20 to-neutral-700/20 blur-3xl"
        animate={{
          x: [0, -30, 0],
          y: [0, 30, 0],
          scale: [1, 1.15, 1],
        }}
        transition={{
          duration: 10,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />
      <motion.div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-gradient-to-br from-neutral-300/15 to-neutral-500/15 blur-3xl"
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.3, 0.5, 0.3],
        }}
        transition={{
          duration: 6,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />
    </>
  );
};

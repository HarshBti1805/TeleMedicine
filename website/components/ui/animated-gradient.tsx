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
            "radial-gradient(circle at 0% 0%, rgba(99, 102, 241, 0.15) 0%, transparent 50%)",
            "radial-gradient(circle at 100% 0%, rgba(139, 92, 246, 0.15) 0%, transparent 50%)",
            "radial-gradient(circle at 100% 100%, rgba(168, 85, 247, 0.15) 0%, transparent 50%)",
            "radial-gradient(circle at 0% 100%, rgba(99, 102, 241, 0.15) 0%, transparent 50%)",
            "radial-gradient(circle at 0% 0%, rgba(99, 102, 241, 0.15) 0%, transparent 50%)",
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
        className="absolute top-0 right-0 w-[500px] h-[500px] rounded-full bg-gradient-to-br from-indigo-500/30 to-purple-500/30 blur-3xl"
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
        className="absolute bottom-0 left-0 w-[400px] h-[400px] rounded-full bg-gradient-to-br from-purple-500/30 to-pink-500/30 blur-3xl"
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
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-gradient-to-br from-blue-500/20 to-indigo-500/20 blur-3xl"
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

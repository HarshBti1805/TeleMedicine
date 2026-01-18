"use client";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";

export const BentoGrid = ({
  className,
  children,
}: {
  className?: string;
  children?: React.ReactNode;
}) => {
  return (
    <div
      className={cn(
        "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-7xl mx-auto",
        className
      )}
    >
      {children}
    </div>
  );
};

export const BentoGridItem = ({
  className,
  title,
  description,
  header,
  icon,
  gradient,
}: {
  className?: string;
  title?: string | React.ReactNode;
  description?: string | React.ReactNode;
  header?: React.ReactNode;
  icon?: React.ReactNode;
  gradient?: string;
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
      whileHover={{ scale: 1.02, y: -5 }}
      className={cn(
        "relative overflow-hidden rounded-3xl group/bento hover:shadow-2xl transition-all duration-500 border border-white/20 bg-white/70 backdrop-blur-xl p-6",
        className
      )}
    >
      <div className={cn(
        "absolute inset-0 opacity-0 group-hover/bento:opacity-100 transition-opacity duration-500 bg-gradient-to-br",
        gradient || "from-indigo-500/10 to-purple-500/10"
      )} />
      <div className="relative z-10">
        {header}
        <div className="mt-4">
          <div className="flex items-center gap-3 mb-3">
            {icon && (
              <motion.div
                whileHover={{ rotate: [0, -10, 10, 0] }}
                transition={{ duration: 0.5 }}
                className="text-4xl"
              >
                {icon}
              </motion.div>
            )}
            <h3 className="font-neue-bold text-xl text-gray-900 group-hover/bento:text-indigo-600 transition-colors">
              {title}
            </h3>
          </div>
          <p className="text-gray-600 font-poppins text-sm leading-relaxed">
            {description}
          </p>
        </div>
        <motion.div
          className={cn("mt-4 h-1 w-0 group-hover/bento:w-full transition-all duration-500 rounded-full bg-gradient-to-r", gradient || "from-indigo-500 to-purple-500")}
        />
      </div>
    </motion.div>
  );
};

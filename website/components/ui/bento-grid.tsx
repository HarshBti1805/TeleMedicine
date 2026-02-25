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
        "relative overflow-hidden rounded-2xl group/bento hover:shadow-lg transition-all duration-300 border border-neutral-200 bg-white p-6",
        className
      )}
    >
      <div className="absolute inset-0 opacity-0 group-hover/bento:opacity-100 transition-opacity duration-300 bg-neutral-100" />
      <div className="relative z-10">
        {header}
        <div className="mt-4">
          <div className="flex items-center gap-3 mb-3">
            {icon && (
              <motion.div
                whileHover={{ rotate: [0, -5, 5, 0] }}
                transition={{ duration: 0.4 }}
                className="relative z-20"
              >
                <div className="text-4xl [&>svg]:text-neutral-700 group-hover/bento:[&>svg]:text-neutral-900 transition-colors duration-300">
                  {icon}
                </div>
              </motion.div>
            )}
            <h3 className="font-neue-bold text-lg text-neutral-900 transition-colors duration-300">
              {title}
            </h3>
          </div>
          <p className="text-neutral-600 text-sm leading-relaxed">
            {description}
          </p>
        </div>
        <motion.div className="mt-4 h-0.5 w-0 group-hover/bento:w-full transition-all duration-500 rounded-full bg-neutral-800" />
      </div>
    </motion.div>
  );
};

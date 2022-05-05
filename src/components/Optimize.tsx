import classes from "@/utils/Classes";
import React from "react";

type OptimizeProps = {
  className?: string;
  onToggle: () => void;
  isOptimized: boolean;
  maxSize: { x: number; y: number };
};

const Optimize: React.FC<OptimizeProps> = ({
  className,
  isOptimized,
  maxSize,
  onToggle,
}: OptimizeProps) => {
  return (
    <div
      className={classes(
        "bg-white/40 px-4 py-2 rounded-md transition-colors text-gray-700 hover:bg-sky-200 hover:text-white dark:bg-black/40 dark:text-gray-200 dark:hover:bg-black/60 cursor-pointer",
        className || "",
        isOptimized ? "bg-sky-100 dark:bg-fuchsia-900" : ""
      )}>
      <div
        onClick={onToggle}
        className="flex justify-between content-center items-center align-middle">
        <div>
          <p className="text-l mb-1">
            {isOptimized ? "Optimized" : "Optimize"} for screen
          </p>
          <p className="text-xs font-light opacity-70">
            Generates {maxSize.x} by {maxSize.y} tiles
          </p>
        </div>
        <div>
          <div
            className={classes(
              "w-7 h-4 bg-black/10 dark:bg-white/10 rounded-full flex border-2 border-transparent transition-colors",
              isOptimized ? "bg-sky-300 dark:bg-fuchsia-700" : ""
            )}>
            <div
              className={classes(
                "w-3 h-3 rounded-full bg-black/30 dark:bg-white/30 float-right transition-all",
                isOptimized ? "translate-x-full bg-sky-500" : ""
              )}></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Optimize;

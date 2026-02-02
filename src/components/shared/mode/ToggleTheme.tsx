"use client";

import * as React from "react";
import {Lightbulb} from "lucide-react";
import {useTheme} from "next-themes";

export function ModeToggle() {
  const {theme, setTheme} = useTheme();
  const [mounted, setMounted] = React.useState(false);

  // Ensure the component is mounted before rendering theme-dependent content
  React.useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    // Render nothing or a placeholder during SSR
    return (
      <div className="flex flex-col items-center justify-center cursor-pointer">
        <hr className="bg-foreground mb-0 rotate-90" />
        <span className="flex items-center justify-center h-11 w-11 mt-4 text-foreground font-bold ring-1 ring-foreground bg-primary rounded-full p-2">
          <Lightbulb
            size={24}
            className="rotate-180 text-[1.8rem] hover:text-primary transition-colors duration-200 ease-in-out"
          />
        </span>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center justify-center cursor-pointer">
      {theme === "dark" ? (
        <div
          onClick={() => setTheme("light")}
          className="flex flex-col items-center justify-center"
        >
          <hr className="w-12 h-[2px] bg-foreground mb-1 rotate-90" />
          <span className="flex items-center justify-center h-12 w-12 mt-2 text-foreground font-bold ring-2 ring-foreground shadow-2xl bg-primary rounded-full p-2">
            <Lightbulb className="rotate-180 text-lg hover:scale-95" />
          </span>
        </div>
      ) : (
        <div
          onClick={() => setTheme("dark")}
          className="flex flex-col items-center justify-center"
        >
          <hr className="w-12 h-[2px] bg-primary mb-1 rotate-90" />
          <span className="flex items-center justify-center h-12 w-12 mt-2 icon p-1">
            <Lightbulb className="rotate-180 text-lg hover:scale-95" />
          </span>
        </div>
      )}
      <span className="sr-only">Toggle Theme</span>
    </div>
  );
}

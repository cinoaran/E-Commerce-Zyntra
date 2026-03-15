import * as React from "react";

import {cn} from "@/lib/utils";

interface InputProps extends React.ComponentProps<"input"> {
  suffix?: React.ReactNode;
}

function Input({className, type, suffix, ...props}: InputProps) {
  return (
    <div className="relative w-full">
      <input
        type={type}
        data-slot="input"
        className={cn(
          "file:text-foreground placeholder:text-foreground/50 selection:bg-primary selection:text-primary-foreground dark:bg-input/30 border-input h-9 w-full min-w-0 rounded-md border bg-transparent px-3 py-1 text-base shadow-xs transition-[color,box-shadow] outline-none file:inline-flex file:h-7 file:border-0 file:bg-transparent file:text-sm file:font-medium disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50 md:text-sm",
          "focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px]",
          "aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive",
          suffix ? "pr-8" : "",
          className,
        )}
        {...props}
      />
      {suffix && (
        <span className="absolute right-2 top-1/2 -translate-y-1/2 flex items-center cursor-pointer">
          {suffix}
        </span>
      )}
    </div>
  );
}

export {Input};

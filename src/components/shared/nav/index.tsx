"use client";
import React from "react";
import {FileQuestion, HomeIcon, MessageSquareMore} from "lucide-react";
import Link from "next/link";
import {usePathname} from "next/navigation";

const Main = () => {
  const pathname = usePathname();
  return (
    <div className="flex items-start justify-center mr-6">
      <ul className="flex flex-col items-start gap-3">
        <li
          className={`flex items-center justify-start gap-1 ${
            pathname === "/"
              ? "text-primary font-semibold"
              : "text-sheet-foreground/50"
          }`}
        >
          <Link
            href={`/`}
            className="flex items-center justify-center gap-1 w-fit underlined uppercase"
          >
            <HomeIcon
              className="size-[0.95rem]"
              strokeWidth={pathname === "/" ? 3 : 2}
            />
            Home
          </Link>
        </li>
        <li
          className={`flex items-center justify-center gap-1 ${
            pathname === "/blog"
              ? "text-primary font-semibold"
              : "text-sheet-foreground/50"
          }`}
        >
          <Link
            href={`/blog`}
            className="flex items-center justify-center gap-1 w-fit underlined uppercase"
          >
            <MessageSquareMore
              className="size-[0.95rem]"
              strokeWidth={pathname === "/" ? 3 : 2}
            />
            Blog
          </Link>
        </li>
        <li
          className={`flex items-center justify-center gap-1 ${
            pathname === "/faq"
              ? "text-primary font-semibold"
              : "text-sheet-foreground/50"
          }`}
        >
          <Link
            href={`/faq`}
            className="flex items-center justify-center gap-1 w-fit underlined uppercase"
          >
            <FileQuestion
              className="size-[0.95rem]"
              strokeWidth={pathname === "/" ? 3 : 2}
            />
            FAQ
          </Link>
        </li>
      </ul>
    </div>
  );
};

export default Main;

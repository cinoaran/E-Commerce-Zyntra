"use client";
import React from "react";
import {FileQuestion, HomeIcon, MessageSquareMore} from "lucide-react";
import Link from "next/link";
import {usePathname} from "next/navigation";

const Main = () => {
  const pathname = usePathname();
  return (
    <div className="flex items-start justify-center mr-6">
      <ul className="flex flex-col items-start gap-6">
        <li
          className={`flex items-start justify-center gap-1 ${
            pathname === "/"
              ? "text-primary font-semibold"
              : "text-sheet-foreground"
          }`}
        >
          <Link
            href={`/`}
            className="flex items-center justify-start gap-2 w-fit h-9 underlined uppercase"
          >
            <HomeIcon
              className="size-[0.9rem]"
              strokeWidth={pathname === "/" ? 3 : 2}
            />
            Home
          </Link>
        </li>
        <li
          className={`flex items-start justify-center ${
            pathname === "/blog"
              ? "text-primary font-semibold"
              : "text-sheet-foreground"
          }`}
        >
          <Link
            href={`/blog`}
            className="flex items-center justify-start gap-2 w-fit h-9 underlined uppercase"
          >
            <MessageSquareMore
              className="size-[0.9rem]"
              strokeWidth={pathname === "/blog" ? 3 : 2}
            />
            Blog
          </Link>
        </li>
        <li
          className={`flex items-start justify-center ${
            pathname === "/faq"
              ? "text-primary font-semibold"
              : "text-sheet-foreground"
          }`}
        >
          <Link
            href={`/faq`}
            className="flex items-center justify-start gap-2 w-fit h-9 underlined uppercase"
          >
            <FileQuestion
              className="size-[0.9rem]"
              strokeWidth={pathname === "/faq" ? 3 : 2}
            />
            FAQ
          </Link>
        </li>
      </ul>
    </div>
  );
};

export default Main;

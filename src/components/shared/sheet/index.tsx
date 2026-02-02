"use client";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import {
  LayoutDashboardIcon,
  Menu,
  PenBoxIcon,
  User2,
  UserPlus,
} from "lucide-react";
import Main from "../nav";
import {Avatar, AvatarFallback, AvatarImage} from "@/components/ui/avatar";
import {usePathname} from "next/navigation";
import Link from "next/link";
import LogoutButton from "@/components/shared/authComponent/LogoutButton";
import AvatarEdit from "@/components/uploadthing/AvatarEdit";
import type {Session} from "@/lib/auth";

export function SheetNavigation({session}: {session: Session | null}) {
  const user = session?.user || null;
  const pathname = usePathname();

  const userLoggedIn = user && user.name !== undefined;

  return (
    <Sheet modal={true} /*open={true}  */>
      <SheetTrigger asChild aria-description="Navigation Trigger">
        <button
          className="flex items-center justify-center bg-primary shadow responsive-icon rounded-full border-2 border-primary-foreground hover:border-primary-foreground/10 hover:bg-transparent transition-colors duration-200 ease-in-out cursor-pointer z-10"
          aria-label="Open Navigation"
        >
          {userLoggedIn ? (
            <Avatar className="flex items-center justify-center bg-primary hover:bg-primary/30 ring-1 ring-white responsive-icon z-10 w-12 h-12">
              <AvatarImage
                src={user?.image || "/avatar/placeholder-avatar.webp"}
                alt="User profile image"
                className="w-11 h-11"
                aria-roledescription="Avatar image"
              />
              <AvatarFallback>
                <p
                  className="flex items-center justify-center text-white"
                  title="User Icon"
                >
                  <User2
                    size={22}
                    className="rounded-full hover:text-sheet-foreground/70 transition-colors duration-200 ease-in-out"
                  />
                  <span className="sr-only">User Icon</span>
                </p>
              </AvatarFallback>
              <span className="sr-only">User Image</span>
            </Avatar>
          ) : (
            <Menu strokeWidth={2} className="text-white" />
          )}
        </button>
      </SheetTrigger>
      <SheetContent
        aria-description="Navigation Slider"
        side="right"
        className="bg-background/10 backdrop-blur-xl border-sheet-border/30 shadow-md max-h-screen overflow-y-auto text-sheet-foreground"
      >
        <SheetHeader className="flex flex-col items-center justify-center gap-3 my-3 border-b border-sheet-foreground/30">
          <SheetTitle
            asChild
            className="flex items-center justify-center gap-1 uppercase text-sheet-foreground"
          >
            <h6>Navigation</h6>
          </SheetTitle>
          <SheetDescription>
            Make changes to your profile here.
          </SheetDescription>
        </SheetHeader>

        <div className="flex flex-col items-center justify-center h-full gap-3 my-3">
          <Main />
        </div>
        <SheetFooter className="flex flex-col items-center justify-center gap-3">
          {userLoggedIn ? (
            <>
              <SheetHeader className="flex flex-col items-center justify-center gap-3 border-b border-sheet-foreground/30">
                <div className="flex flex-col items-center justify-center gap-1">
                  {session && <AvatarEdit session={session} />}
                </div>

                <div className="flex flex-row items-start justify-center gap-5">
                  <p className="w-fit">
                    <Link
                      href={`/${user.role}`}
                      className="flex items-center justify-center gap-1 w-fit underlined uppercase"
                    >
                      <span
                        className={`flex items-center justify-center gap-1 h-10 max-text-[0.8rem] ${
                          pathname === `/${user.role}`
                            ? "text-primary font-semibold"
                            : "text-sheet-foreground/50"
                        }`}
                      >
                        <LayoutDashboardIcon className="size-[0.8rem]" />
                        <span className="h-5">Dashboard</span>
                      </span>
                    </Link>
                  </p>
                  <p className="w-fit">
                    <Link
                      href={`/${user.role}/profile`}
                      className="flex items-center justify-center gap-1 w-fit underlined uppercase"
                    >
                      <span
                        className={`flex items-center justify-center gap-1 h-10 max-text-[0.8rem] ${
                          pathname === `/${user.role}/profile`
                            ? "text-primary font-semibold"
                            : "text-sheet-foreground/50"
                        }`}
                      >
                        <UserPlus className="size-[0.9rem]" />
                        <span className="h-5">Profile</span>
                      </span>
                    </Link>
                  </p>
                </div>
              </SheetHeader>
              <LogoutButton />
            </>
          ) : (
            <>
              <div className="flex flex-col items-center justify-center gap-3 my-3 border-b border-sheet-foreground/30 w-[90%]">
                <SheetTitle asChild>
                  <h6 className="uppercase text-sheet-foreground">
                    Your Account
                  </h6>
                </SheetTitle>
              </div>

              <ul className="flex flex-col items-start justify-center md:flex-row gap-1 md:gap-12">
                <li
                  className={`flex items-center justify-center gap-1 ${
                    pathname === "/login"
                      ? "text-primary font-semibold"
                      : "text-sheet-foreground/50"
                  }`}
                >
                  <Link
                    href={`/login`}
                    className="flex items-center justify-start gap-1 w-fit underlined uppercase"
                  >
                    <UserPlus
                      className="size-[0.9rem]"
                      strokeWidth={pathname === "/" ? 3 : 2}
                    />
                    Login
                  </Link>
                </li>
                <li
                  className={`flex items-start justify-center gap-1 ${
                    pathname === "/register"
                      ? "text-primary font-semibold"
                      : "text-sheet-foreground/50"
                  }`}
                >
                  <Link
                    href={`/register`}
                    className="flex items-center justify-start gap-1 w-fit underlined uppercase"
                  >
                    <PenBoxIcon
                      className="size-[0.9rem]"
                      strokeWidth={pathname === "/" ? 3 : 2}
                    />
                    Register
                  </Link>
                </li>
              </ul>
            </>
          )}
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
}
export default SheetNavigation;

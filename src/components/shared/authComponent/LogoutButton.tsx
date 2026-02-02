"use client";

import {useRouter} from "next/navigation";
import {authClient} from "@/lib/auth-client";

import {useState} from "react";
import {Button} from "@/components/ui/button";
import Spinner from "@/components/Loader/Spinner";

export default function SignoutButton() {
  const router = useRouter();
  const [isPending, setIsPending] = useState(false);

  const handleSignOut = async () => {
    try {
      setIsPending(true);
      await authClient.signOut({
        fetchOptions: {
          onSuccess: () => {
            router.push("/login");
            router.refresh();
          },
        },
      });
    } catch (error) {
      console.error("Error signing out:", error);
    } finally {
      setIsPending(false);
    }
  };

  return (
    <Button
      type="submit"
      className="flex items-center justify-center gap-2 hover:text-sheet-foreground/70 uppercase cursor-pointer transition-colors duration-200 ease-in-out w-[90%] my-5"
      disabled={isPending}
      onClick={handleSignOut}
      variant="default"
      aria-label="Logout"
      role="button"
    >
      {isPending ? (
        <>
          <Spinner label="Please wait..." />
          <span className="sr-only">Please wait...</span>
        </>
      ) : (
        "Logout"
      )}
    </Button>
  );
}

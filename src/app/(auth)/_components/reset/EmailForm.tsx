"use client";
import {FieldValues, useForm} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {ResetEmailSchema} from "@/zod-schemas/auth/ResetEmailSchema";
import {z} from "zod";
import {Input} from "@/components/ui/input";
import {Button} from "@/components/ui/button";
import FormError from "@/components/shared/authComponent/FormError";
import FormSuccess from "@/components/shared/authComponent/FormSuccess";
import {useState} from "react";
import {useRouter} from "next/navigation";
import Spinner from "@/components/Loader/Spinner";

const ResetForm = () => {
  const router = useRouter();
  const [error, setError] = useState<string | undefined>("");
  const [success, setSuccess] = useState<string | undefined>("");
  const [isPending, setIsPending] = useState<boolean>(false);

  const form = useForm<z.infer<typeof ResetEmailSchema>>({
    resolver: zodResolver(ResetEmailSchema),
    mode: "onTouched",
    defaultValues: {
      email: "",
    },
  });

  const onSubmit = async (data: z.infer<typeof ResetEmailSchema>) => {
    setError("");
    setSuccess("");
    setIsPending(true);
    // Don't reveal whether the email exists (prevents account enumeration).
    // Always call the password reset endpoint and show a generic message.
    try {
      const base = process.env.NEXT_PUBLIC_API_URL || "";
      const url = `${base}/api/auth/request-password-reset`;

      const res = await fetch(url, {
        method: "POST",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify({
          email: data.email,
          redirectTo: "/reset-password",
        }),
      });

      if (res.status === 429) {
        const ra =
          res.headers.get("retry-after") || res.headers.get("Retry-After");
        let wait = "";
        if (ra) {
          const n = Number(ra);
          if (!Number.isNaN(n)) wait = `${n} seconds`;
          else {
            const then = Date.parse(ra);
            if (!Number.isNaN(then)) {
              const secs = Math.max(0, Math.ceil((then - Date.now()) / 1000));
              wait = `${secs} seconds`;
            }
          }
        }
        setError(`Too many requests. Try again ${wait || "later"}.`);
        setIsPending(false);
        return;
      }

      if (!res.ok) {
        setError("Password reset failed. Please try again later.");
        setIsPending(false);
        return;
      }

      setSuccess(
        "If this email exists, you'll receive password reset instructions shortly.",
      );
      setIsPending(false);
      // Briefly show the neutral success message, then redirect to login
      try {
        setTimeout(() => {
          router.push("/login?reset=sent");
        }, 3000);
      } catch (e) {
        // ignore push errors
        console.error("Redirect error:", e);
      }
      return;
    } catch (e) {
      console.error("requestPasswordReset fetch error:", e);
      setError("Password reset failed. Please try again later.");
      setIsPending(false);
      return;
    }
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="flex flex-col items-center justify-center md:px-10 w-full"
      >
        <FormField
          control={form.control}
          name="email"
          render={({field}: {field: FieldValues}) => (
            <FormItem className="py-3 w-full">
              <FormLabel
                className={`font-thin text-[0.6rem] md:text-lg ${
                  form.formState.errors.email
                    ? "text-destructive"
                    : "text-foreground"
                }`}
              >
                Email
              </FormLabel>
              <FormControl>
                <Input
                  disabled={isPending}
                  type="email"
                  placeholder="max@muster.de"
                  {...field}
                  className="w-full border-b-[0.3px] rounded-md outline-none focus-visible:ring-transparent focus-visible:border-b-[0.3px] border-primary-foreground/30 py-5 text-[0.6rem] md:text-lg"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormError message={error} />
        <FormSuccess message={success} />
        <Button
          type="submit"
          disabled={isPending || !form.formState.isValid}
          variant={"default"}
          className="rounded-md w-full bg-primary text-primary-foreground text-sm md:text-md cursor-pointer py-6 mt-5 animate-in transition-all duration-200 ease-in-out hover:shadow-sm shadow-sm hover:shadow-accent-foreground/50 focus-visible:ring-2 focus-visible:ring-link focus-visible:ring-offset-2 focus-visible:ring-offset-background uppercase"
        >
          {isPending || !form.formState.isValid
            ? "Waiting..."
            : "Reset Password"}
          {form.formState.isSubmitting && <Spinner />}
        </Button>
      </form>
    </Form>
  );
};

export default ResetForm;

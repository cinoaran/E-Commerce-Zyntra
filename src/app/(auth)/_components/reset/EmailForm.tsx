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
import Spinner from "@/components/Loader/Spinner";
import {checkUserEmail} from "@/actions/emails/checkUserEmail";
import {authClient} from "@/lib/auth-client";

const ResetForm = () => {
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
    const emailExists = await checkUserEmail(data.email);

    if (!emailExists) {
      setError("User with email does not exist");
      setIsPending(false);
      return;
    }
    // NEU:
    const {error} = await authClient.requestPasswordReset({
      email: data.email,
      redirectTo: "/reset-password", // ← WIEDER HINZUFÜGEN!
    });

    if (error) {
      setError(error.message + "Password reset failed. Please try again.");
    } else {
      setSuccess("Please check your email for further instructions.");
    }
    setIsPending(false);
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
                  className="w-full border-b-[0.3px] rounded-none outline-none focus-visible:ring-transparent focus-visible:border-b-[0.3px] border-primary-foreground/30 py-5 text-[0.6rem] md:text-lg"
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
          variant={"outline"}
          className="rounded-md w-full text-sm text-primary-foreground md:text-md cursor-pointer py-6 mt-5 animate-in transition-all duration-200 ease-in-out hover:shadow-sm shadow-sm hover:shadow-accent-foreground/50 focus-visible:ring-2 focus-visible:ring-link focus-visible:ring-offset-2 focus-visible:ring-offset-background uppercase"
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

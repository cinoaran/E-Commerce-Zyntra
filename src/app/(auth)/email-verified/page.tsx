import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {HomeIcon, LayoutDashboard} from "lucide-react";
import Link from "next/link";

const EmailVerified = () => {
  return (
    <div className="w-[90vw] md:w-1/2 bg-secondary text-foreground border-[0.3px] border-foreground/10 rounded-lg backdrop-blur-md shadow-md shadow-foreground/10 mx-auto my-12">
      <Card>
        <CardHeader>
          <CardTitle>Email verfied </CardTitle>
          <CardDescription>Now, you have access to your data</CardDescription>
        </CardHeader>
        <CardContent className="mx-auto flex items-center justify-center gap-14">
          <Link href={`/`}>
            <h4 className="flex items-center justify-center gap-2 underlined w-fit h-12 text-[1.0rem]">
              <HomeIcon size={16} /> Back to homepage
            </h4>
          </Link>
          <Link href={`/dashboard`}>
            <h4 className="flex items-center justify-center gap-2 underlined w-fit h-12 text-[1.0rem]">
              <LayoutDashboard size={16} /> Dashboard
            </h4>
          </Link>
        </CardContent>
        <CardFooter>
          <p>Card Footer</p>
        </CardFooter>
      </Card>
    </div>
  );
};

export default EmailVerified;

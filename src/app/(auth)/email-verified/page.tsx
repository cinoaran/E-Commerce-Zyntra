import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
} from "@/components/ui/card";
import Link from "next/link";
import {HomeIcon, LayoutDashboard, MonitorCheck} from "lucide-react";

const EmailVerified = () => {
  return (
    <Card className="bg-background/20 border-none my-12 py-12">
      <CardHeader className="flex flex-col items-center justify-center gap-6 font-bold uppercase">
        <div>
          <h3 className="flex items-center justify-center text-center uppercase font-semibold gap-5">
            <span>
              <MonitorCheck size={30} className="text-primary" />
            </span>
            Email has been verified!
          </h3>
        </div>
        <CardDescription className="text-center text-sm text-foreground/80 my-8">
          Where to go next?
        </CardDescription>
      </CardHeader>
      <CardContent className="mx-auto flex items-center justify-center">
        <ul className="flex flex-col items-start lg:items-center lg:flex-row gap-5 lg:gap-30">
          <li className="flex flex-row items-center justify-center text-center">
            <Link
              href="/"
              className="flex items-center justify-center gap-3 w-fit underlined uppercase"
            >
              <HomeIcon size={16} className="text-primary" /> Back to homepage
            </Link>
          </li>
          <li className="flex flex-row items-center justify-center text-center">
            <Link
              href="/dashboard"
              className="flex items-center justify-center gap-3 w-fit underlined cursor-pointer uppercase"
            >
              <LayoutDashboard size={16} className="text-primary" /> Dashboard
            </Link>
          </li>
        </ul>
      </CardContent>
    </Card>
  );
};

export default EmailVerified;

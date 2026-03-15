import {Card, CardContent, CardHeader} from "@/components/ui/card";
import Image from "next/image";

export default function Home() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <main className="max-w-6xl mx-auto p-6 space-y-8">
        {/* Product Cards */}
        <section>
          <Card className="backdrop-blur-md border-[0.3px] border-foreground/10 shadow-md shadow-foreground/10 p-6">
            <CardHeader className="text-2xl font-bold text-primary uppercase mb-4">
              Welcome to Zyntra!
            </CardHeader>
            <CardContent className="space-y-4 relative">
              <Image
                src="https://images.unsplash.com/photo-1768586429849-b35799b5cb2d?w=300&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxmZWF0dXJlZC1waG90b3MtZmVlZHwzNzZ8fHxlbnwwfHx8fHw%3D"
                alt="Zyntra Hero Image"
                height={500}
                width={400}
                className="object-cover"
                priority
                style={{width: "auto", height: "auto"}}
              />

              <p className="text-lg">
                Zyntra is your all-in-one solution for managing your projects,
                tasks, and team collaboration. With our intuitive interface and
                powerful features, you can streamline your workflow and boost
                productivity.
              </p>

              <p className="text-lg mt-4">
                Whether you&apos;re a freelancer, a small business, or a large
                enterprise, Zyntra has the tools you need to succeed. Sign up
                today and experience the difference!
              </p>
            </CardContent>
          </Card>
        </section>
      </main>
    </div>
  );
}

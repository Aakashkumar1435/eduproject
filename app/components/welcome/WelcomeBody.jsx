import { MoveRight, PhoneCall } from "lucide-react";
import { Button } from "../ui/button";

export const WelcomeBody = () => (
  <div className="w-full">
    <div className="container mx-auto">
      <div className="flex gap-8 py-20 lg:py-40 items-center justify-center flex-col">
        <div className="flex gap-4 flex-col">
          <h1 className="text-5xl md:text-7xl max-w-2xl tracking-tighter text-center font-regular">
            Aakash is Sindhi and a Tarani
          </h1>
          <p className="text-lg md:text-xl leading-relaxed tracking-tight text-muted-foreground max-w-2xl text-center">
            Managing a small business today is already tough. Avoid further
            complications by ditching outdated, tedious trade methods. Our goal
            is to streamline SMB trade, making it easier and faster than ever.
          </p>
        </div>
        <div className="flex flex-row gap-3">
          <Button size="lg" className="gap-4" variant="outline">
            Get Started <PhoneCall className="w-4 h-4" />
          </Button>
          <Button size="lg" className="gap-4">
            Sign up here <MoveRight className="w-4 h-4" />
          </Button>
        </div>
      </div>
    </div>
  </div>
);
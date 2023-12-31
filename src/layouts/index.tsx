import { Button } from "~/ui/button";
import { signIn, signOut, useSession } from "next-auth/react";
import { LogIn, LogOut } from "lucide-react";
import { type FC } from "react";
import { Toaster } from "~/ui/toaster";

function AuthShowcase() {
  const { data: sessionData } = useSession();

  return (
    <div>
      <Button
        variant="outline"
        size="icon"
        onClick={sessionData ? () => void signOut() : () => void signIn()}
      >
        {sessionData ? <LogOut className="w-4 h-4" /> : <LogIn className="w-4 h-4" />}
      </Button>
    </div >
  );
}

type Props = {
  children: React.ReactNode
}

export const Layout: FC<Props> = ({ children }: Props) => {
  return (
    <main>
      <div className="md:container mx-auto m-2">
        <div className="flex items-center justify-between space-y-2">
          <div className="m-4">
            <h2 className="text-2xl font-bold tracking-tight">TOEFL Training</h2>
            <p className="text-muted-foreground">Getting started!</p>
          </div>
          <div className="m-4">
            <AuthShowcase />
          </div>
        </div>
        <div className="my-4">
          {children}
          <Toaster />
        </div>
      </div>
    </main>
  );
}

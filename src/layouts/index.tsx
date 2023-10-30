import { Button } from "~/ui/button";
import { signIn, signOut, useSession } from "next-auth/react";
import { LogIn, LogOut } from "lucide-react";

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


export const Layout = ({ children }) => {

  return (
    <main>
      <div className="container mx-auto m-2">
        <div className="flex items-center justify-between space-y-2">
          <div>
            <h2 className="text-2xl font-bold tracking-tight">TOEFL Training</h2>
            <p className="text-muted-foreground">Getting started!</p>
          </div>
          <div>
            <AuthShowcase />
          </div>
        </div>
        <div className="my-4">
          {children}
        </div>
      </div>
    </main>
  );
}

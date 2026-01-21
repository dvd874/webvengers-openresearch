import { Button } from "@/components/ui/button";

export function Navbar() {
  return (
    <nav className="flex items-center justify-between p-4 border-b">
      <h1 className="font-bold">OpenResearch</h1>
      <Button>Connect Wallet</Button>
    </nav>
  );
}

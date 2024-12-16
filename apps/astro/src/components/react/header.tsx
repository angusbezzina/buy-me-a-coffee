import { Button } from "@repo/ui/components/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@repo/ui/components/dropdown-menu";
import { usePathname } from "@repo/ui/hooks/usePathname";
import { CircleDollarSign, Menu } from "lucide-react";
import { useEffect, useState } from "react";

type HeaderProps = {
  isOwner: boolean;
};

function Header({ isOwner }: HeaderProps) {
  const [isHome, setIsHome] = useState(false);
  const pathname = usePathname();
  const homePage = pathname === "/";
  const honoursPage = pathname === "/honour-role";
  const withdrawPage = pathname === "/withdraw";

  return (
    <header className="z-20 bg-background fixed top-0 left-0 w-full flex justify-between items-center px-4 py-3">
      <a href="/" className="flex items-center gap-2 font-bold">
        <CircleDollarSign />
        Buy me a coffee
      </a>
      <nav>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button size="icon" variant="outline">
              <Menu />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            {!homePage && (
              <DropdownMenuItem
                asChild
                className="cursor-pointer hover:bg-muted-foreground/20 transition-colors"
              >
                <a href="/">🙌 Show some support</a>
              </DropdownMenuItem>
            )}
            {!honoursPage && (
              <DropdownMenuItem
                asChild
                className="cursor-pointer hover:bg-muted-foreground/20 transition-colors"
              >
                <a href="/honour-role">🫡 View honours list</a>
              </DropdownMenuItem>
            )}
            {!withdrawPage && isOwner && (
              <DropdownMenuItem
                asChild
                className="cursor-pointer hover:bg-muted-foreground/20 transition-colors"
              >
                <a href="/withdraw">🏦 Break the bank</a>
              </DropdownMenuItem>
            )}
          </DropdownMenuContent>
        </DropdownMenu>
      </nav>
    </header>
  );
}

export { Header };

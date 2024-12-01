import { Button } from "@repo/ui/components/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@repo/ui/components/dropdown-menu";
import { CircleDollarSign, Menu } from "lucide-react";

function Header() {
  return (
    <header className="z-20 fixed top-0 left-0 w-full flex justify-between items-center px-4 py-3">
      <a href="/" className="flex items-center gap-2 text-xs">
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
            <DropdownMenuItem
              asChild
              className="cursor-pointer hover:bg-muted-foreground/20 transition-colors"
            >
              <a href="/">💸 Show some love</a>
            </DropdownMenuItem>
            <DropdownMenuItem
              asChild
              className="cursor-pointer hover:bg-muted-foreground/20 transition-colors"
            >
              <a href="/honour-role">🫡 View honours list</a>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </nav>
    </header>
  );
}

export { Header };

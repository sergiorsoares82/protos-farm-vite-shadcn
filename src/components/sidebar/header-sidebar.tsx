import { Home } from "lucide-react";
import { Link } from "react-router-dom";
import { SidebarHeader } from "../ui/sidebar";

export function HeaderSidebar() {
  return (
    <SidebarHeader>
      <Link
        to="/"
        className="flex flex-row items-center gap-2 data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
      >
        <div className="bg-sidebar-primary text-sidebar-primary-foreground flex items-center justify-center size-8 aspect-square rounded-lg">
          <Home className="size-4" />
        </div>
        <span className="truncate font-medium">Protos Farm</span>
      </Link>
    </SidebarHeader>
  );
}

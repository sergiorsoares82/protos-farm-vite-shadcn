// components/Layout.tsx
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import { AppHeader } from "./header/app-header";
import { AppSidebar } from "./sidebar/app-sidebar";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset>
        <>
          <AppHeader />
          <main className="">{children}</main>
        </>
      </SidebarInset>
    </SidebarProvider>
  );
}

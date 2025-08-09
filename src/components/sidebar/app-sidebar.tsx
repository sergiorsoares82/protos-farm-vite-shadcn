import { Sidebar } from "@/components/ui/sidebar";
import { ContentSidebar } from "./content-sidebar";
import { FooterSidebar } from "./footer-sidebar";
import { HeaderSidebar } from "./header-sidebar";
import { data } from "./sidebar-data";

// { ...props }: React.ComponentProps<typeof Sidebar>
export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar collapsible="icon" {...props}>
      <HeaderSidebar />
      <ContentSidebar items={data} />
      <FooterSidebar />
    </Sidebar>
  );
}

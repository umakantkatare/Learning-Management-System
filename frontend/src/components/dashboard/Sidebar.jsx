import SidebarHeader from "./SidebarHeader";
import SidebarMenu from "./SidebarMenu";
// import SidebarProfile from "./SidebarProfile";


export default function Sidebar() {
  return (
    <aside className="hidden md:flex w-70 border-r border-zinc-800 bg-zinc-950 flex-col p-4">
      <SidebarHeader />
      {/* <SidebarProfile />   */}
      <SidebarMenu />
    </aside>
  );
}
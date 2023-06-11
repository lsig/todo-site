import { SideBarBtn } from "./sidebarButton";

interface HomeBtn {
  homeId: number;
  onSidebarClick: (projectId: number) => void;
}

export function HomeBtn({ homeId, onSidebarClick }: HomeBtn) {
  // TODO: Window pops up when home is pressed
  return <SideBarBtn name="Home" onClick={() => onSidebarClick(homeId)} />;
}

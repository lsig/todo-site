interface SideBar {
  name: string;
  onClick: () => void;
}

export function SideBarBtn({ name, onClick }: SideBar) {
  return (
    <button
      className={
        "rounded-lg w-64 h-12 self-center bg-purple-300 text-purple-500 disabled:opacity-100"
      }
      onClick={onClick}
    >
      {name}
    </button>
  );
}
1;

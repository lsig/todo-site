export function SideBarBtn({ name }: { name: string }) {
  return (
    <button
      className={
        "rounded-lg w-64 h-12 self-center bg-purple-300 text-purple-500 disabled:opacity-100"
      }
    >
      {name}
    </button>
  );
}
1;

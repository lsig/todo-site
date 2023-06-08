export function NewProjectBtn() {
  // TODO: Window pops up when new task is pressed
  return (
    <button
      className={
        "rounded-lg w-80 h-12 mb-3 self-center bg-purple-200 text-purple-500 disabled:opacity-100 sm:w-56 sm:h-8 sm:mb-1 sm:text-xs md:w-60 md:h-10 md:mb-2 md:text-base lg:w-64 lg:h-12 lg:mb-3 lg:text-base"
      }
    >
      New Project +
    </button>
  );
}

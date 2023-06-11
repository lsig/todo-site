export function NewTaskBtn() {
  // TODO: Window pops up when new task is pressed
  return (
    <button
      className={
        "rounded-lg w-32 h-12 mb-3 self-center bg-purple-200 text-purple-500 disabled:opacity-100" +
        // "sm:w-56 sm:text-xs md:w-60 md:h-10 md:text-base" +
        // "lg:w-64 lg:text-xl" +
        ""
      }
    >
      New Task +
    </button>
  );
}

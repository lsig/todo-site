import { X } from "react-feather";

export function Project() {
  // TODO: Window pops up when project is pressed
  return (
    <div
      className={
        "rounded-lg flex justify-between self-center w-80 h-12 mb-3 bg-purple-300 text-purple-500 disabled:opacity-100 sm:w-56 sm:h-8 sm:mb-1 sm:text-xs md:w-60 md:h-10 md:mb-2 md:text-base lg:w-64 lg:h-12 lg:mb-3 lg:text-base"
      }
    >
      <div className="ml-8"></div>
      <div className="self-center ">Project</div>
      <X className="self-center mr-2" />
    </div>
  );
}

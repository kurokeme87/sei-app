"use client";

const Switch = ({ open, setOpen }) => {
  return (
    <div
      className={`${
        open ? "bg-[#75FB6E]" : "bg-[#F0F0F0]"
      } relative sm:w-[70px] w-[65px] rounded-lg sm:h-8 h-7 p-1`}
    >
      <button
        onClick={() => setOpen((prev) => !prev)}
        className={`${
          open ? "translate-x-9" : "translate-x-1"
        } ease transition-all duration-200 h-full sm:w-6 w-5 rounded-lg bg-white`}
      ></button>
    </div>
  );
};

export default Switch;

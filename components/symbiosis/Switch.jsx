"use client";

const Switch = ({ open, setOpen }) => {
  return (
    <div
      className={`${
        open ? "bg-[#75FB6E]" : "bg-[#F0F0F0]"
      } relative w-[70px] rounded-lg h-8 p-1`}
    >
      <button
        onClick={() => setOpen((prev) => !prev)}
        className={`${
          open ? "translate-x-9" : "translate-x-1"
        } ease transition-all duration-200 h-full w-6 rounded-lg bg-white`}
      ></button>
    </div>
  );
};

export default Switch;

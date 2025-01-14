"use client";

import { Dispatch, SetStateAction, useRef } from "react";
import { useEffect } from "react";
import { IoClose } from "react-icons/io5";

interface ModalProps {
  children: React.ReactNode;
  open: boolean;
  setOpen?: Dispatch<SetStateAction<boolean>>;
  className?: string;
  onClose: () => void;
}

const Modal = ({ children, open, setOpen, className, onClose }: ModalProps) => {
  const modalRef = useRef(null);

  const togglOpen = () => setOpen(!open);

  const handleClickOutside = (e) => {
    if (modalRef.current && !modalRef.current.contains(e.target)) {
      setOpen(false);
      onClose();
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="relative">
      {open ? (
        <div className="fixed inset-0 bg-[#00000080] z-50 backdrop-blur-sm"></div>
      ) : null}

      {/* Dropdown conntent */}
      <div
        ref={modalRef}
        className={`fixed top-[40%] left-1/2 flex-col w-full sm:max-w-[425px] bg-white z-[999] p-4 gap-4 rounded-lg shadow-lg transition-transform duration-300 ease-in-out transform ${
          open
            ? "-translate-y-[50%] opacity-100 flex"
            : "translate-y-[100%] opacity-0"
        } -translate-x-[50%] ${
          open ? "pointer-events-auto" : "pointer-events-none"
        } ${className}`}
      >
        <button
          className="absolute top-4 right-5 hover:bg-gray-100 p-1.5 rounded-full"
          onClick={onClose}
        >
          <IoClose size={28} />
        </button>
        {children}
      </div>
    </div>
  );
};

export default Modal;

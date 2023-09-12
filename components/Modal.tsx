"use client";
import { FC } from "react";
import { Button } from "./ui/Button";
import { X } from "lucide-react";

interface ModalProps {
  children: React.ReactNode;
  toggleModal?: () => void;
}

const Modal: FC<ModalProps> = ({ children, toggleModal }) => {
  return (
    <div className={`fixed inset-0 bg-zinc-900 bg-opacity-90 z-[9999]`}>
      <div className={`relative h-fit flex justify-center pt-12 rounded-lg`}>
        <Button
          onClick={toggleModal}
          variant="ghost"
          className="h-6 w-6 p-0 rounded-md absolute top-4 right-3"
          aria-label="close modal"
        >
          <X className="h-4 w-4" />
        </Button>
        {children}
      </div>
    </div>
  );
};

export default Modal;

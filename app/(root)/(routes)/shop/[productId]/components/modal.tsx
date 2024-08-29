import React from "react";
import Image from "next/image";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  imageUrl: string;
}

export const Modal: React.FC<ModalProps> = ({ isOpen, onClose, imageUrl }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50">
      <div className="relative bg-white p-4 rounded">
        <button
          onClick={onClose}
          className="absolute top-1 right-4 items-start flex justify-start text-black text-4xl rounded-full p-2"
        >
          ×
        </button>
        <Image
          src={imageUrl}
          alt="Product"
          layout="intrinsic"
          width={1000}
          height={1000}
          className="max-w-full max-h-screen"
        />
      </div>
    </div>
  );
};

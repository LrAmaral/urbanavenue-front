"use client";

import React, { useState, useEffect, ReactNode } from "react";
import Image from "next/image";
import { X } from "lucide-react";
import { createPortal } from "react-dom";

interface ClientModalProps {
  imageUrl: string;
  children?: ReactNode;
}

export const ClientModal: React.FC<ClientModalProps> = ({
  imageUrl,
  children,
}) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalContainer, setModalContainer] = useState<Element | null>(null);

  const openModal = () => {
    setIsModalOpen(true);
    document.body.style.overflow = "hidden";
  };

  const closeModal = () => {
    setIsModalOpen(false);
    document.body.style.overflow = "";
  };

  useEffect(() => {
    setModalContainer(document.getElementById("modal-root"));
    return () => {
      document.body.style.overflow = "";
    };
  }, []);

  return (
    <>
      <button onClick={openModal} className="w-full h-full">
        {children}
      </button>
      {isModalOpen &&
        modalContainer &&
        createPortal(
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-75">
            <div className="relative w-full h-full flex items-center justify-center bg-white">
              <button
                onClick={closeModal}
                className="absolute top-4 right-4 text-gray-500 hover:text-gray-700 text-2xl"
              >
                <X size={28} />
              </button>
              <Image
                src={imageUrl}
                width={1920}
                height={1080}
                loading="lazy"
                alt="Product Image"
                className="max-w-full max-h-full object-contain"
              />
            </div>
          </div>,
          modalContainer
        )}
    </>
  );
};

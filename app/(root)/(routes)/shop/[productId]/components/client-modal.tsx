"use client";

import React, { useState } from "react";
import { Modal } from "./modal";
import Image from "next/image";

interface ClientModalProps {
  imageUrl: string;
}

export const ClientModal: React.FC<ClientModalProps> = ({ imageUrl }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  return (
    <>
      <button
        onClick={openModal}
        className="w-full md:w-1/2 h-full flex items-center justify-center"
      >
        <Image
          src={imageUrl}
          width={1000}
          height={1000}
          alt="Product Thumbnail"
          className="w-full h-full object-cover rounded-lg cursor-pointer"
        />
      </button>
      <Modal isOpen={isModalOpen} onClose={closeModal} imageUrl={imageUrl} />
    </>
  );
};

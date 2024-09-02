import { ReactNode } from "react";

interface ButtonProps {
  onClick?: () => void;
  children: ReactNode;
  className?: string;
}

export const Button = ({ children, className, onClick }: ButtonProps) => {
  return (
    <button className={`${className}`} onClick={onClick}>
      {children}
    </button>
  );
};

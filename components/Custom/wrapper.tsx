import { ReactNode } from "react";

interface WrapperProps {
  children: ReactNode;
  className?: string;
}

export const Wrapper = ({ className, children }: WrapperProps) => {
  return (
    <div
      className={`mx-auto w-full max-w-[24rem] sm:max-w-[36rem] md:max-w-[80rem] px-12 max-sm:px-4 ${className}`}
    >
      {children}
    </div>
  );
};

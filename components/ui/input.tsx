import * as React from "react";
import { Search } from "lucide-react";

import { cn } from "@/lib/utils";
import { Button } from "./button";

export type InputProps = React.InputHTMLAttributes<HTMLInputElement>;

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, ...props }, ref) => {
    return (
      <div className="relative flex items-center justify-center w-1/2">
        <input
          type={type}
          className={cn(
            "md:flex h-8 w-full hidden rounded-md border border-input bg-background px-10 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50",
            className
          )}
          ref={ref}
          {...props}
          placeholder="Search for an item"
        />
        <Search
          size={28}
          className="absolute left-2.5 pr-2 border-r-2 h-full"
        />
        <Button type="submit" className="hidden md:flex absolute h-8 right-0">Search</Button>
      </div>
    );
  }
);

Input.displayName = "Input";

export { Input };

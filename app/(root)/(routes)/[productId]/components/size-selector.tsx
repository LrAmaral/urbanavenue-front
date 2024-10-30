import { Size, SizeOption } from "@/lib/product";

interface SizeSelectorProps {
  sizes: Size[];
  onSelect: (size: SizeOption) => void;
}

export default function SizeSelector({ sizes, onSelect }: SizeSelectorProps) {
  return (
    <div className="flex space-x-2">
      {sizes.map((size) => (
        <button
          key={size.name}
          onClick={() => onSelect(size.name as SizeOption)}
          className="size-button"
          disabled={size.stock === 0}
        >
          {size.name.toUpperCase()}
        </button>
      ))}
    </div>
  );
}

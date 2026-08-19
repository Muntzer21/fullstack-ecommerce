"use client";

interface QuantitySelectorProps {
  quantity: number;
  setQuantity: (value: number) => void;
}

export default function QuantitySelector({
  quantity,
  setQuantity,
}: QuantitySelectorProps) {
  return (
    <div className="flex w-fit items-center rounded-lg border">
      <button
        onClick={() => setQuantity(Math.max(1, quantity - 1))}
        className="px-4 py-2"
      >
        -
      </button>

      <span className="w-12 text-center">{quantity}</span>

      <button onClick={() => setQuantity(quantity + 1)} className="px-4 py-2">
        +
      </button>
    </div>
  );
}

"use client";

import { Link } from "@/i18n/navigation";
import { Pencil, Trash2 } from "lucide-react";

type Props = {
  id: number;
};

export default function ProductActions({ id }: Props) {
  return (
    <div className="flex justify-end gap-3">
      <Link href={`/dashboard/products/${id}`}>
        <Pencil size={18} className="text-blue-600" />
      </Link>

      <button>
        <Trash2 size={18} className="text-red-600" />
      </button>
    </div>
  );
}

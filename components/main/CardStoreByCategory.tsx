import { Store } from "@/types/stores";
import { Star } from "lucide-react";
import Image from "next/image";
interface StoreCardByCategoryProps {
  data: Store;
}

export default function CardStoreByCategory({
  data,
}: StoreCardByCategoryProps) {
  const formatter = new Intl.NumberFormat("id-ID", {
    maximumFractionDigits: 1,
    minimumFractionDigits: 0,
  });
  return (
    <div
      className="group cursor-pointer w-full max-w-[300px] bg-white rounded-3xl overflow-hidden transition-all duration-300 hover:shadow-xl border border-gray-100"
      key={data.id}
    >
      {/* Container Gambar */}
      <div className="relative aspect-[4/3] overflow-hidden" key={data.id}>
        <img
          src={data.logo_url}
          alt={data.name}
          className="object-cover w-full h-full transition-transform duration-500 group-hover:scale-110"
        />
        {/* Badge Promo (Opsional) */}
        <div className="absolute top-3 left-3 bg-red-500 text-white text-[10px] font-bold px-2 py-1 rounded-lg shadow-sm">
          PROMO
        </div>
      </div>

      {/* Konten Teks */}
      <div className="p-4">
        <h3 className="text-lg font-semibold text-gray-800 truncate mb-1">
          {data.name}
        </h3>

        <p className="text-sm text-gray-500 mb-3">
          {data.store_categories.slice(0, 2).map((e, i, arr) => {
            return (
              <span className="" key={e.id}>
                {e.categories.name ?? ""}
                {i < arr.length - 1 ? ", " : ""}
              </span>
            );
          })}
        </p>

        <div className="flex items-center justify-between mt-auto">
          {/* Rating */}
          <div className="flex items-center gap-1">
            <Star size={16} className="fill-yellow-400 text-yellow-400" />
            <span className="text-sm font-bold text-gray-700">
              {data.rating}
            </span>
          </div>

          {/* Pemisah Dot */}
          <span className="text-gray-300 text-xs">•</span>

          {/* Jarak */}
          <div className="text-sm text-gray-500 font-medium">
            {" "}
            {data.jarak < 1
              ? `${formatter.format(data.jarak * 1000)} m`
              : `${formatter.format(data.jarak)} km`}
          </div>
        </div>
      </div>
    </div>
  );
}

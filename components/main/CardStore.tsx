import { Store } from "@/types/stores";
import { Star, MapPin, Clock } from "lucide-react";
import Link from "next/link";

interface StoreCardProps {
  data: Store;
}

export default function CardStore({ data }: StoreCardProps) {
  const formatter = new Intl.NumberFormat("id-ID", {
    maximumFractionDigits: 1,
    minimumFractionDigits: 0,
  });

  const isOpen = data.is_open == "1" || data.is_open === "true" ;

  return (
    <Link href={`/store/${data.slug}`} className="block group">
      <div className="bg-white rounded-2xl overflow-hidden shadow-sm border border-gray-100 flex flex-col sm:flex-row hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
        {/* Image Container */}
        <div className="relative w-full sm:w-48 h-48 sm:h-auto overflow-hidden bg-gray-100 flex-shrink-0">
          <img
            src={data.logo_url}
            alt={data.name}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
          />
          {/* Status Badge */}
          <div
            className={`absolute top-3 left-3 px-2.5 py-1 rounded-full text-[10px] font-bold tracking-wide shadow-sm backdrop-blur-sm ${
              isOpen
                ? "bg-emerald-500/90 text-white"
                : "bg-red-500/90 text-white"
            }`}
          >
            <span className="flex items-center gap-1">
              <Clock size={10} />
              {isOpen ? "BUKA" : "TUTUP"}
            </span>
          </div>
        </div>

        {/* Content */}
        <div className="p-5 flex-1 flex flex-col justify-between min-w-0">
          <div>
            <div className="flex justify-between items-start gap-2 mb-1">
              <h3 className="font-bold text-gray-900 text-lg truncate group-hover:text-blue-600 transition-colors">
                {data.name}
              </h3>
              <div className="flex items-center gap-1 bg-yellow-50 px-2 py-1 rounded-lg shrink-0">
                <Star size={14} className="fill-yellow-400 text-yellow-400" />
                <span className="text-xs font-bold text-gray-700">
                  {formatter.format(data.rating)}
                </span>
              </div>
            </div>

            {/* Categories */}
            {data.store_categories && data.store_categories.length > 0 && (
              <div className="flex flex-wrap gap-1.5 mt-1 mb-3">
                {data.store_categories.slice(0, 2).map((sc) => (
                  <span
                    key={sc.id}
                    className="bg-blue-50 text-blue-600 text-[10px] font-semibold px-2 py-0.5 rounded-full"
                  >
                    {sc.categories?.name ?? ""}
                  </span>
                ))}
              </div>
            )}

            <p className="text-sm text-gray-500 line-clamp-2 leading-relaxed mb-4">
              {data.description || "Tidak ada deskripsi tersedia untuk UMKM ini."}
            </p>
          </div>

          <div className="flex items-center justify-between pt-3 border-t border-gray-50">
            <div className="flex items-center gap-1.5 text-gray-500">
              <MapPin size={14} className="text-red-500" />
              <span className="text-sm font-medium">
                {data.jarak < 1
                  ? `${formatter.format(data.jarak * 1000)} m`
                  : `${formatter.format(data.jarak)} km`}
              </span>
            </div>
            
            <div className="text-xs text-blue-600 font-bold group-hover:underline">
              Lihat Menu →
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
}
"use client";

import { useAuth } from "@/AuthContext";
import Loading from "@/components/Loading";
import CardStoreByCategory from "@/components/main/CardStoreByCategory";
import { getCurrentLocation, LocationData } from "@/helper/locationHelper";
import { Store } from "@/types/stores";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";

export default function CategoryPage() {
  const pathName = usePathname();
  const { user, role, logout, loading } = useAuth();
  const [isLoading, setLoadingState] = useState(false);
  const pathSegments = pathName.split("/").filter((item) => item !== "");

  const [dataLocation, setDataLocation] = useState<LocationData>();
  const [storeData, setStoreData] = useState<Store[]>([]);
  const fetchData = async () => {
    console.log("pathName", pathName);

    setLoadingState(true);
    try {
      const url = process.env.NEXT_PUBLIC_SITE_URL;
      const response = await fetch(
        `${url}api/get-store-by-category?category=${pathName.replaceAll("/", "")}`,
      );

      if (response.status == 200) {
        const data = await response.json();

        setStoreData(data.data);

        console.log("response", data.data);
      }
    } catch (error) {
      toast.error("Terjadi kesalahan");
    } finally {
      setLoadingState(false);
    }
  };

  const handleLocationClick = async () => {
    setLoadingState(true);

    try {
      const data: LocationData = await getCurrentLocation();

      setDataLocation(data);
    } catch (error: any) {
      toast.error(error.message);
    } finally {
      setLoadingState(false);
    }
  };

  useEffect(() => {
    handleLocationClick();
    fetchData();
  }, []);
  return (
    <div className="main  mx-10 my-10">
      <nav
        aria-label="Breadcrumb"
        className="
        flex items-center text-sm text-gray-600 mb-10"
      >
        <ol className="flex list-none p-0">
          <li className="flex items-center">
            <Link href="/" className="hover:text-blue-600 transition-colors">
              Beranda
            </Link>
            {pathName.length > 0 && <span className="mx-2">/</span>}
          </li>
          {pathSegments.map((segment, index) => {
            const href = `/${pathSegments.slice(0, index + 1).join("/")}`;
            const isLast = index === pathSegments.length - 1;
            const title = segment.charAt(0).toUpperCase() + segment.slice(1);

            return (
              <li key={href} className="flex items-center">
                {isLast ? (
                  <span className=" hover:text-blue-600 transition-colors">
                    {title}
                  </span>
                ) : (
                  <>
                    <Link
                      href={href}
                      className="hover:text-blue-600 transition-colors"
                    >
                      {title}
                    </Link>
                    <span className="mx-2">/</span>
                  </>
                )}
              </li>
            );
          })}
        </ol>
      </nav>

      <section>
        {isLoading == true ? (
          <div>
            <Loading fullPage={false} />
          </div>
        ) : storeData && storeData.length > 0 ? (
          /* Tampilkan Grid jika data ada */
          <div className="p-4 grid grid-cols-1 sm:grid-cols-3 md:grid-cols-5 gap-5 bg-white mt-2">
            {storeData.map((item, index) => (
              <CardStoreByCategory key={item.id} data={item} />
            ))}
          </div>
        ) : (
          /* Tampilkan UI Empty State jika data kosong */
          <div className="flex flex-col items-center justify-center py-20 px-4">
            <div className="bg-slate-50 p-6 rounded-full mb-4">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-16 w-16 text-slate-300"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={1.5}
                  d="String M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4"
                />
              </svg>
            </div>
            <h3 className="text-lg font-bold text-slate-800">
              UMKM Tidak Ditemukan
            </h3>
            <p className="text-slate-500 text-center max-w-xs mt-2">
              Sepertinya belum ada toko di kategori ini untuk wilayah{" "}
              {dataLocation?.city} dan sekitarnya.
            </p>
            <button
              onClick={() => window.location.reload()}
              className="mt-6 text-blue-600 font-semibold hover:underline"
            >
              Coba Segarkan Halaman
            </button>
          </div>
        )}
      </section>
    </div>
  );
}

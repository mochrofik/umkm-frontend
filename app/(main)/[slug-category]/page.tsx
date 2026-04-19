"use client";

import { useAuth } from "@/AuthContext";
import Loading from "@/components/Loading";
import CardStoreByCategory from "@/components/main/CardStoreByCategory";
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

  useEffect(() => {
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
        {isLoading ? (
          <div>
            <Loading fullPage={false} />
          </div>
        ) : (
          <div className="p-4 grid grid-cols-1 sm:grid-cols-3 md:grid-cols-5 gap-5 bg-white mt-2">
            {storeData.map((item, index) => {
              return <CardStoreByCategory key={item.id} data={item} />;
            })}
            ;
          </div>
        )}
      </section>
    </div>
  );
}

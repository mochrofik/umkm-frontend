"use client";

import { useAuth } from "@/AuthContext";
import { Search } from "lucide-react";
import Link from "next/link";
import { ReactNode, useState } from "react";

interface MainLayoutProps {
  children: ReactNode;
}

interface Category {
  id: number;
  name: string;
  icon_url: string | null;
}

export default function MainLayout({ children }: MainLayoutProps) {
  const [currentPage, setCurrentpage] = useState<number>(1);
  const [categories, setCategories] = useState<Category[]>([]);
  const [loadingSet, setLoading] = useState<boolean>(true);

  // Sesuaikan interface user/role sesuai dengan AuthContext Anda
  const { user, role, logout, loading } = useAuth();
  return (
    <div className="bg-gray-50 min-h-screen pb-20">
      <div className="bg-white p-4 sticky top-0 z-10 shadow-sm">
        <div className="flex flex-row gap-2">
          <div className="w-fit flex items-center">
            <Link href={"/"}>
              <img
                className=""
                src={"/le_melleh.png"}
                width={30}
                height={30}
              ></img>
            </Link>
          </div>
          <div className="flex w-fit items-center px-2">
            <Link href={"/"}>
              <div className="text-blue-900 w-full text-lg font-poppins font-bold font-italic">
                Le melle
              </div>
            </Link>
          </div>
          <div className="">
            <div className="w-full flex justify-end items-center bg-gray-100 border border-slate-200 rounded-full rounded-full px-4 py-2">
              <Search className="text-blue-900" size={20} />

              <input
                type="text"
                placeholder="Mau makan apa hari ini?"
                className="font-poppins bg-transparent text-black ml-2 w-full outline-none text-sm"
              />
            </div>
          </div>
          {!user && !loading && (
            <div className="flex items-center ml-auto ">
              <a
                href="/login"
                className="font-poppins bg-blue-200 font-bold text-blue-700 cursor-pointer hover:bg-blue-300 px-3 py-1 rounded-xl"
              >
                Login
              </a>
            </div>
          )}
          {user && role && role !== "customer" && (
            <div className="flex items-center ml-auto ">
              <Link href={"/dashboard"}>
                <span className="font-poppins bg-blue-200 font-bold text-blue-700 cursor-pointer hover:bg-blue-300 px-3 py-1 rounded-xl">
                  Dashboard
                </span>
              </Link>
            </div>
          )}
          {user && role && role === "customer" && (
            <div className="flex items-center ml-auto">
              <a
                onClick={logout}
                className="font-poppins bg-red-200 font-bold text-red-700 cursor-pointer hover:bg-red-300 px-3 py-1 rounded-xl"
              >
                Logout
              </a>
            </div>
          )}
        </div>
      </div>

      {children}

      <div className="fixed bottom-0 w-full bg-white border-t flex justify-around py-3 text-gray-400">
        <div className="text-orange-500 flex flex-col items-center">
          <span className="text-xl">🏠</span>
          <span className="text-[10px]">Beranda</span>
        </div>
        <div className="flex flex-col items-center">
          <span className="text-xl">📋</span>
          <span className="text-[10px]">Pesanan</span>
        </div>
        <div className="flex flex-col items-center">
          <span className="text-xl">👤</span>
          <span className="text-[10px]">Profil</span>
        </div>
      </div>
    </div>
  );
}

"use client";

import { useAuth } from "@/AuthContext";
import { useCart } from "@/CartContext";
import { Search } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ReactNode, useState } from "react";

interface MainLayoutProps {
  children: ReactNode;
}

export default function MainLayout({ children }: MainLayoutProps) {
  const { user, role, logout, loading } = useAuth();
  const { totalItems } = useCart();
  const pathname = usePathname();

  return (
    <div className="bg-gray-50 min-h-screen pb-20">
      {/* Top Navbar */}
      <div className="bg-white p-4 sticky top-0 z-10 shadow-sm">
        <div className="flex flex-row gap-2">
          <div className="w-fit flex items-center">
            <Link href={"/"}>
              <img
                src={"/le_melleh.png"}
                width={30}
                height={30}
                alt="Logo"
              />
            </Link>
          </div>
          <div className="flex w-fit items-center px-2 text-blue-900 text-lg font-poppins font-bold italic">
            <Link href={"/"}>Le melle</Link>
          </div>
          
          <div className="flex-1 max-w-md mx-auto hidden sm:block">
            <div className="w-full flex justify-end items-center bg-gray-100 border border-slate-200 rounded-full px-4 py-2">
              <Search className="text-blue-900" size={20} />
              <input
                type="text"
                placeholder="Mau makan apa hari ini?"
                className="font-poppins bg-transparent text-black ml-2 w-full outline-none text-sm"
              />
            </div>
          </div>

          <div className="flex items-center ml-auto gap-3">
            {!user && !loading && (
              <Link
                href="/login"
                className="font-poppins bg-blue-200 font-bold text-blue-700 hover:bg-blue-300 px-4 py-1.5 rounded-xl text-sm transition-colors"
              >
                Login
              </Link>
            )}
            
            {user && role && role !== "customer" && (
              <Link href={"/dashboard"}>
                <span className="font-poppins bg-blue-200 font-bold text-blue-700 hover:bg-blue-300 px-4 py-1.5 rounded-xl text-sm transition-colors">
                  Dashboard
                </span>
              </Link>
            )}
            
            {user && role && role === "customer" && (
              <button
                onClick={logout}
                className="font-poppins bg-red-200 font-bold text-red-700 hover:bg-red-300 px-4 py-1.5 rounded-xl text-sm transition-colors"
              >
                Logout
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Main Content */}
      <main>{children}</main>

      {/* Bottom Navigation */}
      <div className="fixed bottom-0 w-full bg-white border-t flex justify-around py-3 text-gray-400 z-20">
        <Link 
          href="/" 
          className={`flex flex-col items-center transition-colors ${pathname === "/" ? "text-orange-500" : "hover:text-slate-600"}`}
        >
          <span className="text-xl">🏠</span>
          <span className="text-[10px] font-medium mt-0.5">Beranda</span>
        </Link>
        
        <Link 
          href="/cart" 
          className={`flex flex-col items-center relative transition-colors ${pathname === "/cart" ? "text-orange-500" : "hover:text-slate-600"}`}
        >
          <span className="text-xl">📋</span>
          {totalItems > 0 && (
            <span className="absolute -top-1 -right-2 bg-red-500 text-white text-[10px] font-bold w-5 h-5 rounded-full flex items-center justify-center border-2 border-white shadow-sm animate-in zoom-in duration-300">
              {totalItems}
            </span>
          )}
          <span className="text-[10px] font-medium mt-0.5">Pesanan</span>
        </Link>
        
        <Link 
          href="/dashboard/profile" 
          className={`flex flex-col items-center transition-colors ${pathname === "/dashboard/profile" ? "text-orange-500" : "hover:text-slate-600"}`}
        >
          <span className="text-xl">👤</span>
          <span className="text-[10px] font-medium mt-0.5">Profil</span>
        </Link>
      </div>
    </div>
  );
}

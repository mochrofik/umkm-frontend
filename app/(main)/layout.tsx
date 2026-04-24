"use client";

import { useAuth } from "@/AuthContext";
import { useCart } from "@/CartContext";
import { Home, ClipboardList, User, Search } from "lucide-react";
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
            <Link href={"/"}>
            <div className="flex flex-col">
            <span className="text-2xl font-black text-gray-900 tracking-tight leading-none">
              Le<span className="text-[#4C8CE4]">melle</span>
            </span>
            <span className="text-[10px] text-gray-400 font-bold uppercase tracking-[0.2em] mt-1">
              UMKM Marketplace
            </span>
          </div>
            </Link>
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
      <div className="fixed bottom-0 w-full bg-white/90 backdrop-blur-xl border-t border-gray-100 flex justify-around py-3 pb-safe z-50 shadow-[0_-10px_30px_rgba(0,0,0,0.05)] rounded-t-[2.5rem]">
        <Link 
          href="/" 
          className={`flex flex-col items-center gap-0.5 group transition-all duration-300 ${pathname === "/" ? "text-[#4C8CE4]" : "text-gray-400 hover:text-gray-600"}`}
        >
          <div className={`p-1.5 rounded-2xl transition-all duration-300 ${pathname === "/" ? "bg-blue-50 scale-110 shadow-sm" : "group-hover:bg-gray-50"}`}>
            <Home size={22} strokeWidth={pathname === "/" ? 2.5 : 2} />
          </div>
          <span className={`text-[10px] font-black uppercase tracking-[0.1em] transition-opacity ${pathname === "/" ? "opacity-100" : "opacity-60"}`}>
            Beranda
          </span>
        </Link>
        
        <Link 
          href="/cart" 
          className={`flex flex-col items-center gap-0.5 group relative transition-all duration-300 ${pathname === "/cart" ? "text-[#4C8CE4]" : "text-gray-400 hover:text-gray-600"}`}
        >
          <div className={`p-1.5 rounded-2xl transition-all duration-300 ${pathname === "/cart" ? "bg-blue-50 scale-110 shadow-sm" : "group-hover:bg-gray-50"}`}>
            <ClipboardList size={22} strokeWidth={pathname === "/cart" ? 2.5 : 2} />
          </div>
          {totalItems > 0 && (
            <span className="absolute top-1 right-1 bg-red-500 text-white text-[9px] font-black w-4 h-4 rounded-full flex items-center justify-center border-2 border-white shadow-lg animate-bounce">
              {totalItems}
            </span>
          )}
          <span className={`text-[10px] font-black uppercase tracking-[0.1em] transition-opacity ${pathname === "/cart" ? "opacity-100" : "opacity-60"}`}>
            Pesanan
          </span>
        </Link>
        
        <Link 
          href="/dashboard/profile" 
          className={`flex flex-col items-center gap-0.5 group transition-all duration-300 ${pathname === "/dashboard/profile" ? "text-[#4C8CE4]" : "text-gray-400 hover:text-gray-600"}`}
        >
          <div className={`p-1.5 rounded-2xl transition-all duration-300 ${pathname === "/dashboard/profile" ? "bg-blue-50 scale-110 shadow-sm" : "group-hover:bg-gray-50"}`}>
            <User size={22} strokeWidth={pathname === "/dashboard/profile" ? 2.5 : 2} />
          </div>
          <span className={`text-[10px] font-black uppercase tracking-[0.1em] transition-opacity ${pathname === "/dashboard/profile" ? "opacity-100" : "opacity-60"}`}>
            Profil
          </span>
        </Link>
      </div>
    </div>
  );
}

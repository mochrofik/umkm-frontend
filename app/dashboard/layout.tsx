"use client";

import React, { useEffect, useRef, useState, ReactNode, MouseEvent } from "react";
import Sidebar from "./sidebar";
import { useAuth } from "@/AuthContext";
import { Loader2, LogOut } from "lucide-react"; 
import Link from "next/link";

interface DashboardLayoutProps {
  children: ReactNode;
}

export default function DashboardLayout({ children }: DashboardLayoutProps) {
  const [sidebarOpen, setSidebarOpen] = useState<boolean>(false);
  const [isOpen, profileOpen] = useState<boolean>(false);
  
  // 2. Tentukan tipe untuk useRef (HTMLDivElement karena dipasang di div)
  const menuRef = useRef<HTMLDivElement>(null);
  
  // Ambil data dari useAuth (Tipe data otomatis terdeteksi jika useAuth sudah TS)
  const { user, loading, logout } = useAuth();

  // 3. Tipe data untuk event klik di luar menu
  useEffect(() => {
    const handleClickOutside = (event: globalThis.MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        profileOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // 4. Tipe data untuk handler logout
  const handleLogoutClick = async (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    e.stopPropagation();

    try {
      await logout();
      profileOpen(false);
      setSidebarOpen(false);
    } catch (error) {
      console.error("Logout gagal:", error);
    }
  };

  if (loading) {
    return (
      <div className="p-10 text-center font-bold">
        <Loader2 />
      </div>
    );
  }

  return (
    <div className="flex min-h-screen bg-slate-50 text-slate-900">
      {/* Sidebar - Pastikan komponen Sidebar sudah mendukung tipe props ini */}
      <Sidebar isOpen={sidebarOpen} setIsOpen={setSidebarOpen} />

      <div className="flex-1 lg:ml-64 flex flex-col min-w-0">
        {/* Header Dashboard */}
        <header className="sticky top-0 z-30 flex h-16 items-center justify-between border-b bg-white px-6 shadow-sm">
          <button
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="rounded-lg p-2 hover:bg-slate-100 lg:hidden"
          >
            <span className="font-bold text-slate-600">MENU</span>
          </button>

          <div className="relative ml-auto" ref={menuRef}>
            <div
              className="flex items-center ml-auto gap-3 cursor-pointer"
              onClick={() => profileOpen(!isOpen)}
            >
              <div className="text-right hidden sm:block">
                <p className="text-sm font-semibold text-slate-800">
                  {user?.name ?? "-"}
                </p>
                <p className="text-xs text-slate-500">UMKM Manager</p>
              </div>
              {/* Avatar Placeholder */}
              <div className="h-10 w-10 rounded-full bg-blue-600 border-2 border-white shadow-sm"></div>
            </div>

            {/* Dropdown Menu */}
            {isOpen && (
              <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-slate-100 py-2 z-50 animate-in fade-in zoom-in duration-150">
                <div className="px-4 py-2 border-b border-slate-50 sm:hidden">
                  <p className="text-sm font-semibold text-slate-800">
                    {user?.name}
                  </p>
                  <p className="text-xs text-slate-500">UMKM Manager</p>
                </div>

                <Link
                  href="/dashboard/profile"
                  className="w-full text-left block px-4 py-2 text-sm hover:bg-blue-50 transition-colors"
                >
                  Profil
                </Link>
                
                <button
                  onClick={handleLogoutClick}
                  className="w-full text-left flex items-center gap-2 px-4 py-2 text-sm text-red-600 hover:bg-red-50 transition-colors"
                >
                  <LogOut size={16} />
                  Keluar
                </button>
              </div>
            )}
          </div>
        </header>

        {/* Konten Utama */}
        <main className="p-6 lg:p-10">{children}</main>
      </div>
    </div>
  );
}
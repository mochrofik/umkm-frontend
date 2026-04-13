"use client";

import React, { useEffect, useRef, useState, ReactNode, MouseEvent, useCallback } from "react";
import Sidebar from "./sidebar";
import { useAuth } from "@/AuthContext";
import { Loader2, LogOut, UserIcon } from "lucide-react"; 
import Link from "next/link";
import { getData } from "@/helper/apiHelper";
import { usePathname, useRouter } from "next/navigation";
import Loading from "@/components/Loading";

interface DashboardLayoutProps {
  children: ReactNode;
}

export default function DashboardLayout({ children }: DashboardLayoutProps) {
  const router = useRouter();
  const pathname = usePathname();
  const { user, role, loading, logout } = useAuth();

  // State Management
  const [sidebarOpen, setSidebarOpen] = useState<boolean>(false);
  const [isProfileOpen, setProfileOpen] = useState<boolean>(false);
  const [isDataFetching, setDataFetching] = useState<boolean>(false);
  const [avatarUrl, setAvatarUrl] = useState<string>("");
  const [isMounted, setIsMounted] = useState(false);

  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    console.log("mounted");
    
    setIsMounted(true);
  }, []);

  const getProfile = useCallback(async () => {
    if (!user || avatarUrl) return; 
    try {
      setDataFetching(true);
      const url = process.env.NEXT_PUBLIC_SITE_URL;
      const response = await getData<any>(`${url}api/get-profile`, router);
      
      if (response?.success && response.data?.data) {
        const profile = response.data.data;
        const iconUrl = profile['get_store']?.['logo_url'];
        if (iconUrl) setAvatarUrl(iconUrl);
      }
    } catch (error) {
      console.error("Failed to fetch profile:", error);
    } finally {
      setDataFetching(false);
    }
  }, [user, avatarUrl, router]);

  useEffect(() => {
    if (!isMounted || loading) return;
    // Proteksi Rute: Jika tidak ada role/user, tendang ke login
    if (!role) {
      router.replace("/login");
      return;
    }

    if (user) {
      getProfile();
    }
    const handleClickOutside = (event: globalThis.MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setProfileOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [user, role, loading, isMounted, router, getProfile, pathname]);

  // 4. Handle Logout
  const handleLogoutClick = async (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    logout();
    setProfileOpen(false);
  };

  if (!isMounted || loading) {
    return (
      <div className="flex h-screen w-full items-center justify-center bg-white">
        <Loading fullPage={true} />
      </div>
    );
  }

  // B. Proteksi Role (Customer tidak boleh masuk)
  if (role === "customer") {
    return (
      <div className="flex h-screen w-full items-center justify-center p-10 text-center">
        <div className="max-w-md bg-white p-8 rounded-xl shadow-lg border border-slate-100">
          <h1 className="text-2xl font-bold text-red-600">Akses Ditolak</h1>
          <p className="text-gray-600 mt-2">Anda tidak memiliki izin akses ke Dashboard Manager.</p>
          <Link href="/" className="mt-6 inline-block bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition">
            Kembali ke Beranda
          </Link>
        </div>
      </div>
    );
  }

  // C. Jika tidak ada user dan tidak sedang loading (keamanan tambahan saat redirect)
  if (!role) return null;

  return (
    <div className="flex min-h-screen bg-slate-50 text-slate-900">
      <Sidebar isOpen={sidebarOpen} setIsOpen={setSidebarOpen} />

      <div className="flex-1 lg:ml-64 flex flex-col min-w-0">
  <header className="sticky top-0 z-30 flex h-16 items-center border-b bg-white px-6 shadow-sm">
    
    {/* POJOK KIRI: Tombol Menu (Mobile) */}
    <button
      onClick={() => setSidebarOpen(!sidebarOpen)}
      className="rounded-lg p-2 hover:bg-slate-100 lg:hidden"
    >
      <span className="font-bold text-slate-600 text-sm">MENU</span>
    </button>

    {/* GROUP KANAN: Berisi "Utama" dan "Profile" */}
    <div className="ml-auto flex items-center gap-4">
      
      {/* Tombol Utama */}
      <Link href={"/"}>
        <span className="font-poppins bg-blue-100 font-bold text-blue-700 cursor-pointer hover:bg-blue-200 px-4 py-1.5 rounded-xl text-sm transition-colors">
          Utama
        </span>
      </Link>

      {/* Profile Dropdown */}
      <div className="relative" ref={menuRef}>
        <div
          className="flex items-center gap-3 cursor-pointer p-1.5 rounded-full hover:bg-slate-50 transition"
          onClick={() => setProfileOpen(!isProfileOpen)}
        >
          <div className="text-right hidden sm:block">
            <p className="text-sm font-semibold text-slate-800 leading-none">
              {user?.name ?? "User"}
            </p>
            <p className="text-[10px] text-slate-500 mt-1 uppercase tracking-wider font-bold">
              UMKM Manager
            </p>
          </div>

          <div className="h-10 w-10 rounded-full bg-slate-200 flex items-center justify-center overflow-hidden border border-slate-200">
            {avatarUrl ? (
              <img src={avatarUrl} alt="profile" className="h-full w-full object-cover" />
            ) : (
              <UserIcon size={20} className="text-slate-500" />
            )}
          </div>
        </div>

        {/* Dropdown Menu */}
        {isProfileOpen && (
          <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-xl border border-slate-100 py-2 z-50 animate-in fade-in zoom-in duration-150">
            <Link
              href="/dashboard/profile"
              onClick={() => setProfileOpen(false)}
              className="w-full text-left block px-4 py-2 text-sm text-slate-700 hover:bg-blue-50 transition-colors"
            >
              Profil Saya
            </Link>
            <hr className="my-1 border-slate-100" />
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
    </div>
  </header>

  <main className="p-4 lg:p-8">
    {isDataFetching && (
      <div className="fixed top-0 left-0 w-full h-1 bg-blue-100 z-50">
        <div className="h-full bg-blue-600 animate-pulse w-1/3"></div>
      </div>
    )}
    {children}
  </main>
</div>
    </div>
  );
}
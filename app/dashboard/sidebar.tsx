"use client";

import React, { ReactNode, MouseEvent } from "react";
import Link from "next/link";
import {
  LayoutDashboard,
  ShoppingBag,
  Settings,
  LogOut,
  Store,
  Tags,
  Package,
  Users,
  ChevronRight,
  UtensilsCrossed,
} from "lucide-react";
import { useAuth } from "@/AuthContext";
import { usePathname } from "next/navigation";

// 1. Definisikan Interface untuk Props Sidebar
interface SidebarProps {
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
}

// 2. Definisikan Interface untuk Item Menu
interface MenuItem {
  name: string;
  role?: string[];
  icon: ReactNode;
  path: string;
}

export default function Sidebar({ isOpen, setIsOpen }: SidebarProps) {
  const { role, logout, user } = useAuth();
  const pathname = usePathname();

  const menuItems: MenuItem[] = [
    {
      name: "Dashboard",
      role: ["admin", "store"],
      icon: <LayoutDashboard size={20} />,
      path: "/dashboard",
    },
    {
      name: "Pesanan Masuk",
      role: ["store"],
      icon: <ShoppingBag size={20} />,
      path: "/dashboard/orders",
    },
    {
      name: "Data Toko",
      role: ["admin"],
      icon: <Store size={20} />,
      path: "/dashboard/store",
    },
    {
      name: "Kategori",
      role: ["admin"],
      icon: <Tags size={20} />,
      path: "/dashboard/categories",
    },
    {
      name: "Kategori Produk",
      role: ["store"],
      icon: <Tags size={20} />,
      path: "/dashboard/product-categories",
    },
    {
      name: "Produk",
      role: ["store"],
      icon: <Package size={20} />,
      path: "/dashboard/products",
    },
    {
      name: "Pelanggan",
      role: ["admin"],
      icon: <Users size={20} />,
      path: "/dashboard/customer",
    },
  ];

  const handleLinkClick = (e: MouseEvent<HTMLAnchorElement>, path: string) => {
    if (pathname === path) {
      e.preventDefault();
      window.location.reload();
    }
    setIsOpen(false);
  };

  const filteredMenu = menuItems.filter(
    (item) => !item.role || (role && item.role.includes(role))
  );

  // Grouping items for better UX
  const mainItems = filteredMenu.filter(item => ["Dashboard", "Pesanan Masuk"].includes(item.name));
  const managementItems = filteredMenu.filter(item => !["Dashboard", "Pesanan Masuk"].includes(item.name));

  return (
    <aside
      className={`fixed left-0 top-0 z-50 h-screen w-72 bg-white border-r border-gray-100 transition-all duration-300 ease-in-out shadow-2xl lg:shadow-none ${
        isOpen ? "translate-x-0" : "-translate-x-full"
      } lg:translate-x-0 flex flex-col font-poppins`}
    >
      {/* Brand Logo */}
      <div className="flex h-24 items-center px-8 border-b border-gray-50 bg-white sticky top-0 z-10">
        <Link href="/" className="flex items-center gap-3 group">
          <div className="bg-[#4C8CE4] p-2.5 rounded-2xl shadow-lg shadow-blue-200 group-hover:scale-110 transition-transform duration-300">
            <UtensilsCrossed className="text-white w-6 h-6" />
          </div>
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

      <div className="flex-1 overflow-y-auto custom-scrollbar py-6 px-4 space-y-8">
        {/* Menu Sections */}
        <div className="space-y-6">
          {mainItems.length > 0 && (
            <div>
              <p className="px-4 mb-3 text-[11px] font-black text-gray-400 uppercase tracking-[0.2em]">Menu Utama</p>
              <div className="space-y-1">
                {mainItems.map((item, index) => {
                  const isActive = pathname === item.path;
                  return (
                    <Link
                      key={index}
                      href={item.path}
                      onClick={(e) => handleLinkClick(e, item.path)}
                      className={`flex items-center justify-between group rounded-2xl px-4 py-3.5 transition-all duration-200 ${
                        isActive 
                          ? "bg-gradient-to-r from-[#4C8CE4] to-blue-600 text-white shadow-lg shadow-blue-100" 
                          : "text-gray-500 hover:bg-blue-50 hover:text-[#4C8CE4]"
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <span className={`${isActive ? "text-white" : "text-gray-400 group-hover:text-[#4C8CE4]"}`}>
                          {item.icon}
                        </span>
                        <span className="font-bold text-[15px]">{item.name}</span>
                      </div>
                      {isActive && <ChevronRight size={16} />}
                    </Link>
                  );
                })}
              </div>
            </div>
          )}

          {managementItems.length > 0 && (
            <div>
              <p className="px-4 mb-3 text-[11px] font-black text-gray-400 uppercase tracking-[0.2em]">Manajemen</p>
              <div className="space-y-1">
                {managementItems.map((item, index) => {
                  const isActive = pathname === item.path;
                  return (
                    <Link
                      key={index}
                      href={item.path}
                      onClick={(e) => handleLinkClick(e, item.path)}
                      className={`flex items-center justify-between group rounded-2xl px-4 py-3.5 transition-all duration-200 ${
                        isActive 
                          ? "bg-gradient-to-r from-[#4C8CE4] to-blue-600 text-white shadow-lg shadow-blue-100" 
                          : "text-gray-500 hover:bg-blue-50 hover:text-[#4C8CE4]"
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <span className={`${isActive ? "text-white" : "text-gray-400 group-hover:text-[#4C8CE4]"}`}>
                          {item.icon}
                        </span>
                        <span className="font-bold text-[15px]">{item.name}</span>
                      </div>
                      {isActive && <ChevronRight size={16} />}
                    </Link>
                  );
                })}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Logout Footer */}
      <div className="p-4 border-t border-gray-50 bg-white">
        <button
          onClick={logout}
          className="flex w-full items-center gap-3 rounded-2xl px-4 py-4 text-gray-500 hover:bg-red-50 hover:text-red-600 transition-all duration-200 font-bold text-[15px]"
        >
          <div className="bg-red-100 p-2 rounded-xl group-hover:bg-red-200 transition-colors">
            <LogOut size={20} className="text-red-600" />
          </div>
          <span>Keluar Aplikasi</span>
        </button>
      </div>
    </aside>
  );
}
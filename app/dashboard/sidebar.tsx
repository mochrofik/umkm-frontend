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
  role?: string[]; // Opsional karena ada menu untuk semua role
  icon: ReactNode;
  path: string;
}

export default function Sidebar({ isOpen, setIsOpen }: SidebarProps) {
  const { role, logout } = useAuth();
  const pathname = usePathname();

  // 3. Berikan tipe pada array menuItems
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
      name: "Kategori Produk", // Dibedakan namanya agar lebih jelas
      role: ["store"],
      icon: <Tags size={20} />,
      path: "/dashboard/product-categories",
    },
    {
      name: "Product",
      role: ["store"],
      icon: <Package size={20} />,
      path: "/dashboard/products",
    },
    {
      name: "Customer",
      role: ["admin"],
      icon: <Users size={20} />,
      path: "/dashboard/customer",
    },
    {
      name: "Pengaturan",
      icon: <Settings size={20} />,
      path: "/dashboard/settings",
    },
  ];

  // 4. Type data untuk event handler
  const handleLinkClick = (e: MouseEvent<HTMLAnchorElement>, path: string) => {
    if (pathname === path) {
      e.preventDefault();
      window.location.reload();
    }
    setIsOpen(false);
  };

  return (
    <aside
      className={`fixed left-0 top-0 z-40 h-screen w-64 bg-slate-900 text-slate-300 transition-transform ${
        isOpen ? "translate-x-0" : "-translate-x-full"
      } lg:translate-x-0 overflow-y-auto`}
    >
      <div className="flex h-20 items-center px-6 border-b border-slate-800">
        <span className="text-xl font-bold text-white tracking-wide">
          UMKM <span className="text-blue-500">ADMIN</span>
        </span>
      </div>

      <nav className="flex-1 space-y-1 px-3 py-4">
        {menuItems.map((item, index) => {
          // Logika pengecekan role yang lebih aman di TypeScript
          const hasAccess = !item.role || (role && item.role.includes(role));

          if (hasAccess) {
            const isActive = pathname === item.path;
            
            return (
              <Link
                key={index}
                href={item.path}
                onClick={(e) => handleLinkClick(e, item.path)}
                className={`flex items-center rounded-lg px-3 py-2.5 transition-all hover:bg-slate-800 hover:text-white group ${
                  isActive ? "bg-slate-800 text-white" : ""
                }`}
              >
                <span
                  className={`${
                    isActive ? "text-blue-400" : "text-slate-400"
                  } group-hover:text-blue-400`}
                >
                  {item.icon}
                </span>
                <span className="ml-3 font-medium">{item.name}</span>
              </Link>
            );
          }
          return null;
        })}
      </nav>

      <div className="border-t border-slate-800 p-4">
        <button
          onClick={logout}
          className="flex w-full items-center rounded-lg px-3 py-2 hover:bg-red-900/20 hover:text-red-400 transition-all"
        >
          <LogOut size={20} />
          <span className="ml-3 font-medium">Keluar</span>
        </button>
      </div>
    </aside>
  );
}
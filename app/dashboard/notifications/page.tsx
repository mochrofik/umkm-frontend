"use client";

import React, { useState } from "react";
import { Bell, CheckCircle2, Clock, Trash2 } from "lucide-react";

export default function NotificationsPage() {
  const [notifications, setNotifications] = useState([
    { id: 1, title: "Pesanan Baru", message: "Anda menerima pesanan baru dari Pelanggan. Segera cek detail pesanan di menu Pesanan Masuk.", time: "5 menit yang lalu", isRead: false, type: "order" },
    { id: 2, title: "Stok Menipis", message: "Produk 'Sego Pecel' stoknya hampir habis (tersisa 3 porsi). Segera update stok produk Anda.", time: "1 jam yang lalu", isRead: false, type: "stock" },
    { id: 3, title: "Pembayaran Berhasil", message: "Pembayaran untuk order #1234 telah berhasil diverifikasi oleh sistem.", time: "2 jam yang lalu", isRead: true, type: "payment" },
    { id: 4, title: "Update Sistem", message: "Fitur notifikasi baru telah aktif untuk memudahkan Anda memantau toko.", time: "1 hari yang lalu", isRead: true, type: "system" },
    { id: 5, title: "Toko Dibuka", message: "Status toko Anda sekarang: Buka. Pelanggan dapat melihat produk Anda.", time: "2 hari yang lalu", isRead: true, type: "status" },
  ]);

  const markAllAsRead = () => {
    setNotifications(notifications.map(n => ({ ...n, isRead: true })));
  };

  const deleteNotification = (id: number) => {
    setNotifications(notifications.filter(n => n.id !== id));
  };

  return (
    <div className="max-w-4xl mx-auto py-8 px-4 font-poppins">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-8 gap-4">
        <div>
          <h1 className="text-3xl font-black text-gray-900 flex items-center gap-3">
            <Bell className="text-[#4C8CE4]" size={32} />
            Notifikasi
          </h1>
          <p className="text-gray-500 mt-1">Pantau semua aktivitas terbaru di toko Anda</p>
        </div>
        <button
          onClick={markAllAsRead}
          className="flex items-center gap-2 px-4 py-2 bg-blue-50 text-blue-600 rounded-xl font-bold text-sm hover:bg-blue-100 transition-colors"
        >
          <CheckCircle2 size={18} />
          Tandai Semua Dibaca
        </button>
      </div>

      <div className="bg-white rounded-[2.5rem] shadow-sm border border-gray-100 overflow-hidden">
        {notifications.length > 0 ? (
          <div className="divide-y divide-gray-50">
            {notifications.map((notif) => (
              <div
                key={notif.id}
                className={`p-6 transition-all duration-300 hover:bg-gray-50/50 flex gap-4 sm:gap-6 ${
                  !notif.isRead ? "bg-blue-50/20" : ""
                }`}
              >
                <div className={`mt-1 flex-shrink-0 h-12 w-12 rounded-2xl flex items-center justify-center ${
                  !notif.isRead ? "bg-blue-500 text-white shadow-lg shadow-blue-100" : "bg-gray-100 text-gray-400"
                }`}>
                  <Bell size={20} />
                </div>
                
                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between gap-4 mb-1">
                    <h3 className={`text-lg font-bold truncate ${!notif.isRead ? "text-gray-900" : "text-gray-600"}`}>
                      {notif.title}
                    </h3>
                    <button 
                      onClick={() => deleteNotification(notif.id)}
                      className="text-gray-300 hover:text-red-500 transition-colors p-1"
                    >
                      <Trash2 size={18} />
                    </button>
                  </div>
                  <p className={`text-sm mb-3 ${!notif.isRead ? "text-gray-700" : "text-gray-500"}`}>
                    {notif.message}
                  </p>
                  <div className="flex items-center gap-4">
                    <span className="flex items-center gap-1.5 text-xs text-gray-400 font-medium">
                      <Clock size={14} />
                      {notif.time}
                    </span>
                    {!notif.isRead && (
                      <span className="h-2 w-2 rounded-full bg-blue-500" />
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="py-20 text-center">
            <div className="bg-gray-50 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-4">
              <Bell size={32} className="text-gray-300" />
            </div>
            <h3 className="text-xl font-bold text-gray-900">Belum ada notifikasi</h3>
            <p className="text-gray-500 mt-1">Kami akan memberi tahu Anda jika ada aktivitas baru.</p>
          </div>
        )}
      </div>
    </div>
  );
}

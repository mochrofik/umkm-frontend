"use client";

import React from "react";
import { useCart } from "@/CartContext";
import { Trash2, Plus, Minus, ShoppingBag, ArrowLeft, CreditCard } from "lucide-react";
import Link from "next/link";
import Image from "next/image";

export default function CartPage() {
  const { cart, removeFromCart, updateQuantity, totalPrice, totalItems, loading } = useCart();

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      minimumFractionDigits: 0,
    }).format(value);
  };

  if (loading && cart.length === 0) {
    return (
      <div className="min-h-[70vh] flex flex-col items-center justify-center p-6 bg-white rounded-3xl mx-4 mt-8 shadow-sm border border-slate-100 font-poppins">
        <div className="w-12 h-12 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mb-4"></div>
        <p className="text-slate-500">Memuat keranjang...</p>
      </div>
    );
  }

  if (cart.length === 0) {

    return (
      <div className="min-h-[70vh] flex flex-col items-center justify-center p-6 bg-white rounded-3xl mx-4 mt-8 shadow-sm border border-slate-100 font-poppins">
        <div className="w-24 h-24 bg-slate-50 rounded-full flex items-center justify-center mb-6">
          <ShoppingBag size={48} className="text-slate-300" />
        </div>
        <h2 className="text-2xl font-bold text-slate-800 mb-2">Keranjang Kosong</h2>
        <p className="text-slate-500 text-center mb-8 max-w-xs">
          Wah, keranjang belanjaanmu masih kosong nih. Yuk cari makanan enak di sekitarmu!
        </p>
        <Link 
          href="/" 
          className="bg-blue-600 text-white px-8 py-3 rounded-2xl font-bold shadow-lg shadow-blue-100 hover:bg-blue-700 transition-all active:scale-95"
        >
          Mulai Belanja
        </Link>
      </div>
    );
  }

  return (
    <div className="p-6 max-w-4xl mx-auto font-poppins pb-32">
      <div className="flex items-center gap-4 mb-8">
        <Link href="/" className="p-2 hover:bg-white rounded-full transition-colors">
          <ArrowLeft size={24} className="text-slate-600" />
        </Link>
        <div>
          <h1 className="text-2xl font-bold text-slate-800">Keranjang Belanja</h1>
          <p className="text-sm text-slate-500">{totalItems} item siap dipesan</p>
        </div>
      </div>

      <div className="space-y-6">
        {/* Cart Items List */}
        <div className="bg-white rounded-3xl p-6 shadow-sm border border-slate-100 overflow-hidden">
          <div className="divide-y divide-slate-100">
            {cart.map((item) => (
              <div key={item.id} className="py-6 first:pt-0 last:pb-0 flex gap-4 sm:gap-6">
                <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-2xl overflow-hidden bg-slate-100 flex-shrink-0 relative">
                  <Image 
                    src={item.image_url || "/default-product.png"} 
                    alt={item.name}
                    fill
                    className="object-cover"
                    unoptimized
                  />
                </div>
                
                <div className="flex-1 flex flex-col justify-between">
                  <div className="flex justify-between items-start gap-2">
                    <div>
                      <h3 className="font-bold text-slate-800 text-base sm:text-lg">{item.name}</h3>
                      <p className="text-xs text-slate-500 font-medium uppercase tracking-wider">{item.store_name}</p>
                    </div>
                    <button 
                      onClick={() => removeFromCart(item.id)}
                      className="p-1.5 text-slate-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-all"
                    >
                      <Trash2 size={18} />
                    </button>
                  </div>
                  
                  <div className="flex items-center justify-between mt-4">
                    <span className="font-bold text-blue-600 text-base sm:text-lg">
                      {formatCurrency(item.price)}
                    </span>
                    
                    <div className="flex items-center gap-3 bg-slate-50 p-1 rounded-xl border border-slate-100">
                      <button 
                        onClick={() => updateQuantity(item.id, item.quantity - 1)}
                        className="w-8 h-8 flex items-center justify-center rounded-lg bg-white shadow-sm text-slate-600 hover:text-blue-600 transition-colors"
                      >
                        <Minus size={14} strokeWidth={3} />
                      </button>
                      <span className="w-8 text-center text-sm font-bold text-slate-800">
                        {item.quantity}
                      </span>
                      <button 
                        onClick={() => updateQuantity(item.id, item.quantity + 1)}
                        className="w-8 h-8 flex items-center justify-center rounded-lg bg-white shadow-sm text-slate-600 hover:text-blue-600 transition-colors"
                      >
                        <Plus size={14} strokeWidth={3} />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Order Summary */}
        <div className="bg-white rounded-3xl p-6 shadow-sm border border-slate-100">
          <h3 className="font-bold text-slate-800 mb-6 text-lg">Ringkasan Pesanan</h3>
          <div className="space-y-4">
            <div className="flex justify-between text-slate-600 text-sm">
              <span>Subtotal</span>
              <span className="font-semibold">{formatCurrency(totalPrice)}</span>
            </div>
            <div className="flex justify-between text-slate-600 text-sm">
              <span>Biaya Layanan</span>
              <span className="font-semibold">{formatCurrency(2000)}</span>
            </div>
            <div className="h-px bg-slate-100 my-2" />
            <div className="flex justify-between items-center">
              <span className="font-bold text-slate-800">Total Pembayaran</span>
              <span className="text-xl font-extrabold text-blue-600">
                {formatCurrency(totalPrice + 2000)}
              </span>
            </div>
          </div>
        </div>

        {/* Checkout Button */}
        <button className="w-full bg-orange-500 text-white py-4 rounded-3xl font-bold text-lg shadow-lg shadow-orange-100 hover:bg-orange-600 transition-all active:scale-95 flex items-center justify-center gap-3">
          <CreditCard size={24} />
          Pesan Sekarang
        </button>
      </div>
    </div>
  );
}

import { ArrowUpRight, DollarSign, Package, ShoppingCart } from "lucide-react";

export default function DashboardLayout() {

    const stats = [
    { title: "Total Omzet", value: "Rp 2.450.000", icon: <DollarSign size={20} />, color: "bg-blue-500" },
    { title: "Pesanan Hari Ini", value: "18", icon: <ShoppingCart size={20} />, color: "bg-green-500" },
    { title: "Produk Aktif", value: "12", icon: <Package size={20} />, color: "bg-orange-500" },
  ];

     return (
    <div>
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-slate-800">Ringkasan Hari Ini</h1>
        <p className="text-slate-500">Pantau performa UMKM Anda dengan mudah.</p>
      </div>

      {/* Stats Grid */}
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 mb-10">
        {stats.map((stat, index) => (
          <div key={index} className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
            <div className={`w-12 h-12 ${stat.color} text-white rounded-xl flex items-center justify-center mb-4`}>
              {stat.icon}
            </div>
            <p className="text-sm font-medium text-slate-500">{stat.title}</p>
            <h3 className="text-2xl font-bold text-slate-800 mt-1">{stat.value}</h3>
          </div>
        ))}
      </div>

      {/* Tabel Ringkas Pesanan */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
        <div className="p-6 border-b border-slate-100 flex items-center justify-between">
          <h2 className="font-bold text-slate-800 text-lg">Pesanan Terbaru</h2>
          <button className="text-blue-600 text-sm flex items-center hover:underline">
            Lihat Semua <ArrowUpRight size={16} className="ml-1" />
          </button>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead className="bg-slate-50 text-slate-500 text-xs uppercase tracking-wider">
              <tr>
                <th className="px-6 py-4 font-semibold">Order ID</th>
                <th className="px-6 py-4 font-semibold">Nama Menu</th>
                <th className="px-6 py-4 font-semibold">Total</th>
                <th className="px-6 py-4 font-semibold">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-sm">
              {[1, 2, 3].map((i) => (
                <tr key={i} className="hover:bg-slate-50 transition-colors">
                  <td className="px-6 py-4 font-medium text-slate-900">#ORD-00{i}</td>
                  <td className="px-6 py-4 text-slate-600">Nasi Goreng Spesial</td>
                  <td className="px-6 py-4 font-semibold">Rp 25.000</td>
                  <td className="px-6 py-4">
                    <span className="px-2 py-1 bg-blue-100 text-blue-700 rounded-md text-[10px] font-bold">PROSES</span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
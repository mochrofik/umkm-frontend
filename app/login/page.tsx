"use client";
import { useAuth } from "@/AuthContext";
import ButtonUI from "@/components/ui/button/Button";
import InputUI from "@/components/ui/input/Input";
import LinkUI from "@/components/ui/link/Link";
import GoogleLogo from "@/components/ui/logo/google/Google";
import { getData, postData } from "@/helper/apiHelper";
import { loginGoogleService, loginService } from "@/service/auth.service";
import { ILogin } from "@/types/ILogin";
import { ChevronLeft, Loader2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { FormEvent, useState } from "react";
import toast from "react-hot-toast";

interface LoginResponse {
  data: {
    user: any;
    role: string[];
    access_token: string;
  };
  message?: string;
}

export default function LoginPage() {
  const router = useRouter();
  const { login } = useAuth();

  const [loading, setLoading] = useState<boolean>(false);
  const [formData, setFormData] = useState<ILogin>({
    email: "",
    password: "",
  });

  const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await loginService(formData);

      if (response.success) {
        const data = (await response.data) as any;
        const role = data.data.role[0];

        login(data.data.user, role, data.data.access_token);

        if (role === "admin" || role === "store") {
          router.push("/dashboard");
        } else {
          router.push("/");
        }
      } else {
        const errorData = (await response.data) as any;
        toast.error(JSON.stringify(errorData.message));
      }
    } catch (error) {
      console.error("Login error:", error);
      toast.error("Login gagal. Silakan coba lagi.");
    } finally {
      setLoading(false);
    }
  };

  const loginGoogle = async () => {
    try {
      const response = await loginGoogleService();
      if (response.success) {
        const data = (await response.data) as any;
        window.location.href = data.url;
      } else {
        console.log(response);
      }
    } catch (error) {
      console.error("Login error:", error);
      toast.error("Login gagal. Silakan coba lagi.");
    } finally {
      setLoading(false);
    }
  };
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
        <button
          onClick={() => router.replace("/")}
          className="flex items-center gap-1 text-slate-500 hover:text-blue-600 transition-colors mb-8 group"
        >
          <ChevronLeft
            size={20}
            className="group-hover:-translate-x-1 transition-transform"
          />
          <span className="text-sm font-medium">Kembali</span>
        </button>

        <div className="mb-10 text-center">
          <h1 className="text-3xl font-extrabold text-blue-600 tracking-tight">
            Le melle!
          </h1>
          <p className="text-slate-500 mt-2 text-sm">
            Dukung UMKM daerahmu dengan rasa yang juara!
          </p>
        </div>
        <form onSubmit={handleLogin} className="space-y-5">
          <InputUI
            type="text"
            value={formData.email}
            placeholder="Contoh: 08123456xxx"
            onChange={(e) =>
              setFormData({ ...formData, email: e.target.value })
            }
            label="Email atau Nomor HP"
          />

          <InputUI
            type="password"
            value={formData.password}
            placeholder="Masukkan kata sandi"
            onChange={(e) =>
              setFormData({ ...formData, password: e.target.value })
            }
            label="Kata Sandi"
          />

          {/* Tombol Login Biru Modern */}

          <ButtonUI loading={loading} type="submit">
            {loading && <Loader2 className="animate-spin" size={20} />}
            {loading ? "Memproses..." : "Masuk Sekarang"}
          </ButtonUI>
        </form>
        <div className="relative my-8">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-slate-200"></div>
          </div>
          <div className="relative flex justify-center text-sm">
            <span className="px-4 bg-white text-slate-500 font-medium uppercase tracking-wider text-xs">
              Atau masuk lebih cepat
            </span>
          </div>
        </div>

        <ButtonUI
          bgColor="bg-white"
          textColor="text-black"
          hoverBgColor="bg-slate-50"
          hoverTextColor="text-black"
          type="button"
          onClick={() => loginGoogle()}
          loading={loading}
        >
          <GoogleLogo />
          <span>Masuk dengan Google</span>
        </ButtonUI>

        <div className="mt-8 text-center text-sm text-slate-500 gap-1 flex justify-center">
          Belum punya akun?
          <LinkUI href="/register-customer">Registrasi</LinkUI>
        </div>
      </div>
    </div>
  );
}

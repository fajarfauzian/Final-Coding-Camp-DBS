
import { useState } from "react";
import { Eye, EyeOff, Lock, Mail } from "lucide-react";
import { Link } from "react-router-dom";

const Login = () => {
  const [showPassword, setShowPassword] = useState(false);
  
  return (
    <div className="min-h-screen flex items-center justify-center bg-background p-4">
      <div className="w-full max-w-md">
        <div className="bg-white rounded-xl p-8 shadow-md animate-fade-in">
          <div className="text-center mb-8">
            <div className="font-bold text-dbs-blue text-3xl flex items-center justify-center mb-2">
              <span className="inline-block mr-1 font-bold">DBS</span>
              <span className="text-dbs-red font-light">Finance</span>
            </div>
            <p className="text-muted-foreground">Masuk ke akun Anda</p>
          </div>
          
          <form className="space-y-6">
            <div className="space-y-2">
              <label htmlFor="email" className="text-sm font-medium">
                Email
              </label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <input
                  id="email"
                  type="email"
                  placeholder="Masukkan alamat email Anda"
                  className="pl-10 pr-4 py-2 rounded-lg border border-input w-full focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                />
              </div>
            </div>
            
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <label htmlFor="password" className="text-sm font-medium">
                  Kata Sandi
                </label>
                <Link to="/forgot-password" className="text-xs text-dbs-blue hover:underline">
                  Lupa Kata Sandi?
                </Link>
              </div>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="Masukkan kata sandi Anda"
                  className="pl-10 pr-10 py-2 rounded-lg border border-input w-full focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-muted-foreground"
                >
                  {showPassword ? (
                    <EyeOff className="h-4 w-4" />
                  ) : (
                    <Eye className="h-4 w-4" />
                  )}
                </button>
              </div>
            </div>
            
            <div className="flex items-center">
              <input
                id="remember"
                type="checkbox"
                className="h-4 w-4 border border-input rounded bg-background"
              />
              <label htmlFor="remember" className="ml-2 text-sm text-muted-foreground">
                Ingat saya
              </label>
            </div>
            
            <Link to="/">
              <button
                type="submit"
                className="w-full py-2 rounded-lg bg-primary text-primary-foreground font-medium shadow-sm transition-colors hover:bg-primary/90"
              >
                Masuk
              </button>
            </Link>
          </form>
          
          <div className="mt-6 text-center">
            <p className="text-sm text-muted-foreground">
              Belum punya akun?{" "}
              <Link to="/register" className="text-dbs-blue hover:underline">
                Daftar
              </Link>
            </p>
          </div>
          
          <div className="mt-8">
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-muted"></div>
              </div>
              <div className="relative flex justify-center text-xs">
                <span className="bg-white px-2 text-muted-foreground">Atau masuk dengan</span>
              </div>
            </div>
            
            <div className="mt-4 grid grid-cols-2 gap-3">
              <button className="flex items-center justify-center rounded-lg border border-input bg-background px-4 py-2 text-sm font-medium shadow-sm transition-colors hover:bg-muted">
                Google
              </button>
              <button className="flex items-center justify-center rounded-lg border border-input bg-background px-4 py-2 text-sm font-medium shadow-sm transition-colors hover:bg-muted">
                Facebook
              </button>
            </div>
          </div>
        </div>
        
        <div className="mt-4 text-center text-xs text-muted-foreground">
          <p>© 2024 DBS Bank. Semua hak dilindungi.</p>
        </div>
      </div>
    </div>
  );
};

export default Login;

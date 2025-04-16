
import { 
  Home, 
  BarChart3, 
  PiggyBank, 
  Clock, 
  ArrowLeftRight, 
  Settings, 
  UserCircle, 
  CreditCard,
  ShoppingBag,
  PackageOpen
} from "lucide-react";
import { Link, useLocation } from "react-router-dom";
import { cn } from "@/lib/utils";

export function Sidebar() {
  const location = useLocation();

  return (
    <aside className="fixed top-16 left-0 bottom-0 w-16 md:w-64 bg-sidebar border-r border-border z-30 transition-all duration-300 ease-in-out">
      <div className="flex flex-col h-full py-4">
        <div className="flex-1 px-3">
          <div className="space-y-1">
            <Link 
              to="/" 
              className={cn(
                "flex items-center rounded-md px-3 py-2 text-sm font-medium hover:bg-secondary",
                location.pathname === "/" && "bg-secondary"
              )}
            >
              <Home className={cn(
                "h-5 w-5 mr-3",
                location.pathname === "/" ? "text-dbs-blue" : "text-gray-500"
              )} />
              <span className="hidden md:inline-block">Dashboard</span>
            </Link>
            <Link 
              to="/accounts" 
              className={cn(
                "flex items-center rounded-md px-3 py-2 text-sm font-medium text-foreground hover:bg-secondary",
                location.pathname === "/accounts" && "bg-secondary"
              )}
            >
              <CreditCard className={cn(
                "h-5 w-5 mr-3",
                location.pathname === "/accounts" ? "text-dbs-blue" : "text-gray-500"
              )} />
              <span className="hidden md:inline-block">Akun</span>
            </Link>
            <Link 
              to="/transactions" 
              className={cn(
                "flex items-center rounded-md px-3 py-2 text-sm font-medium text-foreground hover:bg-secondary",
                location.pathname === "/transactions" && "bg-secondary"
              )}
            >
              <ArrowLeftRight className={cn(
                "h-5 w-5 mr-3",
                location.pathname === "/transactions" ? "text-dbs-blue" : "text-gray-500"
              )} />
              <span className="hidden md:inline-block">Transaksi</span>
            </Link>
            <Link 
              to="/savings" 
              className={cn(
                "flex items-center rounded-md px-3 py-2 text-sm font-medium text-foreground hover:bg-secondary",
                location.pathname === "/savings" && "bg-secondary"
              )}
            >
              <PiggyBank className={cn(
                "h-5 w-5 mr-3",
                location.pathname === "/savings" ? "text-dbs-blue" : "text-gray-500"
              )} />
              <span className="hidden md:inline-block">Tabungan</span>
            </Link>
            <Link 
              to="/history" 
              className={cn(
                "flex items-center rounded-md px-3 py-2 text-sm font-medium text-foreground hover:bg-secondary",
                location.pathname === "/history" && "bg-secondary"
              )}
            >
              <Clock className={cn(
                "h-5 w-5 mr-3",
                location.pathname === "/history" ? "text-dbs-blue" : "text-gray-500"
              )} />
              <span className="hidden md:inline-block">Riwayat</span>
            </Link>
            <Link 
              to="/products" 
              className={cn(
                "flex items-center rounded-md px-3 py-2 text-sm font-medium text-foreground hover:bg-secondary",
                location.pathname === "/products" && "bg-secondary"
              )}
            >
              <PackageOpen className={cn(
                "h-5 w-5 mr-3",
                location.pathname === "/products" ? "text-dbs-blue" : "text-gray-500"
              )} />
              <span className="hidden md:inline-block">Produk</span>
            </Link>
            <Link 
              to="/orders" 
              className={cn(
                "flex items-center rounded-md px-3 py-2 text-sm font-medium text-foreground hover:bg-secondary",
                location.pathname === "/orders" && "bg-secondary"
              )}
            >
              <ShoppingBag className={cn(
                "h-5 w-5 mr-3",
                location.pathname === "/orders" ? "text-dbs-blue" : "text-gray-500"
              )} />
              <span className="hidden md:inline-block">Pesanan</span>
            </Link>
            <Link 
              to="/reports" 
              className={cn(
                "flex items-center rounded-md px-3 py-2 text-sm font-medium text-foreground hover:bg-secondary",
                location.pathname === "/reports" && "bg-secondary"
              )}
            >
              <BarChart3 className={cn(
                "h-5 w-5 mr-3",
                location.pathname === "/reports" ? "text-dbs-blue" : "text-gray-500"
              )} />
              <span className="hidden md:inline-block">Laporan</span>
            </Link>
          </div>
        </div>
        
        <div className="px-3 mt-auto">
          <div className="space-y-1">
            <Link 
              to="/profile" 
              className={cn(
                "flex items-center rounded-md px-3 py-2 text-sm font-medium text-foreground hover:bg-secondary",
                location.pathname === "/profile" && "bg-secondary"
              )}
            >
              <UserCircle className={cn(
                "h-5 w-5 mr-3",
                location.pathname === "/profile" ? "text-dbs-blue" : "text-gray-500"
              )} />
              <span className="hidden md:inline-block">Profil</span>
            </Link>
            <Link 
              to="/settings" 
              className={cn(
                "flex items-center rounded-md px-3 py-2 text-sm font-medium text-foreground hover:bg-secondary",
                location.pathname === "/settings" && "bg-secondary"
              )}
            >
              <Settings className={cn(
                "h-5 w-5 mr-3",
                location.pathname === "/settings" ? "text-dbs-blue" : "text-gray-500"
              )} />
              <span className="hidden md:inline-block">Pengaturan</span>
            </Link>
          </div>
        </div>
      </div>
    </aside>
  );
}

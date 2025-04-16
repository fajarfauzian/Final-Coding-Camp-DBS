
import { Bell, Settings, User } from "lucide-react";
import { Link } from "react-router-dom";

export function Header() {
  return (
    <header className="fixed top-0 left-0 right-0 h-16 bg-white border-b border-border z-40 px-4 flex items-center justify-between">
      <div className="flex items-center">
        {/* DBS Logo */}
        <Link to="/" className="mr-8">
          <div className="font-bold text-dbs-blue text-xl flex items-center">
            <span className="inline-block mr-1 font-bold">DBS</span>
            <span className="text-dbs-red font-light">Finance</span>
          </div>
        </Link>
      </div>
      
      <div className="flex items-center gap-2">
        <button className="p-2 rounded-full hover:bg-secondary">
          <Bell size={20} className="text-gray-600" />
        </button>
        <Link to="/profile">
          <div className="flex items-center gap-2 p-2 rounded-full hover:bg-secondary">
            <User size={20} className="text-gray-600" />
            <span className="hidden md:inline-block text-sm font-medium">Yazid Wiliadi</span>
          </div>
        </Link>
      </div>
    </header>
  );
}

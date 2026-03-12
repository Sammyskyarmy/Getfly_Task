import React from 'react';
import { useAuth } from '../../hooks/useAuth';
import { LogOut, HardHat } from 'lucide-react';

export const Navbar = () => {
  const { logout } = useAuth();

  return (
    <nav className="bg-white border-b border-slate-200 sticky top-0 z-30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-[72px]">
          <div className="flex items-center gap-3">
            <HardHat className="h-8 w-8 text-[#007b83]" />
            <div className="flex flex-col justify-center">
              <span className="text-[22px] font-bold text-slate-800 leading-none tracking-tight">
                FieldPro
              </span>
              <span className="text-[11px] text-slate-500 mt-0.5 font-medium tracking-wide">
                Construction Management
              </span>
            </div>
          </div>
          <div className="flex items-center gap-6">
            <span className="text-[13px] font-medium text-slate-500 hidden sm:block">test@test.com</span>
            <button
              onClick={logout}
              className="group inline-flex items-center text-[13px] font-bold text-slate-600 hover:text-slate-900 focus:outline-none transition-colors hover:cursor-pointer"
            >
              <LogOut className="h-4 w-4 mr-1.5 text-slate-400 group-hover:text-slate-800 transition-colors" />
              <span>Logout</span>
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
};

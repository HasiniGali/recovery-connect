import React from 'react';
import { NavLink, Link } from 'react-router-dom';
import { Logo } from '../common/Logo';
import {
  LayoutDashboard,
  FolderKanban,
  FileCheck2,
  Flag,
  BarChart3,
  ArrowLeft,
  Sparkles,
  ShieldAlert
} from 'lucide-react';

export const AdminSidebar: React.FC = () => {
  const links = [
    { to: '/admin', label: 'Overview', icon: LayoutDashboard, end: true },
    { to: '/admin/resources', label: 'Resource Directory', icon: FolderKanban },
    { to: '/admin/verification', label: 'Verification Pipeline', icon: FileCheck2 },
    { to: '/admin/reports', label: 'Community Reports', icon: Flag },
    { to: '/admin/analytics', label: 'Quality Analytics', icon: BarChart3 }
  ];

  return (
    <aside className="w-64 bg-[#FFF9F3] border-r border-[#EADBCE] min-h-screen p-5 flex flex-col justify-between shrink-0">
      <div className="space-y-6">
        {/* Admin Brand Badge */}
        <div>
          <Logo size="sm" showTagline={false} />
          <div className="mt-2 inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-[#E7DFF3] text-[#4D396E] border border-[#D4C3EC] tracking-wider uppercase">
            <Sparkles className="w-2.5 h-2.5" />
            <span>Admin Portal · Demo Data</span>
          </div>
        </div>

        {/* Navigation Menu */}
        <nav className="space-y-1">
          {links.map(link => {
            const Icon = link.icon;
            return (
              <NavLink
                key={link.to}
                to={link.to}
                end={link.end}
                className={({ isActive }) =>
                  `flex items-center gap-3 px-3.5 py-2.5 rounded-2xl text-xs font-semibold transition-all ${
                    isActive
                      ? 'bg-[#34343B] text-white shadow-xs'
                      : 'text-[#6F6D76] hover:text-[#34343B] hover:bg-white/80'
                  }`
                }
              >
                <Icon className="w-4 h-4 shrink-0" />
                <span>{link.label}</span>
              </NavLink>
            );
          })}
        </nav>
      </div>

      {/* Footer Return Link */}
      <div className="pt-6 border-t border-[#EADBCE] space-y-2">
        <Link
          to="/"
          className="flex items-center gap-2 px-3 py-2 rounded-xl text-xs text-[#6F6D76] hover:text-[#34343B] hover:bg-white/80 transition-all font-medium"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Exit to Public Portal</span>
        </Link>
        <p className="text-[10px] text-[#6F6D76] px-3">
          ByteQuest Hackathon · Tech for Recovery
        </p>
      </div>
    </aside>
  );
};

import React from 'react';
import { Outlet } from 'react-router-dom';
import { AdminSidebar } from '../components/admin/AdminSidebar';

export const AdminLayout: React.FC = () => {
  return (
    <div className="min-h-screen flex flex-col md:flex-row bg-[#FFF9F3] text-[#34343B]">
      <AdminSidebar />
      <main className="flex-1 p-6 sm:p-8 lg:p-10 max-w-7xl overflow-x-hidden">
        <Outlet />
      </main>
    </div>
  );
};

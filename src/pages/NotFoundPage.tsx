import React from 'react';
import { Link } from 'react-router-dom';
import { Compass, Home } from 'lucide-react';

export const NotFoundPage: React.FC = () => {
  return (
    <div className="min-h-[70vh] flex flex-col items-center justify-center text-center px-4 space-y-5">
      <div className="w-16 h-16 rounded-full bg-[#E7DFF3] text-[#4D396E] flex items-center justify-center text-2xl font-serif font-bold border border-[#D4C3EC]">
        404
      </div>
      <h1 className="font-serif text-3xl font-bold text-[#34343B]">
        Page Not Found
      </h1>
      <p className="text-xs sm:text-sm text-[#6F6D76] max-w-sm">
        The path you requested does not exist or may have been relocated.
      </p>
      <div className="flex items-center gap-3 pt-2">
        <Link
          to="/"
          className="inline-flex items-center gap-1.5 px-5 py-2.5 rounded-full bg-[#34343B] text-white text-xs font-semibold hover:bg-black"
        >
          <Home className="w-3.5 h-3.5" />
          <span>Home</span>
        </Link>
        <Link
          to="/discover"
          className="inline-flex items-center gap-1.5 px-5 py-2.5 rounded-full bg-white border border-[#EADBCE] text-[#34343B] text-xs font-semibold hover:bg-[#FFF9F3]"
        >
          <Compass className="w-3.5 h-3.5 text-[#4D396E]" />
          <span>Discover Support</span>
        </Link>
      </div>
    </div>
  );
};

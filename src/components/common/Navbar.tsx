import React, { useState } from 'react';
import { NavLink, Link, useLocation } from 'react-router-dom';
import { Logo } from './Logo';
import { LanguageSwitcher } from './LanguageSwitcher';
import { AccessibilityControls } from './AccessibilityControls';
import { useSaved } from '../../context/SavedContext';
import { useLanguage } from '../../context/LanguageContext';
import {
  Compass,
  MapPin,
  Bookmark,
  ShieldAlert,
  Info,
  Sliders,
  Menu,
  X,
  ExternalLink
} from 'lucide-react';

export const Navbar: React.FC = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { count: savedCount } = useSaved();
  const { t } = useLanguage();
  const location = useLocation();

  const navLinks = [
    { to: '/discover', label: t('nav.discover'), icon: Compass },
    { to: '/map', label: t('nav.map'), icon: MapPin },
    {
      to: '/saved',
      label: t('nav.saved'),
      icon: Bookmark,
      badge: savedCount > 0 ? savedCount : null
    },
    { to: '/about', label: t('nav.about'), icon: Info },
    { to: '/admin', label: t('nav.admin'), icon: Sliders }
  ];

  const closeMenu = () => setMobileMenuOpen(false);

  return (
    <header className="sticky top-0 z-40 bg-[#FFF9F3]/90 backdrop-blur-md border-b border-[#EADBCE] transition-all">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Brand Logo */}
          <div className="shrink-0">
            <Logo size="md" />
          </div>

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center gap-1 xl:gap-2">
            {navLinks.map(link => {
              const Icon = link.icon;
              const isActive = location.pathname === link.to;
              return (
                <NavLink
                  key={link.to}
                  to={link.to}
                  className={`inline-flex items-center gap-2 px-3.5 py-2 rounded-full text-xs font-medium transition-all ${
                    isActive
                      ? 'bg-[#E7DFF3]/80 text-[#34343B] font-semibold shadow-xs'
                      : 'text-[#6F6D76] hover:text-[#34343B] hover:bg-black/5'
                  }`}
                >
                  <Icon className={`w-3.5 h-3.5 ${isActive ? 'text-[#4D396E]' : 'text-[#6F6D76]'}`} />
                  <span>{link.label}</span>
                  {link.badge !== null && (
                    <span className="ml-1 inline-flex items-center justify-center px-1.5 py-0.2 text-[10px] font-bold rounded-full bg-[#E7DFF3] text-[#4D396E] border border-[#C9BCE2]">
                      {link.badge}
                    </span>
                  )}
                </NavLink>
              );
            })}
          </nav>

          {/* Right Action Bar: Emergency CTA, Language, Accessibility */}
          <div className="hidden sm:flex items-center gap-2.5">
            {/* Direct Emergency CTA */}
            <Link
              to="/emergency"
              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full text-xs font-semibold bg-[#F6E2D2] text-[#8C4A1E] border border-[#E8C4AB] hover:bg-[#F3D5C0] shadow-xs transition-all hover:scale-[1.02] active:scale-[0.98]"
            >
              <ShieldAlert className="w-3.5 h-3.5 text-[#B54A23]" />
              <span>{t('hero.cta.emergency')}</span>
            </Link>

            {/* Language Switcher */}
            <LanguageSwitcher />

            {/* Accessibility Settings */}
            <AccessibilityControls />
          </div>

          {/* Mobile menu button */}
          <div className="flex sm:hidden items-center gap-2">
            <Link
              to="/emergency"
              className="p-2 rounded-full bg-[#F6E2D2] text-[#8C4A1E] border border-[#E8C4AB]"
              title="Need immediate help?"
              aria-label="Emergency help"
            >
              <ShieldAlert className="w-4 h-4 text-[#B54A23]" />
            </Link>
            <button
              type="button"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-full text-[#34343B] hover:bg-black/5 focus:outline-hidden"
              aria-label="Toggle navigation menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu dropdown */}
      {mobileMenuOpen && (
        <div className="sm:hidden bg-[#FFF9F3] border-b border-[#EADBCE] px-4 pt-3 pb-6 shadow-xl space-y-4 animate-in slide-in-from-top-4 duration-200">
          <div className="flex items-center justify-between pb-2 border-b border-[#EADBCE]">
            <LanguageSwitcher />
            <AccessibilityControls />
          </div>

          <div className="space-y-1">
            {navLinks.map(link => {
              const Icon = link.icon;
              const isActive = location.pathname === link.to;
              return (
                <Link
                  key={link.to}
                  to={link.to}
                  onClick={closeMenu}
                  className={`flex items-center justify-between px-3 py-2.5 rounded-xl text-sm font-medium ${
                    isActive ? 'bg-[#E7DFF3] text-[#34343B] font-semibold' : 'text-[#6F6D76] hover:bg-black/5'
                  }`}
                >
                  <div className="flex items-center gap-2.5">
                    <Icon className="w-4 h-4 text-[#4D396E]" />
                    <span>{link.label}</span>
                  </div>
                  {link.badge !== null && (
                    <span className="px-2 py-0.5 text-xs font-bold rounded-full bg-[#E7DFF3] text-[#4D396E]">
                      {link.badge}
                    </span>
                  )}
                </Link>
              );
            })}
          </div>

          <div className="pt-2">
            <Link
              to="/emergency"
              onClick={closeMenu}
              className="w-full flex items-center justify-center gap-2 py-2.5 rounded-2xl bg-[#F6E2D2] text-[#8C4A1E] font-semibold text-sm border border-[#E8C4AB]"
            >
              <ShieldAlert className="w-4 h-4 text-[#B54A23]" />
              <span>{t('hero.cta.emergency')}</span>
            </Link>
          </div>
        </div>
      )}
    </header>
  );
};

import React, { useState, useRef, useEffect } from 'react';
import { useAccessibility } from '../../context/AccessibilityContext';
import { Sliders, Eye, ZapOff, RotateCcw, X, Type } from 'lucide-react';

export const AccessibilityControls: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const {
    textSize,
    setTextSize,
    highContrast,
    setHighContrast,
    reducedMotion,
    setReducedMotion,
    resetAccessibility
  } = useAccessibility();

  const popoverRef = useRef<HTMLDivElement>(null);

  // Close on outside click
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (popoverRef.current && !popoverRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }
    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [isOpen]);

  return (
    <div className="relative" ref={popoverRef}>
      {/* Floating / Toolbar Trigger Button */}
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium rounded-full bg-white/90 hover:bg-white text-[#34343B] border border-[#EADBCE] shadow-xs hover:shadow-sm transition-all focus:outline-hidden focus:ring-2 focus:ring-[#DDECF4]"
        aria-label="Accessibility options"
        aria-expanded={isOpen}
      >
        <span className="font-serif font-bold text-sm leading-none">Aa</span>
        <span className="hidden md:inline">Accessibility</span>
      </button>

      {/* Popover Panel */}
      {isOpen && (
        <div
          className="absolute right-0 mt-2 w-72 p-4 bg-[#FFF9F3] border border-[#EADBCE] rounded-2xl shadow-xl z-50 animate-in fade-in slide-in-from-top-2 duration-200"
          role="dialog"
          aria-label="Accessibility settings"
        >
          <div className="flex items-center justify-between pb-2 border-b border-[#EADBCE]">
            <div className="flex items-center gap-1.5 font-medium text-xs text-[#34343B]">
              <Sliders className="w-3.5 h-3.5 text-[#6F6D76]" />
              <span>Accessibility Preferences</span>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="p-1 text-[#6F6D76] hover:text-[#34343B] rounded-lg hover:bg-black/5"
              aria-label="Close panel"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          </div>

          {/* Text Size Scale */}
          <div className="mt-3">
            <label className="text-xs font-medium text-[#6F6D76] flex items-center gap-1 mb-1.5">
              <Type className="w-3 h-3" /> Text Size
            </label>
            <div className="grid grid-cols-3 gap-1.5">
              <button
                type="button"
                onClick={() => setTextSize('normal')}
                className={`py-1.5 text-xs rounded-xl border transition-all ${
                  textSize === 'normal'
                    ? 'bg-[#DDECF4] border-[#BBD7E6] text-[#25526C] font-semibold'
                    : 'bg-white border-[#EADBCE] text-[#6F6D76] hover:bg-[#FFF9F3]'
                }`}
              >
                Default
              </button>
              <button
                type="button"
                onClick={() => setTextSize('large')}
                className={`py-1.5 text-xs rounded-xl border transition-all ${
                  textSize === 'large'
                    ? 'bg-[#E7DFF3] border-[#C9BCE2] text-[#4D396E] font-semibold'
                    : 'bg-white border-[#EADBCE] text-[#6F6D76] hover:bg-[#FFF9F3]'
                }`}
              >
                Large (18px)
              </button>
              <button
                type="button"
                onClick={() => setTextSize('xlarge')}
                className={`py-1.5 text-xs rounded-xl border transition-all ${
                  textSize === 'xlarge'
                    ? 'bg-[#F4DDE2] border-[#E2BDC5] text-[#8E283E] font-semibold'
                    : 'bg-white border-[#EADBCE] text-[#6F6D76] hover:bg-[#FFF9F3]'
                }`}
              >
                Extra (20px)
              </button>
            </div>
          </div>

          {/* High Contrast Toggle */}
          <div className="mt-3.5 flex items-center justify-between py-1">
            <div className="flex items-center gap-2">
              <Eye className="w-3.5 h-3.5 text-[#6F6D76]" />
              <span className="text-xs font-medium text-[#34343B]">High Contrast</span>
            </div>
            <button
              type="button"
              role="switch"
              aria-checked={highContrast}
              onClick={() => setHighContrast(!highContrast)}
              className={`w-9 h-5 flex items-center rounded-full p-0.5 transition-colors ${
                highContrast ? 'bg-[#34343B]' : 'bg-gray-200'
              }`}
            >
              <span
                className={`w-4 h-4 bg-white rounded-full transition-transform ${
                  highContrast ? 'translate-x-4' : 'translate-x-0'
                }`}
              />
            </button>
          </div>

          {/* Reduced Motion Toggle */}
          <div className="mt-2.5 flex items-center justify-between py-1">
            <div className="flex items-center gap-2">
              <ZapOff className="w-3.5 h-3.5 text-[#6F6D76]" />
              <span className="text-xs font-medium text-[#34343B]">Reduced Motion</span>
            </div>
            <button
              type="button"
              role="switch"
              aria-checked={reducedMotion}
              onClick={() => setReducedMotion(!reducedMotion)}
              className={`w-9 h-5 flex items-center rounded-full p-0.5 transition-colors ${
                reducedMotion ? 'bg-[#34343B]' : 'bg-gray-200'
              }`}
            >
              <span
                className={`w-4 h-4 bg-white rounded-full transition-transform ${
                  reducedMotion ? 'translate-x-4' : 'translate-x-0'
                }`}
              />
            </button>
          </div>

          {/* Reset Action */}
          <div className="mt-4 pt-2 border-t border-[#EADBCE] flex justify-end">
            <button
              type="button"
              onClick={resetAccessibility}
              className="inline-flex items-center gap-1 text-[11px] text-[#6F6D76] hover:text-[#34343B] font-medium"
            >
              <RotateCcw className="w-3 h-3" />
              <span>Reset settings</span>
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

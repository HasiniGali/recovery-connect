import React from 'react';
import { Link } from 'react-router-dom';
import { Logo } from './Logo';
import { ShieldCheck, HeartHandshake, PhoneCall, Sparkles } from 'lucide-react';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-[#FFF9F3] border-t border-[#EADBCE] mt-20 pt-14 pb-12 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10 pb-12 border-b border-[#EADBCE]">
          {/* Col 1: Brand & Tagline */}
          <div className="md:col-span-2 space-y-4">
            <Logo size="md" showTagline={false} />
            <p className="font-serif italic text-base text-[#34343B]">
              “Finding the right support, when you need it.”
            </p>
            <p className="text-xs text-[#6F6D76] leading-relaxed max-w-md">
              A privacy-first Recovery Resource Navigator engineered for the ByteQuest Hackathon — Track A: Tech for Recovery. Empowering students and local communities to discover verified counselling, recovery, helplines, and campus support.
            </p>
            <div className="flex items-center gap-2 pt-2">
              <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[11px] font-medium bg-[#DCE8DC] text-[#2D5A27] border border-[#BCD4BC]">
                <ShieldCheck className="w-3 h-3" />
                Privacy-First Architecture
              </span>
              <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[11px] font-medium bg-[#E7DFF3] text-[#4D396E] border border-[#D4C3EC]">
                <Sparkles className="w-3 h-3" />
                Hackathon Prototype
              </span>
            </div>
          </div>

          {/* Col 2: Fast Navigation */}
          <div>
            <h4 className="text-xs font-semibold text-[#34343B] uppercase tracking-wider mb-3">
              Explore Navigator
            </h4>
            <ul className="space-y-2 text-xs text-[#6F6D76]">
              <li>
                <Link to="/discover" className="hover:text-[#34343B] transition-colors">
                  Find Support & Search
                </Link>
              </li>
              <li>
                <Link to="/map" className="hover:text-[#34343B] transition-colors">
                  Interactive Pastel Map
                </Link>
              </li>
              <li>
                <Link to="/saved" className="hover:text-[#34343B] transition-colors">
                  Saved Bookmarks
                </Link>
              </li>
              <li>
                <Link to="/emergency" className="hover:text-[#8C4A1E] font-medium transition-colors">
                  Emergency Helplines (24/7)
                </Link>
              </li>
              <li>
                <Link to="/about" className="hover:text-[#34343B] transition-colors">
                  Ethical Boundaries & Privacy
                </Link>
              </li>
              <li>
                <Link to="/admin" className="hover:text-[#34343B] transition-colors">
                  Admin Verification Portal
                </Link>
              </li>
            </ul>
          </div>

          {/* Col 3: Critical Direct Contacts */}
          <div>
            <h4 className="text-xs font-semibold text-[#34343B] uppercase tracking-wider mb-3">
              Verified Immediate Help
            </h4>
            <ul className="space-y-2.5 text-xs text-[#6F6D76]">
              <li className="flex items-start gap-2">
                <PhoneCall className="w-3.5 h-3.5 text-[#B54A23] shrink-0 mt-0.5" />
                <div>
                  <a href="tel:14416" className="font-semibold text-[#34343B] hover:underline">
                    14416 (Tele-MANAS)
                  </a>
                  <p className="text-[11px] text-[#6F6D76]">24/7 Free National Tele-Mental Health</p>
                </div>
              </li>
              <li className="flex items-start gap-2">
                <PhoneCall className="w-3.5 h-3.5 text-[#B54A23] shrink-0 mt-0.5" />
                <div>
                  <a href="tel:108" className="font-semibold text-[#34343B] hover:underline">
                    108 (Tamil Nadu Emergency)
                  </a>
                  <p className="text-[11px] text-[#6F6D76]">Ambulance & Critical Medical Dispatch</p>
                </div>
              </li>
              <li className="flex items-start gap-2">
                <HeartHandshake className="w-3.5 h-3.5 text-[#4D396E] shrink-0 mt-0.5" />
                <div>
                  <a href="tel:9999666555" className="font-semibold text-[#34343B] hover:underline">
                    +91 9999 666 555
                  </a>
                  <p className="text-[11px] text-[#6F6D76]">Vandrevala Crisis Intervention Helpline</p>
                </div>
              </li>
            </ul>
          </div>
        </div>

        {/* Ethical Boundaries & Legal Notice */}
        <div className="pt-8 space-y-3">
          <div className="p-4 bg-white/70 border border-[#EADBCE] rounded-2xl text-[11.5px] text-[#6F6D76] leading-relaxed">
            <p className="font-semibold text-[#34343B] mb-1">
              Ethical & Clinical Boundaries Notice:
            </p>
            <p>
              Recovery Connect is strictly an informational directory and resource navigation platform. It does <strong>not</strong> provide medical or clinical diagnoses, treatment recommendations, or therapy. The natural-language search performs only preference and criteria extraction, not diagnostic classification. If you or someone you know is experiencing acute physical or psychological danger, please immediately contact your local emergency response service (such as 108 in India) or proceed to the nearest emergency department.
            </p>
            <p className="mt-1 text-[11px] text-[#8C4A1E]">
              Notice on Prototype Data: Resources marked with the “SYNTHETIC DEMO” badge are synthetic mock records created for competition demonstration and are not intended for real-world clinical referral. Official crisis helplines are verified against public records.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-[#6F6D76] pt-2">
            <p>© 2026 Recovery Connect · ByteQuest Hackathon Project</p>
            <p className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-[#4B8344]"></span>
              <span>All Systems Operational (Mock API Engine)</span>
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

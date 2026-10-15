import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useLanguage } from '../context/LanguageContext';
import {
  Heart,
  Activity,
  ShieldAlert,
  Users,
  GraduationCap,
  Sparkles,
  ArrowRight,
  ShieldCheck,
  Compass,
  CheckCircle2,
  Lock,
  PhoneCall,
  Search
} from 'lucide-react';
import { motion } from 'framer-motion';

import { GlassCard } from '../components/common/GlassCard';

export const LandingPage: React.FC = () => {
  const { t } = useLanguage();
  const navigate = useNavigate();

  const categories = [
    {
      id: 'counselling',
      name: t('categories.counselling'),
      desc: 'Confidential one-on-one psychological first-aid, stress counseling, and emotional therapy.',
      bg: 'bg-[#DDECF4]',
      border: 'border-[#BBD7E6]',
      text: 'text-[#25526C]',
      tint: 'blue' as const,
      icon: Heart
    },
    {
      id: 'recovery',
      name: t('categories.recovery'),
      desc: 'Peer-guided sobriety circles, behavioral habit reset, and compassionate rehabilitation.',
      bg: 'bg-[#E7DFF3]',
      border: 'border-[#D4C3EC]',
      text: 'text-[#4D396E]',
      tint: 'lavender' as const,
      icon: Activity
    },
    {
      id: 'crisis',
      name: t('categories.crisis'),
      desc: '24/7 urgent active listening, de-escalation hotlines, and distress alleviation lines.',
      bg: 'bg-[#F6E2D2]',
      border: 'border-[#E8C4AB]',
      text: 'text-[#8C4A1E]',
      tint: 'peach' as const,
      icon: ShieldAlert
    },
    {
      id: 'support_group',
      name: t('categories.support_group'),
      desc: 'Facilitated sharing circles for anxiety, neurodivergence, grief, and mutual encouragement.',
      bg: 'bg-[#F4DDE2]',
      border: 'border-[#E2BDC5]',
      text: 'text-[#8E283E]',
      tint: 'blush' as const,
      icon: Users
    },
    {
      id: 'campus',
      name: t('categories.campus'),
      desc: 'Student-friendly guidance posts, hostel listening tables, and academic stress support.',
      bg: 'bg-[#DCE8DC]',
      border: 'border-[#BCD4BC]',
      text: 'text-[#2D5A27]',
      tint: 'sage' as const,
      icon: GraduationCap
    },
    {
      id: 'medical',
      name: t('categories.medical'),
      desc: 'Specialist hospital outpatient psychiatric clinics and subsidized medical evaluations.',
      bg: 'bg-[#DDECF4]',
      border: 'border-[#BBD7E6]',
      text: 'text-[#25526C]',
      tint: 'blue' as const,
      icon: Activity
    }
  ];

  const handleCategoryClick = (catId: string) => {
    navigate(`/discover?category=${catId}`);
  };

  return (
    <div className="space-y-20 sm:space-y-28 pb-12">
      {/* Hero Section */}
      <section className="relative pt-8 sm:pt-14 overflow-hidden">
        {/* Soft Organic Ambient Background Shapes */}
        <div className="absolute top-12 left-1/2 -translate-x-1/2 w-full max-w-7xl h-96 pointer-events-none -z-10 opacity-70">
          <div className="absolute top-0 right-10 w-80 h-80 rounded-full bg-[#E7DFF3]/60 blur-3xl" />
          <div className="absolute bottom-0 left-10 w-96 h-96 rounded-full bg-[#DDECF4]/60 blur-3xl" />
          <div className="absolute top-1/2 left-1/3 w-72 h-72 rounded-full bg-[#F4DDE2]/50 blur-3xl" />
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            {/* Left Hero Content */}
            <div className="lg:col-span-7 space-y-6">
              {/* Brand Tag Pill */}
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/90 border border-[#EADBCE] text-xs font-semibold text-[#34343B] shadow-2xs">
                <span className="w-2 h-2 rounded-full bg-[#4B8344]" />
                <span className="tracking-wider">BYTEQUEST HACKATHON · TECH FOR RECOVERY</span>
              </div>

              {/* Editorial Title */}
              <div className="space-y-2">
                <span className="text-xs sm:text-sm font-bold tracking-widest text-[#6F6D76] uppercase font-sans block">
                  RECOVERY CONNECT
                </span>
                <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl font-bold text-[#34343B] leading-[1.12] tracking-tight">
                  Finding the right support, <br />
                  <span className="italic font-normal text-[#4D396E]">when you need it.</span>
                </h1>
              </div>

              {/* Supporting Text */}
              <p className="text-base sm:text-lg text-[#6F6D76] leading-relaxed max-w-xl font-normal">
                {t('hero.sub')}
              </p>

              {/* Action Buttons */}
              <div className="pt-2 flex flex-wrap items-center gap-3">
                <Link
                  to="/discover"
                  className="inline-flex items-center gap-2 px-6 py-3.5 rounded-full bg-[#34343B] hover:bg-black text-white font-semibold text-sm shadow-md hover:shadow-lg transition-all hover:scale-102 active:scale-98"
                >
                  <Search className="w-4 h-4" />
                  <span>{t('hero.cta.find')}</span>
                  <ArrowRight className="w-4 h-4 ml-1" />
                </Link>

                <Link
                  to="/discover"
                  className="inline-flex items-center gap-2 px-6 py-3.5 rounded-full bg-white hover:bg-[#FFF9F3] text-[#34343B] border border-[#EADBCE] font-semibold text-sm shadow-xs transition-all hover:scale-102"
                >
                  <Compass className="w-4 h-4 text-[#4D396E]" />
                  <span>{t('hero.cta.explore')}</span>
                </Link>

                <Link
                  to="/emergency"
                  className="inline-flex items-center gap-2 px-5 py-3 rounded-full bg-[#F6E2D2] hover:bg-[#F3D5C0] text-[#8C4A1E] border border-[#E8C4AB] font-semibold text-xs transition-all"
                >
                  <PhoneCall className="w-3.5 h-3.5 text-[#B54A23]" />
                  <span>{t('hero.cta.emergency')}</span>
                </Link>
              </div>

              {/* Safety & Ethics Disclaimer Pill */}
              <div className="pt-3 flex items-center gap-2 text-xs text-[#6F6D76]">
                <ShieldCheck className="w-4 h-4 text-[#4B8344] shrink-0" />
                <span>
                  Privacy-first resource navigator · 100% Non-diagnostic · No personal data stored.
                </span>
              </div>
            </div>

            {/* Right Hero: Whimsical Interconnected Paths Abstract Illustration */}
            <div className="lg:col-span-5 relative flex items-center justify-center">
              <div className="relative w-full max-w-md aspect-square rounded-3xl bg-white/70 backdrop-blur-xs border border-[#EADBCE] p-8 shadow-lg flex items-center justify-center overflow-hidden">
                <svg viewBox="0 0 400 400" className="w-full h-full drop-shadow-sm">
                  {/* Organic Background Clouds/Blobs */}
                  <path
                    d="M 60 140 C 40 80, 160 30, 240 70 C 320 110, 360 220, 310 290 C 260 360, 120 370, 70 300 C 20 230, 80 200, 60 140 Z"
                    fill="#FFF9F3"
                    stroke="#EADBCE"
                    strokeWidth="2"
                  />

                  {/* Flowing Interconnected Paths */}
                  <motion.path
                    d="M 70 280 Q 150 140, 220 230 T 330 160"
                    fill="none"
                    stroke="#DDECF4"
                    strokeWidth="7"
                    strokeLinecap="round"
                  />
                  <motion.path
                    d="M 110 320 Q 200 290, 250 170 T 310 110"
                    fill="none"
                    stroke="#E7DFF3"
                    strokeWidth="6"
                    strokeLinecap="round"
                  />
                  <motion.path
                    d="M 90 120 Q 180 180, 260 260"
                    fill="none"
                    stroke="#F4DDE2"
                    strokeWidth="5"
                    strokeLinecap="round"
                  />

                  {/* Botanical Decorative Leaves */}
                  <path
                    d="M 220 120 C 200 90, 235 80, 245 100 C 255 120, 235 130, 220 120 Z"
                    fill="#DCE8DC"
                    stroke="#34343B"
                    strokeWidth="1.5"
                  />
                  <path
                    d="M 140 240 C 120 220, 150 205, 160 225 C 165 240, 150 250, 140 240 Z"
                    fill="#F6E2D2"
                    stroke="#34343B"
                    strokeWidth="1.5"
                  />

                  {/* Support Resource Nodes */}
                  {/* Node 1: Resource (Pastel Blue) */}
                  <circle cx="70" cy="280" r="18" fill="#DDECF4" stroke="#34343B" strokeWidth="2.5" />
                  <circle cx="70" cy="280" r="5" fill="#34343B" />

                  {/* Node 2: Connection (Pastel Lavender) */}
                  <circle cx="220" cy="230" r="22" fill="#E7DFF3" stroke="#34343B" strokeWidth="2.5" />
                  <circle cx="220" cy="230" r="7" fill="#4D396E" />

                  {/* Node 3: Support (Blush) */}
                  <circle cx="330" cy="160" r="20" fill="#F4DDE2" stroke="#34343B" strokeWidth="2.5" />
                  <circle cx="330" cy="160" r="6" fill="#8E283E" />

                  {/* Node 4: Community (Sage) */}
                  <circle cx="120" cy="120" r="16" fill="#DCE8DC" stroke="#34343B" strokeWidth="2.5" />
                  <circle cx="120" cy="120" r="4.5" fill="#2D5A27" />

                  {/* Gentle Floating Location Pins */}
                  <g transform="translate(240, 60)">
                    <path
                      d="M 12 0 C 5.4 0, 0 5.4, 0 12 C 0 21, 12 30, 12 30 C 12 30, 24 21, 24 12 C 24 5.4, 18.6 0, 12 0 Z"
                      fill="#F6E2D2"
                      stroke="#8C4A1E"
                      strokeWidth="1.8"
                    />
                    <circle cx="12" cy="12" r="4" fill="#8C4A1E" />
                  </g>

                  {/* Sparkling Motifs used sparingly */}
                  <path d="M 310 70 Q 315 75, 320 75 Q 315 75, 310 80 Q 310 75, 305 75 Q 310 75, 310 70 Z" fill="#34343B" />
                  <path d="M 80 200 Q 84 204, 88 204 Q 84 204, 80 208 Q 80 204, 76 204 Q 80 204, 80 200 Z" fill="#4D396E" />
                </svg>

                {/* Floating Floating Stat Pill */}
                <div className="absolute -bottom-3 -right-2 bg-white/95 border border-[#EADBCE] rounded-2xl p-3 shadow-md flex items-center gap-2.5">
                  <div className="w-8 h-8 rounded-full bg-[#DCE8DC] flex items-center justify-center text-[#2D5A27]">
                    <CheckCircle2 className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="text-[10px] font-bold text-[#6F6D76] uppercase tracking-wider block">
                      VERIFICATION LAYER
                    </span>
                    <span className="text-xs font-bold text-[#34343B]">
                      Verified Sources & Audit History
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Section 2: Narrative Story Progression ("Support should be easier to find.") */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center space-y-3 max-w-2xl mx-auto mb-10">
          <span className="text-xs font-bold tracking-widest text-[#6F6D76] uppercase font-sans">
            Our Purpose & Context
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-[#34343B]">
            Support should be easier to find.
          </h2>
          <p className="text-xs sm:text-sm text-[#6F6D76] max-w-xl mx-auto leading-relaxed">
            Finding emotional, psychological, or recovery guidance when overwhelmed shouldn't feel like navigating a maze of dead ends.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
          {/* Step 1: Support exists */}
          <GlassCard tint="blue" className="p-8 space-y-4 relative overflow-hidden">
            <div className="w-12 h-12 rounded-2xl bg-white/80 border border-[#BBD7E6] flex items-center justify-center text-[#25526C] shadow-2xs">
              <Heart className="w-6 h-6" />
            </div>
            <div className="space-y-2">
              <span className="text-[11px] font-bold text-[#25526C] uppercase tracking-wider block">
                01 · Reality
              </span>
              <h3 className="font-serif text-2xl font-bold text-[#34343B]">
                Support exists.
              </h3>
              <p className="text-xs sm:text-sm text-[#6F6D76] leading-relaxed">
                Across universities, district hospitals, confidential helplines, and peer circles, experienced caregivers and compassionate mentors are ready to assist.
              </p>
            </div>
          </GlassCard>

          {/* Step 2: But finding it can be difficult */}
          <GlassCard tint="peach" className="p-8 space-y-4 relative overflow-hidden">
            <div className="w-12 h-12 rounded-2xl bg-white/80 border border-[#E8C4AB] flex items-center justify-center text-[#8C4A1E] shadow-2xs">
              <ShieldAlert className="w-6 h-6" />
            </div>
            <div className="space-y-2">
              <span className="text-[11px] font-bold text-[#8C4A1E] uppercase tracking-wider block">
                02 · The Challenge
              </span>
              <h3 className="font-serif text-2xl font-bold text-[#34343B]">
                But finding it can be difficult.
              </h3>
              <p className="text-xs sm:text-sm text-[#6F6D76] leading-relaxed">
                Information is scattered across outdated notices, broken phone numbers, unverified listings, unclear costs, and language disconnects.
              </p>
            </div>
          </GlassCard>

          {/* Step 3: Recovery Connect connects people to verified support */}
          <GlassCard tint="lavender" className="p-8 space-y-4 relative overflow-hidden">
            <div className="w-12 h-12 rounded-2xl bg-white/80 border border-[#D4C3EC] flex items-center justify-center text-[#4D396E] shadow-2xs">
              <Sparkles className="w-6 h-6" />
            </div>
            <div className="space-y-2">
              <span className="text-[11px] font-bold text-[#4D396E] uppercase tracking-wider block">
                03 · The Bridge
              </span>
              <h3 className="font-serif text-2xl font-bold text-[#34343B]">
                Recovery Connect connects people to verified support.
              </h3>
              <p className="text-xs sm:text-sm text-[#6F6D76] leading-relaxed">
                We combine natural-language preference matching, auditable verification badges, transparent criteria, and community reporting into one tranquil, trustworthy space.
              </p>
            </div>
          </GlassCard>
        </div>
      </section>

      {/* Section 3: Six Category Cards ("Find support that fits") */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center space-y-3 max-w-2xl mx-auto mb-10">
          <span className="text-xs font-bold tracking-widest text-[#6F6D76] uppercase font-sans">
            Tailored Resource Discovery
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl font-bold text-[#34343B]">
            {t('categories.title')}
          </h2>
          <p className="text-xs sm:text-sm text-[#6F6D76]">
            Every journey looks different. Select a support discipline to browse verified resources, hours, and eligibility.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {categories.map(cat => {
            const Icon = cat.icon;
            return (
              <motion.div
                key={cat.id}
                whileHover={{ y: -4 }}
                transition={{ duration: 0.2 }}
                onClick={() => handleCategoryClick(cat.id)}
                className="h-full"
              >
                <GlassCard
                  tint={cat.tint}
                  interactive={true}
                  className="p-6 h-full flex flex-col justify-between"
                >
                  <div>
                    <div className="flex items-center justify-between mb-4">
                      <div className={`p-3 rounded-2xl ${cat.bg} ${cat.border} border ${cat.text}`}>
                        <Icon className="w-5 h-5" />
                      </div>
                      <span className="text-xs font-semibold text-[#6F6D76] group-hover:text-[#34343B] flex items-center gap-1">
                        Browse <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" />
                      </span>
                    </div>

                    <h3 className="font-serif text-xl font-bold text-[#34343B] mb-2 hover:text-[#4D396E] transition-colors">
                      {cat.name}
                    </h3>

                    <p className="text-xs text-[#6F6D76] leading-relaxed">
                      {cat.desc}
                    </p>
                  </div>

                  <div className="mt-4 pt-3 border-t border-[#EADBCE]/50 flex items-center gap-1.5 text-[11px] text-[#6F6D76]">
                    <Sparkles className="w-3 h-3 text-[#4D396E]" />
                    <span>Free & subsidized options available</span>
                  </div>
                </GlassCard>
              </motion.div>
            );
          })}
        </div>
      </section>

      {/* Section 3: Why Recovery Connect? (Verified, Personalized, Private) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="p-8 sm:p-12 rounded-3xl bg-gradient-to-b from-white/90 to-[#FFF9F3] border border-[#EADBCE] shadow-xs">
          <div className="text-center space-y-3 max-w-2xl mx-auto mb-10">
            <span className="text-xs font-bold tracking-widest text-[#6F6D76] uppercase font-sans">
              Our Core Principles
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl font-bold text-[#34343B]">
              {t('why.title')}
            </h2>
            <p className="text-xs sm:text-sm text-[#6F6D76]">
              Built with uncompromising respect for personal autonomy, verified truth, and peace of mind.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
            {/* Card 1: Verified */}
            <div className="p-6 rounded-3xl bg-[#DCE8DC]/40 border border-[#BCD4BC] space-y-3">
              <div className="w-10 h-10 rounded-2xl bg-[#DCE8DC] flex items-center justify-center text-[#2D5A27] border border-[#BCD4BC]">
                <ShieldCheck className="w-5 h-5" />
              </div>
              <h3 className="font-serif text-xl font-bold text-[#34343B]">
                {t('why.verified.title')}
              </h3>
              <p className="text-xs text-[#6F6D76] leading-relaxed">
                {t('why.verified.desc')} We inspect official hospital directories, university registers, and community charters so you never call a dead number.
              </p>
            </div>

            {/* Card 2: Personalized */}
            <div className="p-6 rounded-3xl bg-[#DDECF4]/40 border border-[#BBD7E6] space-y-3">
              <div className="w-10 h-10 rounded-2xl bg-[#DDECF4] flex items-center justify-center text-[#25526C] border border-[#BBD7E6]">
                <Sparkles className="w-5 h-5" />
              </div>
              <h3 className="font-serif text-xl font-bold text-[#34343B]">
                {t('why.personalized.title')}
              </h3>
              <p className="text-xs text-[#6F6D76] leading-relaxed">
                {t('why.personalized.desc')} Filter by free services, Tamil or English language proficiency, and walk-in availability.
              </p>
            </div>

            {/* Card 3: Private */}
            <div className="p-6 rounded-3xl bg-[#E7DFF3]/40 border border-[#D4C3EC] space-y-3">
              <div className="w-10 h-10 rounded-2xl bg-[#E7DFF3] flex items-center justify-center text-[#4D396E] border border-[#D4C3EC]">
                <Lock className="w-5 h-5" />
              </div>
              <h3 className="font-serif text-xl font-bold text-[#34343B]">
                {t('why.private.title')}
              </h3>
              <p className="text-xs text-[#6F6D76] leading-relaxed">
                {t('why.private.desc')} Zero account required to search. No medical profiling, no tracking trackers, and no diagnostic labeling.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Section 4: How It Works (1, 2, 3, 4) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center space-y-3 max-w-2xl mx-auto mb-12">
          <span className="text-xs font-bold tracking-widest text-[#6F6D76] uppercase font-sans">
            Simple 4-Step Journey
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl font-bold text-[#34343B]">
            {t('how.title')}
          </h2>
          <p className="text-xs sm:text-sm text-[#6F6D76]">
            From natural-language questions to trusted community connection.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 relative">
          {[
            {
              step: '01',
              title: t('how.step1'),
              desc: 'Type what you are seeking in everyday words (e.g. “Free Tamil counselling in Vellore open today”).'
            },
            {
              step: '02',
              title: t('how.step2'),
              desc: 'Our engine extracts your preferences into clear criteria pills and matches verified resources.'
            },
            {
              step: '03',
              title: t('how.step3'),
              desc: 'Inspect transparent match breakdowns explaining exact factors like cost, location, and language.'
            },
            {
              step: '04',
              title: t('how.step4'),
              desc: 'Call directly, get directions, save for later, or report outdated details to our administrative team.'
            }
          ].map((item, idx) => (
            <div
              key={idx}
              className="p-6 rounded-3xl bg-white border border-[#EADBCE] shadow-xs flex flex-col justify-between space-y-4"
            >
              <div>
                <span className="font-serif text-3xl font-bold text-[#E7DFF3] block">
                  {item.step}
                </span>
                <h3 className="font-serif text-base font-bold text-[#34343B] mt-2 mb-1.5">
                  {item.title}
                </h3>
                <p className="text-xs text-[#6F6D76] leading-relaxed">
                  {item.desc}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* CTA Bar below How it works */}
        <div className="mt-12 text-center">
          <Link
            to="/discover"
            className="inline-flex items-center gap-2 px-8 py-4 rounded-full bg-[#34343B] hover:bg-black text-white font-semibold text-sm shadow-md hover:shadow-lg transition-all"
          >
            <span>Start discovering resources</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </section>
    </div>
  );
};

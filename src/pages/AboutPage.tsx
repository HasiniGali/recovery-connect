import React from 'react';
import { ShieldCheck, HeartHandshake, Lock, CheckCircle2, AlertTriangle, Sparkles, BookOpen } from 'lucide-react';

export const AboutPage: React.FC = () => {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-12">
      {/* Header */}
      <div className="text-center space-y-3">
        <span className="text-xs font-bold tracking-widest text-[#6F6D76] uppercase font-sans">
          Mission & Ethics
        </span>
        <h1 className="font-serif text-3xl sm:text-5xl font-bold text-[#34343B]">
          About Recovery Connect
        </h1>
        <p className="text-xs sm:text-sm text-[#6F6D76] max-w-xl mx-auto leading-relaxed">
          Designed for the <strong>ByteQuest Hackathon — Track A: Tech for Recovery</strong>, Recovery Connect is an accessible, privacy-first Recovery Resource Navigator built to bridge the gap between people and verified care.
        </p>
      </div>

      {/* Core Ethical Boundaries Box */}
      <div className="p-6 sm:p-8 rounded-3xl bg-white border-2 border-[#EADBCE] shadow-xs space-y-6">
        <div className="flex items-center gap-2 pb-2 border-b border-[#EADBCE]">
          <AlertTriangle className="w-5 h-5 text-[#8C4A1E]" />
          <h2 className="font-serif text-xl font-bold text-[#34343B]">
            Product Boundaries & Safe Technology Commitments
          </h2>
        </div>

        <p className="text-xs sm:text-sm text-[#6F6D76] leading-relaxed">
          Technology in the mental health and recovery space must be held to the highest standard of responsibility. Recovery Connect operates under strict foundational principles:
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
          <div className="p-4 rounded-2xl bg-[#FFF9F3] border border-[#EADBCE] space-y-1.5">
            <span className="font-bold text-[#8E283E] block">✕ NOT a Diagnosis Application</span>
            <p className="text-[#6F6D76] leading-relaxed">
              We do not provide clinical psychiatric assessments, symptom checklists, diagnostic questionnaires, or psychological labels.
            </p>
          </div>

          <div className="p-4 rounded-2xl bg-[#FFF9F3] border border-[#EADBCE] space-y-1.5">
            <span className="font-bold text-[#8E283E] block">✕ NO "AI Therapist" Persona</span>
            <p className="text-[#6F6D76] leading-relaxed">
              Our natural-language processing engine performs only <em>preference extraction</em> (support type, language, location, availability). It never simulates human psychotherapy.
            </p>
          </div>

          <div className="p-4 rounded-2xl bg-[#FFF9F3] border border-[#EADBCE] space-y-1.5">
            <span className="font-bold text-[#8E283E] block">✕ NO Treatment Prescriptions</span>
            <p className="text-[#6F6D76] leading-relaxed">
              We do not prescribe medications, clinical therapies, or guarantee recovery outcomes. We connect you directly with qualified local humans and verified institutions.
            </p>
          </div>

          <div className="p-4 rounded-2xl bg-[#FFF9F3] border border-[#EADBCE] space-y-1.5">
            <span className="font-bold text-[#2D5A27] block">✓ Complete Privacy by Design</span>
            <p className="text-[#6F6D76] leading-relaxed">
              Search freely without creating an account or logging in. We never track your personal search queries or build behavioural advertising profiles.
            </p>
          </div>
        </div>
      </div>

      {/* Verification & Trust Methodology */}
      <div className="space-y-4">
        <h2 className="font-serif text-2xl font-bold text-[#34343B]">
          How Verification Works
        </h2>
        <p className="text-xs sm:text-sm text-[#6F6D76] leading-relaxed">
          Outdated phone numbers and phantom clinic listings are a primary barrier to recovery. In Recovery Connect, every listing displays its official source, audit history, and last verified date.
        </p>

        <div className="p-6 rounded-3xl bg-white border border-[#EADBCE] shadow-xs space-y-4 text-xs">
          <div className="flex items-start gap-3">
            <div className="w-8 h-8 rounded-xl bg-[#DCE8DC] text-[#2D5A27] flex items-center justify-center shrink-0 font-bold">
              1
            </div>
            <div>
              <h4 className="font-bold text-[#34343B]">Official Source Verification</h4>
              <p className="text-[#6F6D76] mt-0.5">
                Every institutional service is corroborated through government health directories, university charters, or recognized NGO registries.
              </p>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <div className="w-8 h-8 rounded-xl bg-[#DDECF4] text-[#25526C] flex items-center justify-center shrink-0 font-bold">
              2
            </div>
            <div>
              <h4 className="font-bold text-[#34343B]">Continuous Community Quality Feedback</h4>
              <p className="text-[#6F6D76] mt-0.5">
                Community members can flag outdated phone numbers or changed operating hours. Reports are reviewed by administrators before being marked as resolved.
              </p>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <div className="w-8 h-8 rounded-xl bg-[#E7DFF3] text-[#4D396E] flex items-center justify-center shrink-0 font-bold">
              3
            </div>
            <div>
              <h4 className="font-bold text-[#34343B]">Transparent Safety Marking</h4>
              <p className="text-[#6F6D76] mt-0.5">
                In this hackathon prototype, all demo entries are explicitly badged with <span className="font-semibold text-[#4D396E]">SYNTHETIC DEMO</span> to prevent real-world confusion, while crisis lines (Tele-MANAS, 108, Vandrevala) are verified against official portals.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

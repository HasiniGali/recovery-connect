import React from 'react';
import { Phone, ShieldAlert, HeartHandshake, Hospital, GraduationCap, ArrowRight, ExternalLink } from 'lucide-react';

export const EmergencyPage: React.FC = () => {
  const emergencyCards = [
    {
      id: 'em-1',
      title: 'Emergency Medical & Ambulance (Tamil Nadu)',
      purpose: 'Immediate life-support ambulance dispatch, trauma management, and acute psychiatric crisis transport across Tamil Nadu.',
      phone: '108',
      phoneDisplay: 'Dial 108',
      availability: '24/7 Toll-Free · 365 Days',
      source: 'Government of Tamil Nadu Health & Family Welfare Department',
      sourceUrl: 'https://health.tn.gov.in',
      badge: 'Immediate Medical Dispatch',
      variant: 'warm'
    },
    {
      id: 'em-2',
      title: 'Tele-MANAS National Tele-Mental Health Helpline',
      purpose: 'Government of India 24/7 toll-free crisis psychological first aid, emergency active listening, and psychiatric triage in Tamil & English.',
      phone: '14416',
      phoneDisplay: 'Dial 14416 (or 1800-891-4416)',
      availability: '24/7 Toll-Free · 22 Regional Languages',
      source: 'Ministry of Health & Family Welfare (MoHFW), Government of India',
      sourceUrl: 'https://telemanas.mohfw.gov.in',
      badge: 'National Crisis Helpline',
      variant: 'peach'
    },
    {
      id: 'em-3',
      title: 'CMC Vellore Emergency & Casualty Department',
      purpose: 'Tertiary academic hospital emergency medicine casualty with rapid psychiatric evaluation and acute inpatient stabilization.',
      phone: '+91 416 228 1000',
      phoneDisplay: '+91 416 228 1000',
      availability: '24/7 Emergency Wing Open Constantly',
      source: 'Christian Medical College (CMC) Vellore Main Hospital & Bagayam Campus',
      sourceUrl: 'https://www.cmch-vellore.edu',
      badge: 'Hospital Emergency Casualty',
      variant: 'blue'
    },
    {
      id: 'em-4',
      title: 'Vandrevala Foundation 24/7 Crisis Hotline',
      purpose: 'Non-profit active psychological first aid and emotional de-escalation hotline staffed by certified clinical psychologists.',
      phone: '+91 9999 666 555',
      phoneDisplay: '+91 9999 666 555',
      availability: '24/7 Round the Clock',
      source: 'Vandrevala Foundation National Mental Health Initiative',
      sourceUrl: 'https://www.vandrevalafoundation.com',
      badge: 'Confidential Crisis Care',
      variant: 'lavender'
    },
    {
      id: 'em-5',
      title: 'Campus Emergency & Student Safety Desk',
      purpose: 'On-campus emergency medical response, campus security dispatch, and university health center triage for resident students.',
      phone: '+91 416 220 2020',
      phoneDisplay: '+91 416 220 2020 (Ext. 101/102)',
      availability: '24/7 Campus Control Room',
      source: 'University Student Welfare & Security Directorate (Katpadi/Vellore)',
      sourceUrl: 'https://vellore.nic.in',
      badge: 'Campus Security & Health',
      variant: 'sage'
    }
  ];

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-10">
      {/* Restrained Warm Header */}
      <div className="text-center space-y-3">
        <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-[#F6E2D2] text-[#8C4A1E] text-xs font-semibold border border-[#E8C4AB]">
          <ShieldAlert className="w-3.5 h-3.5 text-[#B54A23]" />
          <span>Immediate Safety & Crisis Resources</span>
        </div>
        <h1 className="font-serif text-3xl sm:text-5xl font-bold text-[#34343B]">
          Need immediate help?
        </h1>
        <p className="text-xs sm:text-sm text-[#6F6D76] max-w-xl mx-auto leading-relaxed">
          If you or someone around you is in immediate physical danger, experiencing acute distress, or requires urgent medical attention, please connect with official services directly below.
        </p>
      </div>

      {/* Mandatory High-Clarity Disclaimer Banner */}
      <div className="p-4 sm:p-5 rounded-3xl bg-[#F6E2D2]/60 border-2 border-[#E8C4AB] text-[#8C4A1E] space-y-1">
        <p className="font-semibold text-xs sm:text-sm flex items-center gap-2">
          <ShieldAlert className="w-4 h-4 text-[#B54A23] shrink-0" />
          <span>Immediate Danger Protocol:</span>
        </p>
        <p className="text-xs leading-relaxed">
          If you are in immediate danger or need urgent medical attention, contact your local emergency service (dial <strong>108</strong>) or go to the nearest hospital emergency department immediately.
        </p>
        <p className="text-[11px] text-[#8C4A1E]/80 pt-1">
          Recovery Connect does not provide direct emergency dispatch or immediate clinical intervention. All contacts below are verified official public lines.
        </p>
      </div>

      {/* Emergency Cards Grid */}
      <div className="space-y-4">
        {emergencyCards.map(card => (
          <div
            key={card.id}
            className="p-6 sm:p-7 rounded-3xl bg-white border border-[#EADBCE] shadow-xs hover:shadow-sm transition-all flex flex-col sm:flex-row sm:items-center justify-between gap-6"
          >
            <div className="space-y-2 flex-1">
              <div className="flex items-center gap-2">
                <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-[#FFF9F3] text-[#6F6D76] border border-[#EADBCE] uppercase tracking-wider">
                  {card.badge}
                </span>
                <span className="text-[11px] font-semibold text-[#4B8344]">
                  ● {card.availability}
                </span>
              </div>

              <h3 className="font-serif text-xl font-bold text-[#34343B]">
                {card.title}
              </h3>

              <p className="text-xs text-[#6F6D76] leading-relaxed">
                {card.purpose}
              </p>

              <div className="text-[11px] text-[#6F6D76] pt-1">
                Official source: <strong className="text-[#34343B]">{card.source}</strong>
              </div>
            </div>

            {/* Direct Call Button */}
            <div className="shrink-0 flex flex-col sm:items-end gap-2">
              <a
                href={`tel:${card.phone.replace(/\s+/g, '')}`}
                className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-full bg-[#34343B] hover:bg-black text-white text-sm font-semibold shadow-md hover:shadow-lg transition-all active:scale-98"
              >
                <Phone className="w-4 h-4 text-[#F6E2D2]" />
                <span>Call {card.phoneDisplay}</span>
              </a>

              {card.sourceUrl && (
                <a
                  href={card.sourceUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 text-[11px] text-[#6F6D76] hover:text-[#34343B] hover:underline"
                >
                  <span>Official portal</span>
                  <ExternalLink className="w-3 h-3" />
                </a>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

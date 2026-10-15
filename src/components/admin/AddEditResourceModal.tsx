import React, { useState } from 'react';
import { Modal } from '../common/Modal';
import { Resource, ResourceCategory, CostType, Language, VerificationStatus } from '../../types';
import { Save, AlertTriangle } from 'lucide-react';

interface AddEditResourceModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (resourceData: any) => Promise<void>;
  initialData?: Resource | null;
}

export const AddEditResourceModal: React.FC<AddEditResourceModalProps> = ({
  isOpen,
  onClose,
  onSave,
  initialData
}) => {
  const isEditing = !!initialData;

  const [name, setName] = useState(initialData?.name || '');
  const [category, setCategory] = useState<ResourceCategory>(initialData?.category || 'counselling');
  const [description, setDescription] = useState(initialData?.description || '');
  const [shortDescription, setShortDescription] = useState(initialData?.shortDescription || '');
  const [phone, setPhone] = useState(initialData?.phone || '');
  const [website, setWebsite] = useState(initialData?.website || '');
  const [address, setAddress] = useState(initialData?.address || '');
  const [city, setCity] = useState(initialData?.city || 'Vellore');
  const [latitude, setLatitude] = useState(initialData?.latitude || 12.9200);
  const [longitude, setLongitude] = useState(initialData?.longitude || 79.1330);
  const [distanceKm, setDistanceKm] = useState(initialData?.distanceKm || 2.0);
  const [cost, setCost] = useState<CostType>(initialData?.cost || 'free');
  const [costDetails, setCostDetails] = useState(initialData?.costDetails || 'Free service');
  const [languages, setLanguages] = useState<Language[]>(initialData?.languages || ['Tamil', 'English']);
  const [eligibility, setEligibility] = useState(initialData?.eligibility || 'Open to all students and local residents.');
  const [availability, setAvailability] = useState<Resource['availability']>(initialData?.availability || 'open_today');
  const [availabilityHours, setAvailabilityHours] = useState(initialData?.availabilityHours || 'Mon - Sat: 9:00 AM – 6:00 PM');
  const [source, setSource] = useState(initialData?.source || 'District Health Directory');
  const [sourceUrl, setSourceUrl] = useState(initialData?.sourceUrl || '');
  const [verificationStatus, setVerificationStatus] = useState<VerificationStatus>(initialData?.verificationStatus || 'verified');
  const [verificationNotes, setVerificationNotes] = useState(initialData?.verificationNotes || 'Source verified by administrator.');
  const [isSynthetic, setIsSynthetic] = useState(initialData?.isSynthetic ?? true);

  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const availableLanguages: Language[] = ['Tamil', 'English', 'Hindi', 'Telugu', 'Malayalam'];

  const toggleLanguage = (lang: Language) => {
    if (languages.includes(lang)) {
      if (languages.length > 1) {
        setLanguages(languages.filter(l => l !== lang));
      }
    } else {
      setLanguages([...languages, lang]);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) {
      setError('Resource Name is required');
      return;
    }

    setSaving(true);
    setError(null);

    try {
      const payload = {
        name: name.trim(),
        category,
        description: description.trim(),
        shortDescription: shortDescription.trim() || description.trim().slice(0, 80) + '...',
        phone: phone.trim(),
        website: website.trim(),
        address: address.trim(),
        city: city.trim(),
        latitude: Number(latitude),
        longitude: Number(longitude),
        distanceKm: Number(distanceKm),
        cost,
        costDetails: costDetails.trim(),
        languages,
        eligibility: eligibility.trim(),
        availability,
        availabilityHours: availabilityHours.trim(),
        appointmentRequired: false,
        source: source.trim(),
        sourceUrl: sourceUrl.trim(),
        verificationDate: new Date().toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' }),
        lastUpdated: new Date().toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' }),
        verificationStatus,
        verificationNotes: verificationNotes.trim(),
        isSynthetic,
        disclaimer: isSynthetic ? 'Synthetic demo resource — not for real-world use.' : 'Verified official source.',
        accessibilityFeatures: ['Wheelchair access', 'Confidential space'],
        tags: [category, cost, ...languages.map(l => l.toLowerCase()), city.toLowerCase()]
      };

      await onSave(payload);
      onClose();
    } catch (err: any) {
      setError(err.message || 'Failed to save resource');
    } finally {
      setSaving(false);
    }
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={isEditing ? 'Edit Recovery Resource' : 'Add New Resource to Directory'}
      subtitle="Administrative resource management & verification records"
      maxWidth="xl"
    >
      <form onSubmit={handleSubmit} className="space-y-4 text-xs">
        {error && (
          <div className="p-2.5 bg-[#F4DDE2] border border-[#E2BDC5] rounded-xl text-[#8E283E] flex items-center gap-2">
            <AlertTriangle className="w-4 h-4 shrink-0" />
            <span>{error}</span>
          </div>
        )}

        {/* Basic Information */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <div className="sm:col-span-2">
            <label className="block font-semibold text-[#34343B] mb-1">Resource Name *</label>
            <input
              type="text"
              required
              value={name}
              onChange={e => setName(e.target.value)}
              placeholder="e.g. Katpadi Youth Counselling Oasis"
              className="w-full bg-white border border-[#EADBCE] rounded-xl p-2.5 focus:outline-hidden focus:border-[#BBD7E6]"
            />
          </div>

          <div>
            <label className="block font-semibold text-[#34343B] mb-1">Category *</label>
            <select
              value={category}
              onChange={e => setCategory(e.target.value as ResourceCategory)}
              className="w-full bg-white border border-[#EADBCE] rounded-xl p-2.5 focus:outline-hidden"
            >
              <option value="counselling">Counselling</option>
              <option value="recovery">Recovery</option>
              <option value="crisis">Crisis Support</option>
              <option value="support_group">Support Group</option>
              <option value="campus">Campus Support</option>
              <option value="medical">Medical Support</option>
            </select>
          </div>

          <div>
            <label className="block font-semibold text-[#34343B] mb-1">Cost Structure *</label>
            <select
              value={cost}
              onChange={e => setCost(e.target.value as CostType)}
              className="w-full bg-white border border-[#EADBCE] rounded-xl p-2.5 focus:outline-hidden"
            >
              <option value="free">Free</option>
              <option value="sliding_scale">Sliding Scale</option>
              <option value="low_cost">Low Cost</option>
              <option value="paid">Standard Paid</option>
            </select>
          </div>

          <div className="sm:col-span-2">
            <label className="block font-semibold text-[#34343B] mb-1">Full Description</label>
            <textarea
              rows={2}
              value={description}
              onChange={e => setDescription(e.target.value)}
              placeholder="Detailed description of services offered..."
              className="w-full bg-white border border-[#EADBCE] rounded-xl p-2.5 focus:outline-hidden"
            />
          </div>

          <div>
            <label className="block font-semibold text-[#34343B] mb-1">Phone Number</label>
            <input
              type="text"
              value={phone}
              onChange={e => setPhone(e.target.value)}
              placeholder="+91 416 220 0000"
              className="w-full bg-white border border-[#EADBCE] rounded-xl p-2.5 focus:outline-hidden"
            />
          </div>

          <div>
            <label className="block font-semibold text-[#34343B] mb-1">Official Website</label>
            <input
              type="url"
              value={website}
              onChange={e => setWebsite(e.target.value)}
              placeholder="https://..."
              className="w-full bg-white border border-[#EADBCE] rounded-xl p-2.5 focus:outline-hidden"
            />
          </div>

          <div className="sm:col-span-2">
            <label className="block font-semibold text-[#34343B] mb-1">Address & City</label>
            <input
              type="text"
              value={address}
              onChange={e => setAddress(e.target.value)}
              placeholder="Street address in Vellore/Katpadi"
              className="w-full bg-white border border-[#EADBCE] rounded-xl p-2.5 focus:outline-hidden"
            />
          </div>

          <div>
            <label className="block font-semibold text-[#34343B] mb-1">Latitude</label>
            <input
              type="number"
              step="0.0001"
              value={latitude}
              onChange={e => setLatitude(parseFloat(e.target.value))}
              className="w-full bg-white border border-[#EADBCE] rounded-xl p-2.5 focus:outline-hidden"
            />
          </div>

          <div>
            <label className="block font-semibold text-[#34343B] mb-1">Longitude</label>
            <input
              type="number"
              step="0.0001"
              value={longitude}
              onChange={e => setLongitude(parseFloat(e.target.value))}
              className="w-full bg-white border border-[#EADBCE] rounded-xl p-2.5 focus:outline-hidden"
            />
          </div>

          <div>
            <label className="block font-semibold text-[#34343B] mb-1">Availability Hours</label>
            <input
              type="text"
              value={availabilityHours}
              onChange={e => setAvailabilityHours(e.target.value)}
              placeholder="e.g. Mon - Sat: 9:00 AM – 6:00 PM (Open Today)"
              className="w-full bg-white border border-[#EADBCE] rounded-xl p-2.5 focus:outline-hidden"
            />
          </div>

          <div>
            <label className="block font-semibold text-[#34343B] mb-1">Distance (km)</label>
            <input
              type="number"
              step="0.1"
              value={distanceKm}
              onChange={e => setDistanceKm(parseFloat(e.target.value))}
              className="w-full bg-white border border-[#EADBCE] rounded-xl p-2.5 focus:outline-hidden"
            />
          </div>
        </div>

        {/* Languages Selection */}
        <div>
          <label className="block font-semibold text-[#34343B] mb-1.5">Languages Supported</label>
          <div className="flex items-center gap-2 flex-wrap">
            {availableLanguages.map(lang => (
              <button
                key={lang}
                type="button"
                onClick={() => toggleLanguage(lang)}
                className={`px-3 py-1 rounded-full border text-xs transition-all ${
                  languages.includes(lang)
                    ? 'bg-[#DDECF4] border-[#BBD7E6] text-[#25526C] font-semibold'
                    : 'bg-white border-[#EADBCE] text-[#6F6D76]'
                }`}
              >
                {lang}
              </button>
            ))}
          </div>
        </div>

        {/* Verification & Trust Layer */}
        <div className="p-4 bg-[#FFF9F3] border border-[#EADBCE] rounded-2xl space-y-3">
          <span className="font-bold text-[#34343B] uppercase tracking-wider block text-[11px]">
            Verification Layer Records
          </span>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block font-semibold text-[#34343B] mb-1">Verification Status *</label>
              <select
                value={verificationStatus}
                onChange={e => setVerificationStatus(e.target.value as VerificationStatus)}
                className="w-full bg-white border border-[#EADBCE] rounded-xl p-2 focus:outline-hidden"
              >
                <option value="verified">VERIFIED</option>
                <option value="needs_review">NEEDS REVIEW</option>
                <option value="reported">REPORTED</option>
              </select>
            </div>

            <div>
              <label className="block font-semibold text-[#34343B] mb-1">Verification Source Name</label>
              <input
                type="text"
                value={source}
                onChange={e => setSource(e.target.value)}
                placeholder="e.g. State Health Directory"
                className="w-full bg-white border border-[#EADBCE] rounded-xl p-2 focus:outline-hidden"
              />
            </div>

            <div className="sm:col-span-2">
              <label className="block font-semibold text-[#34343B] mb-1">Verification Assessor Notes</label>
              <input
                type="text"
                value={verificationNotes}
                onChange={e => setVerificationNotes(e.target.value)}
                placeholder="Notes on accreditation and intake review..."
                className="w-full bg-white border border-[#EADBCE] rounded-xl p-2 focus:outline-hidden"
              />
            </div>

            <div className="sm:col-span-2 flex items-center gap-2 pt-1">
              <input
                type="checkbox"
                id="is-synthetic-check"
                checked={isSynthetic}
                onChange={e => setIsSynthetic(e.target.checked)}
                className="w-4 h-4 accent-[#34343B]"
              />
              <label htmlFor="is-synthetic-check" className="text-xs text-[#34343B] cursor-pointer">
                Mark as <strong>Synthetic Demo Data</strong> (Displays "Synthetic demo resource — not for real-world use")
              </label>
            </div>
          </div>
        </div>

        {/* Modal Buttons */}
        <div className="pt-3 border-t border-[#EADBCE] flex items-center justify-end gap-2">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 rounded-full text-xs font-medium text-[#6F6D76] hover:text-[#34343B]"
          >
            Cancel
          </button>
          <button
            type="submit"
            disabled={saving}
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-[#34343B] hover:bg-black text-white text-xs font-semibold shadow-xs transition-all disabled:opacity-50"
          >
            <Save className="w-3.5 h-3.5" />
            <span>{saving ? 'Saving...' : isEditing ? 'Update Resource' : 'Save & Publish'}</span>
          </button>
        </div>
      </form>
    </Modal>
  );
};

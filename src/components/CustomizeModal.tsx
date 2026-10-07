import React, { useState } from 'react';
import { X, Sparkles, Check, RotateCcw, Share2, KeyRound, Film } from 'lucide-react';
import { SurpriseSettings } from '../types';
import { getDefaultSettings } from '../utils/storage';

interface CustomizeModalProps {
  isOpen: boolean;
  onClose: () => void;
  settings: SurpriseSettings;
  onSave: (updated: SurpriseSettings) => void;
}

export const CustomizeModal: React.FC<CustomizeModalProps> = ({
  isOpen,
  onClose,
  settings,
  onSave,
}) => {
  const [wifeName, setWifeName] = useState(settings.wifeName);
  const [husbandName, setHusbandName] = useState(settings.husbandName);
  const [secretPasscode, setSecretPasscode] = useState(settings.secretPasscode || 'love');
  const [videoUrl, setVideoUrl] = useState(settings.videoUrl || '');
  const [birthdayDate, setBirthdayDate] = useState(() => {
    try {
      const d = new Date(settings.birthdayDate);
      return d.toISOString().slice(0, 16);
    } catch {
      return '';
    }
  });
  const [customMessage, setCustomMessage] = useState(settings.customMessage || '');
  const [savedSuccess, setSavedSuccess] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const updated: SurpriseSettings = {
      ...settings,
      wifeName: wifeName.trim() || 'Meri Jaan',
      husbandName: husbandName.trim() || 'Tumhara Humsafar',
      secretPasscode: secretPasscode.trim() || 'love',
      videoUrl: videoUrl.trim(),
      birthdayDate: birthdayDate ? new Date(birthdayDate).toISOString() : settings.birthdayDate,
      customMessage,
    };
    onSave(updated);
    setSavedSuccess(true);
    setTimeout(() => {
      setSavedSuccess(false);
      onClose();
    }, 1000);
  };

  const handleReset = () => {
    const defaults = getDefaultSettings();
    setWifeName(defaults.wifeName);
    setHusbandName(defaults.husbandName);
    setSecretPasscode(defaults.secretPasscode);
    setVideoUrl(defaults.videoUrl || '');
    setBirthdayDate(new Date(defaults.birthdayDate).toISOString().slice(0, 16));
    setCustomMessage(defaults.customMessage || '');
  };

  const shareText = encodeURIComponent(
    `🌹 Meri Pyaari Biwi (${wifeName}), Salgirah Mubarak! Maine tumhare liye ek special surprise portal banaya hai: ${window.location.href}\n\n🔑 Secret Login Passcode: "${secretPasscode}" (ya direct unlock karein) ❤️`
  );

  return (
    <div
      role="dialog"
      aria-modal="true"
      className="fixed inset-0 z-50 bg-stone-950/85 backdrop-blur-md flex items-center justify-center p-4 sm:p-6 overflow-y-auto"
      onClick={onClose}
    >
      <div
        className="relative max-w-lg w-full bg-stone-900 border border-stone-800 rounded-3xl p-6 sm:p-8 shadow-2xl my-8 max-h-[90vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between pb-4 border-b border-stone-800">
          <div>
            <div className="flex items-center gap-2 text-xs font-medium text-rose-400 uppercase tracking-wider">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Personalize Surprise</span>
            </div>
            <h3 className="text-xl font-serif font-bold text-stone-100 mt-1">
              Surprise & Login Settings
            </h3>
          </div>
          <button
            onClick={onClose}
            type="button"
            className="p-1.5 rounded-lg text-stone-400 hover:text-stone-100 hover:bg-stone-800 transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4 mt-6">
          {/* Wife's Name */}
          <div>
            <label className="block text-xs font-semibold text-stone-300 mb-1.5 uppercase tracking-wider">
              Biwi Ka Naam / Pet Name (e.g. Ayesha, Noor, Meri Jaan)
            </label>
            <input
              type="text"
              value={wifeName}
              onChange={(e) => setWifeName(e.target.value)}
              placeholder="e.g. Meri Jaan / Fatima"
              required
              className="w-full px-4 py-2.5 text-sm bg-stone-950 border border-stone-800 rounded-xl text-stone-100 focus:outline-none focus:border-rose-500 transition-colors"
            />
          </div>

          {/* Husband's Name */}
          <div>
            <label className="block text-xs font-semibold text-stone-300 mb-1.5 uppercase tracking-wider">
              Aapka Naam / Signature (e.g. Mudabber, Tumhara Humsafar)
            </label>
            <input
              type="text"
              value={husbandName}
              onChange={(e) => setHusbandName(e.target.value)}
              placeholder="e.g. Tumhara Mudabber"
              required
              className="w-full px-4 py-2.5 text-sm bg-stone-950 border border-stone-800 rounded-xl text-stone-100 focus:outline-none focus:border-rose-500 transition-colors"
            />
          </div>

          {/* Secret Login Passcode */}
          <div>
            <label className="block text-xs font-semibold text-stone-300 mb-1.5 uppercase tracking-wider flex items-center gap-1.5">
              <KeyRound className="w-3.5 h-3.5 text-rose-400" />
              <span>Secret Login Passcode (For Surprise Entrance)</span>
            </label>
            <input
              type="text"
              value={secretPasscode}
              onChange={(e) => setSecretPasscode(e.target.value)}
              placeholder="e.g. love / birthday date / 1234"
              required
              className="w-full px-4 py-2.5 text-sm bg-stone-950 border border-stone-800 rounded-xl text-stone-100 focus:outline-none focus:border-rose-500 transition-colors"
            />
            <p className="text-[11px] text-stone-500 mt-1">
              Jab aapki wife link open karengi, woh yeh passcode enter kar ke login karengi (or tap direct unlock).
            </p>
          </div>

          {/* Birthday Date & Time */}
          <div>
            <label className="block text-xs font-semibold text-stone-300 mb-1.5 uppercase tracking-wider">
              Birthday Date & Time (Countdown Target)
            </label>
            <input
              type="datetime-local"
              value={birthdayDate}
              onChange={(e) => setBirthdayDate(e.target.value)}
              required
              className="w-full px-4 py-2.5 text-sm bg-stone-950 border border-stone-800 rounded-xl text-stone-100 focus:outline-none focus:border-rose-500 transition-colors"
            />
          </div>

          {/* Birthday Video URL */}
          <div>
            <label className="block text-xs font-semibold text-stone-300 mb-1.5 uppercase tracking-wider flex items-center gap-1.5">
              <Film className="w-3.5 h-3.5 text-rose-400" />
              <span>Birthday Video URL (Optional YouTube / MP4 Link)</span>
            </label>
            <input
              type="url"
              value={videoUrl}
              onChange={(e) => setVideoUrl(e.target.value)}
              placeholder="https://www.youtube.com/watch?v=... (Leave empty for built-in film reel)"
              className="w-full px-4 py-2.5 text-sm bg-stone-950 border border-stone-800 rounded-xl text-stone-100 focus:outline-none focus:border-rose-500 transition-colors"
            />
          </div>

          {/* Custom Short Message */}
          <div>
            <label className="block text-xs font-semibold text-stone-300 mb-1.5 uppercase tracking-wider">
              Khaas Paighaam / Personal Short Note
            </label>
            <textarea
              rows={2}
              value={customMessage}
              onChange={(e) => setCustomMessage(e.target.value)}
              placeholder="Dil ki koi khas baat..."
              className="w-full px-4 py-2.5 text-sm bg-stone-950 border border-stone-800 rounded-xl text-stone-100 focus:outline-none focus:border-rose-500 transition-colors"
            />
          </div>

          {/* Share Directly on WhatsApp */}
          <div className="pt-2">
            <a
              href={`https://api.whatsapp.com/send?text=${shareText}`}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full flex items-center justify-center gap-2 px-4 py-2.5 bg-emerald-900/40 hover:bg-emerald-900/60 border border-emerald-700/50 rounded-xl text-emerald-200 text-xs font-semibold transition-colors"
            >
              <Share2 className="w-3.5 h-3.5" />
              <span>Send Surprise Link + Password on WhatsApp</span>
            </a>
          </div>

          {/* Footer Actions */}
          <div className="flex items-center justify-between pt-4 border-t border-stone-800">
            <button
              type="button"
              onClick={handleReset}
              className="flex items-center gap-1.5 text-xs text-stone-400 hover:text-stone-200 cursor-pointer"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Reset Defaults</span>
            </button>

            <div className="flex gap-2">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2 text-xs font-medium text-stone-400 hover:text-stone-200 cursor-pointer"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="flex items-center gap-1.5 px-5 py-2 text-xs font-semibold text-white bg-rose-600 hover:bg-rose-500 rounded-xl shadow-md transition-colors cursor-pointer"
              >
                {savedSuccess ? (
                  <>
                    <Check className="w-4 h-4" />
                    <span>Saved!</span>
                  </>
                ) : (
                  <span>Save Changes</span>
                )}
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

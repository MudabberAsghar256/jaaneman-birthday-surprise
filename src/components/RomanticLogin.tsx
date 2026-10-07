import React, { useState } from 'react';
import { Heart, Lock, KeyRound, Sparkles, ArrowRight, ShieldCheck, HelpCircle } from 'lucide-react';
import confetti from 'canvas-confetti';
import { romanticAudio } from '../utils/audio';

interface RomanticLoginProps {
  wifeName: string;
  husbandName: string;
  expectedPasscode: string;
  onLoginSuccess: () => void;
}

export const RomanticLogin: React.FC<RomanticLoginProps> = ({
  wifeName,
  husbandName,
  expectedPasscode,
  onLoginSuccess,
}) => {
  const [passcode, setPasscode] = useState('');
  const [errorMsg, setErrorMsg] = useState('');
  const [showHint, setShowHint] = useState(false);
  const [isShaking, setIsShaking] = useState(false);

  const handleUnlock = (codeToVerify?: string) => {
    const inputCode = (codeToVerify ?? passcode).trim().toLowerCase();
    const correctCode = expectedPasscode.trim().toLowerCase();

    // Allow correct code, or 'love', or '1234', or 'jaan', or direct bypass
    if (
      inputCode === correctCode ||
      inputCode === 'love' ||
      inputCode === '1234' ||
      inputCode === 'jaan' ||
      codeToVerify === 'bypass'
    ) {
      // Success! Play sound & burst confetti
      romanticAudio.playCelebrationFanfare();
      confetti({
        particleCount: 80,
        spread: 100,
        origin: { y: 0.5 },
        colors: ['#f43f5e', '#fb7185', '#fbbf24', '#fde047'],
      });
      onLoginSuccess();
    } else {
      setIsShaking(true);
      setErrorMsg('Arrey meri jaan! Password galat hai, "Unlock" par click karein ya "love" likhein ❤️');
      setTimeout(() => setIsShaking(false), 600);
    }
  };

  const handleDirectUnlock = () => {
    handleUnlock('bypass');
  };

  return (
    <div className="min-h-screen bg-stone-950 text-stone-100 flex items-center justify-center p-4 sm:p-6 relative overflow-hidden select-none">
      {/* Background ambient lighting */}
      <div className="absolute inset-0 bg-radial from-rose-950/40 via-stone-950 to-stone-950 pointer-events-none" />
      <div className="absolute -top-32 -left-32 w-96 h-96 bg-rose-600/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute -bottom-32 -right-32 w-96 h-96 bg-amber-600/10 rounded-full blur-3xl pointer-events-none" />

      {/* Floating gentle particles */}
      <div className="absolute inset-0 pointer-events-none opacity-25">
        <span className="absolute top-[15%] left-[12%] text-2xl animate-float">🌹</span>
        <span className="absolute top-[20%] right-[15%] text-lg animate-float [animation-delay:1.5s]">✨</span>
        <span className="absolute bottom-[20%] left-[18%] text-2xl animate-float [animation-delay:3s]">💖</span>
        <span className="absolute bottom-[25%] right-[20%] text-xl animate-float [animation-delay:2s]">👑</span>
      </div>

      <div className="relative z-10 max-w-md w-full">
        {/* Card */}
        <div
          className={`bg-stone-900/70 backdrop-blur-xl border border-rose-900/40 rounded-3xl p-6 sm:p-10 shadow-2xl shadow-rose-950/50 flex flex-col items-center text-center transition-transform ${
            isShaking ? 'animate-shake' : ''
          }`}
        >
          {/* Top Heart Badge */}
          <div className="w-16 h-16 rounded-full bg-gradient-to-tr from-rose-600 to-rose-400 p-0.5 shadow-lg shadow-rose-600/30 mb-5 flex items-center justify-center">
            <div className="w-full h-full bg-stone-950 rounded-full flex items-center justify-center">
              <Heart className="w-8 h-8 text-rose-400 fill-rose-500 animate-pulse" />
            </div>
          </div>

          {/* Unboxed Metadata */}
          <div className="flex items-center gap-2 text-xs font-semibold text-rose-300/80 mb-2 uppercase tracking-widest">
            <span>VIP Access</span>
            <span aria-hidden="true">·</span>
            <span>Sirf Meri Malika Ke Liye</span>
          </div>

          <h1 className="text-2xl sm:text-3xl font-serif font-bold text-stone-100 mb-2">
            Khaas Dastak, <span className="font-script text-rose-400 text-3xl sm:text-4xl block sm:inline">{wifeName}</span>
          </h1>

          <p className="text-xs sm:text-sm text-stone-300 font-light mb-8 max-w-xs leading-relaxed">
            Yeh surprise page sirf aapke liye lock hai. Apna secret passcode daalein ya direct unlock karein.
          </p>

          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleUnlock();
            }}
            className="w-full space-y-4"
          >
            {/* Passcode Input Field */}
            <div className="text-left">
              <label className="block text-xs font-medium text-stone-300 mb-1.5 uppercase tracking-wider flex items-center justify-between">
                <span>Secret Passcode / Password</span>
                <button
                  type="button"
                  onClick={() => setShowHint(!showHint)}
                  className="text-[11px] text-rose-400 hover:text-rose-300 flex items-center gap-1 cursor-pointer lowercase"
                >
                  <HelpCircle className="w-3 h-3" />
                  <span>hint?</span>
                </button>
              </label>

              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-stone-500">
                  <KeyRound className="w-4 h-4 text-rose-400/80" />
                </div>
                <input
                  type="text"
                  value={passcode}
                  onChange={(e) => {
                    setPasscode(e.target.value);
                    setErrorMsg('');
                  }}
                  placeholder="e.g. love / 1234 / aapka secret code"
                  className="w-full pl-10 pr-4 py-3 bg-stone-950/80 border border-stone-800 focus:border-rose-500 rounded-xl text-stone-100 placeholder-stone-600 text-sm focus:outline-none transition-colors"
                />
              </div>

              {showHint && (
                <div className="mt-2 p-2.5 bg-rose-950/30 border border-rose-900/40 rounded-lg text-[11px] text-rose-200 animate-in fade-in">
                  💡 <strong>Hint:</strong> Password <strong>"love"</strong> hai, ya niche button se direct unlock karein!
                </div>
              )}

              {errorMsg && (
                <p className="mt-2 text-xs text-rose-400 font-medium">
                  {errorMsg}
                </p>
              )}
            </div>

            {/* Login Button */}
            <button
              type="submit"
              className="w-full flex items-center justify-center gap-2 py-3 px-6 bg-rose-600 hover:bg-rose-500 text-white text-sm font-semibold rounded-xl shadow-lg shadow-rose-900/50 hover:shadow-rose-600/40 transition-all hover:scale-[1.02] active:scale-[0.98] cursor-pointer"
            >
              <Lock className="w-4 h-4" />
              <span>Unlock My Birthday Surprise</span>
              <ArrowRight className="w-4 h-4" />
            </button>

            {/* Direct Bypass Button for Wife */}
            <div className="pt-2">
              <button
                type="button"
                onClick={handleDirectUnlock}
                className="w-full py-2.5 px-4 bg-stone-950/60 hover:bg-rose-950/30 border border-stone-800 hover:border-rose-900/50 text-stone-300 hover:text-rose-200 text-xs font-medium rounded-xl transition-all flex items-center justify-center gap-2 cursor-pointer"
              >
                <Sparkles className="w-3.5 h-3.5 text-amber-300" />
                <span>Passcode nahi pata? Direct Enter Karein 💖</span>
              </button>
            </div>
          </form>

          {/* Copy Link For Wife Button */}
          <div className="mt-4 w-full">
            <button
              type="button"
              onClick={() => {
                const text = `🌹 Meri Pyaari Biwi (${wifeName}), Salgirah Mubarak! Maine aapke liye ek special surprise portal banaya hai:\n${window.location.href}\n\n🔑 Secret Login Passcode: "${expectedPasscode}" (ya direct unlock karein) ❤️`;
                navigator.clipboard.writeText(text);
                alert('Surprise link and message copied! Ab WhatsApp par wife ko send karein.');
              }}
              className="text-[11px] text-stone-400 hover:text-rose-300 flex items-center justify-center gap-1.5 mx-auto py-1 cursor-pointer transition-colors"
            >
              <span>📋 Copy link & wish message for WhatsApp</span>
            </button>
          </div>

          {/* Footer note */}
          <div className="mt-4 pt-3 border-t border-stone-800/80 w-full text-center">
            <p className="text-[11px] text-stone-500">
              Banaaya gaya be-panah mohabbat ke sath · {husbandName}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

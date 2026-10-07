import React, { useState } from 'react';
import { Copy, Check, Heart, BookOpen, Volume2, Sparkles, Share2 } from 'lucide-react';
import { LoveLetter } from '../types';

interface LoveLettersProps {
  letters: LoveLetter[];
  wifeName: string;
  husbandName: string;
}

export const LoveLetters: React.FC<LoveLettersProps> = ({
  letters,
  wifeName,
  husbandName,
}) => {
  const [activeTab, setActiveTab] = useState<string>(letters[0]?.id || 'letter-main');
  const [copied, setCopied] = useState<boolean>(false);
  const [isSpeaking, setIsSpeaking] = useState<boolean>(false);

  const currentLetter = letters.find((l) => l.id === activeTab) || letters[0];

  const handleCopyWish = () => {
    if (!currentLetter) return;
    const poetryText = currentLetter.urduPoetry
      ? `\n\n"${currentLetter.urduPoetry.roman}"\n(${currentLetter.urduPoetry.meaning})\n\n`
      : '\n\n';

    const fullText = `🌹 ${currentLetter.title} — Salgirah Mubarak Meri Jaan! 🌹\n${poetryText}${currentLetter.content.join(
      '\n\n'
    )}\n\n— Faqat Tumhara, ${husbandName} ❤️`;

    navigator.clipboard.writeText(fullText).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 3000);
    });
  };

  const handleSpeech = () => {
    if (typeof window === 'undefined' || !('speechSynthesis' in window)) return;

    if (isSpeaking) {
      window.speechSynthesis.cancel();
      setIsSpeaking(false);
      return;
    }

    const textToSpeak = currentLetter.content.join('. ');
    const utterance = new SpeechSynthesisUtterance(textToSpeak);
    utterance.rate = 0.88;
    utterance.pitch = 1.0;

    utterance.onend = () => setIsSpeaking(false);
    utterance.onerror = () => setIsSpeaking(false);

    setIsSpeaking(true);
    window.speechSynthesis.speak(utterance);
  };

  return (
    <section id="letters" className="py-20 px-4 sm:px-6 lg:px-8 bg-stone-950/60 relative">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-10">
          <div className="flex items-center justify-center gap-2 text-xs sm:text-sm font-medium text-rose-300/80 mb-2 uppercase tracking-wider">
            <span>Dillagi & Jazbaat</span>
            <span aria-hidden="true">·</span>
            <span>Khat Meri Biwi Ke Naam</span>
            <span aria-hidden="true">·</span>
            <span>Emotional Messages</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-serif font-bold text-stone-100 mb-3">
            Mere Dil Ki Har Baat, Sirf Tumhare Liye
          </h2>
          <p className="text-stone-300 text-sm sm:text-base font-light max-w-xl mx-auto">
            Kuch jazbaat zuban se kehna mushkil hote hain, isliye maine apne dil ke har ehsaas ko in alfaz mein piro diya hai.
          </p>
        </div>

        {/* Tab Selection (Interactive filter buttons) */}
        <div className="flex items-center justify-center gap-1.5 p-1.5 bg-stone-900/80 border border-stone-800 rounded-xl mb-8 overflow-x-auto max-w-2xl mx-auto scrollbar-none">
          {letters.map((letter) => {
            const isActive = activeTab === letter.id;
            return (
              <button
                key={letter.id}
                onClick={() => {
                  setActiveTab(letter.id);
                  if (isSpeaking) {
                    window.speechSynthesis.cancel();
                    setIsSpeaking(false);
                  }
                }}
                type="button"
                className={`px-3.5 py-2 text-xs font-semibold rounded-lg transition-all whitespace-nowrap cursor-pointer ${
                  isActive
                    ? 'bg-rose-900/60 text-rose-100 border border-rose-700/50 shadow-sm'
                    : 'text-stone-400 hover:text-stone-200 hover:bg-stone-800/40'
                }`}
              >
                {letter.title}
              </button>
            );
          })}
        </div>

        {/* Letter Presentation Container */}
        <div className="relative bg-gradient-to-b from-stone-900/90 via-stone-900/70 to-stone-950/90 border border-rose-900/30 rounded-3xl p-6 sm:p-10 md:p-14 shadow-2xl">
          {/* Subtle decorative wax-seal motif at top corner */}
          <div className="absolute top-6 right-6 sm:top-8 sm:right-8 w-12 h-12 rounded-full bg-rose-900/40 border border-rose-700/40 flex items-center justify-center shadow-inner pointer-events-none">
            <Heart className="w-5 h-5 text-rose-400 fill-rose-400/80" />
          </div>

          {/* Letter Title & Subtitle */}
          <div className="border-b border-stone-800/80 pb-6 mb-8">
            <h3 className="text-2xl sm:text-3xl font-serif font-bold text-rose-100 mb-1">
              {currentLetter.title}
            </h3>
            <p className="text-xs sm:text-sm text-stone-400 font-sans">
              {currentLetter.subtitle}
            </p>
          </div>

          {/* Poetic Urdu Couplet (Sher) Highlight */}
          {currentLetter.urduPoetry && (
            <div className="bg-rose-950/20 border-l-2 border-rose-500/70 p-5 rounded-r-xl mb-8 space-y-2">
              <p className="text-lg sm:text-xl font-serif text-right text-rose-200/90 tracking-wide font-normal leading-relaxed dir-rtl">
                {currentLetter.urduPoetry.urdu}
              </p>
              <p className="text-sm font-serif italic text-rose-300">
                "{currentLetter.urduPoetry.roman}"
              </p>
              <p className="text-xs text-stone-400 font-sans">
                Meaning: {currentLetter.urduPoetry.meaning}
              </p>
            </div>
          )}

          {/* Emotional Prose Content */}
          <div className="space-y-4 text-stone-200 text-sm sm:text-base leading-relaxed font-sans font-light">
            {currentLetter.content.map((paragraph, idx) => (
              <p key={idx} className="tracking-wide">
                {paragraph.replace('Meri Pyaari Biwi', `Meri Pyaari Biwi (${wifeName})`)}
              </p>
            ))}
          </div>

          {/* Signoff / Signature */}
          <div className="mt-10 pt-6 border-t border-stone-800/80 flex flex-col sm:flex-row sm:items-end justify-between gap-4">
            <div>
              <span className="text-xs uppercase tracking-wider text-stone-500 block">
                Tumhare Liye Har Dua Ke Sath
              </span>
              <span className="font-script text-3xl sm:text-4xl text-rose-400 block mt-1">
                Faqat Tumhara, {husbandName}
              </span>
            </div>

            {/* Action Buttons: Copy for WhatsApp & Audio Reader */}
            <div className="flex items-center gap-2">
              {'speechSynthesis' in (typeof window !== 'undefined' ? window : {}) && (
                <button
                  onClick={handleSpeech}
                  type="button"
                  className={`flex items-center gap-1.5 px-3.5 py-2 text-xs font-medium rounded-full border transition-all cursor-pointer ${
                    isSpeaking
                      ? 'bg-rose-900/50 border-rose-600 text-rose-200'
                      : 'bg-stone-950/60 border-stone-800 text-stone-400 hover:text-stone-200'
                  }`}
                  title="Listen to this letter"
                >
                  <Volume2 className={`w-3.5 h-3.5 ${isSpeaking ? 'animate-pulse text-rose-400' : ''}`} />
                  <span>{isSpeaking ? 'Listening...' : 'Listen'}</span>
                </button>
              )}

              <button
                onClick={handleCopyWish}
                type="button"
                className="flex items-center gap-1.5 px-4 py-2 text-xs font-semibold rounded-full bg-rose-600 hover:bg-rose-500 text-white shadow-md shadow-rose-900/40 transition-all cursor-pointer"
              >
                {copied ? (
                  <>
                    <Check className="w-3.5 h-3.5 text-white" />
                    <span>Wish Copied!</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-3.5 h-3.5" />
                    <span>Copy to WhatsApp</span>
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

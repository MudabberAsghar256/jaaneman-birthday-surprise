import React, { useState } from 'react';
import { Sparkles, Wind, Utensils, RotateCcw, Heart } from 'lucide-react';
import confetti from 'canvas-confetti';
import { romanticAudio } from '../utils/audio';

interface CakeCuttingProps {
  wifeName: string;
}

export const CakeCutting: React.FC<CakeCuttingProps> = ({ wifeName }) => {
  const [candlesBlown, setCandlesBlown] = useState<boolean>(false);
  const [cakeCut, setCakeCut] = useState<boolean>(false);
  const [showWishModal, setShowWishModal] = useState<boolean>(false);

  const handleBlowCandles = () => {
    if (candlesBlown) return;

    // Play blow sound
    romanticAudio.playBlowSound();

    setTimeout(() => {
      setCandlesBlown(true);
      setShowWishModal(true);

      // Play fanfare
      romanticAudio.playCelebrationFanfare();

      // Confetti burst
      confetti({
        particleCount: 100,
        spread: 90,
        origin: { y: 0.55 },
        colors: ['#f43f5e', '#fb7185', '#fbbf24', '#fde047', '#ffffff'],
      });

      // Side cannons
      setTimeout(() => {
        confetti({
          particleCount: 60,
          angle: 60,
          spread: 65,
          origin: { x: 0.1, y: 0.6 },
          colors: ['#e11d48', '#fda4af', '#f59e0b'],
        });
        confetti({
          particleCount: 60,
          angle: 120,
          spread: 65,
          origin: { x: 0.9, y: 0.6 },
          colors: ['#e11d48', '#fda4af', '#f59e0b'],
        });
      }, 300);
    }, 400);
  };

  const handleCutCake = () => {
    setCakeCut(true);
    romanticAudio.playTone(523.25, 0.4, 'triangle', 0.1);
    confetti({
      particleCount: 50,
      spread: 70,
      origin: { y: 0.65 },
      colors: ['#fda4af', '#f43f5e', '#fbbf24'],
    });
  };

  const handleRelight = () => {
    setCandlesBlown(false);
    setCakeCut(false);
    setShowWishModal(false);
  };

  return (
    <section id="celebration" className="py-20 px-4 sm:px-6 lg:px-8 relative overflow-hidden bg-stone-950/40">
      <div className="max-w-4xl mx-auto text-center">
        {/* Section header */}
        <div className="flex items-center justify-center gap-2 text-xs sm:text-sm font-medium text-rose-300/80 mb-3 tracking-wider uppercase">
          <span>Khwaab & Duayein</span>
          <span aria-hidden="true">·</span>
          <span>Cake & Candle Moment</span>
        </div>

        <h2 className="text-3xl sm:text-4xl md:text-5xl font-serif font-bold text-stone-100 mb-4">
          Ek Dua Maango, <span className="font-script text-rose-400 font-normal text-4xl sm:text-5xl">{wifeName}</span>
        </h2>
        <p className="text-stone-300 text-sm sm:text-base max-w-xl mx-auto mb-10 font-light">
          Aankhein band karke dil se apni sab se badi khwahish maango, aur mombattiyan bujha kar apna pyara din celebrate karo.
        </p>

        {/* Cake Container */}
        <div className="relative max-w-lg mx-auto bg-stone-900/60 backdrop-blur-md border border-rose-900/30 rounded-3xl p-8 sm:p-12 shadow-2xl flex flex-col items-center">
          {/* Subtle Ambient Cake Glow */}
          <div
            className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 rounded-full blur-3xl transition-opacity duration-1000 pointer-events-none ${
              candlesBlown ? 'opacity-10 bg-rose-950' : 'opacity-40 bg-amber-500/20'
            }`}
          />

          {/* SVG / Styled Birthday Cake */}
          <div className="relative w-64 h-56 flex flex-col items-center justify-end select-none">
            {/* Candles Area */}
            <div className="flex items-end justify-center gap-6 mb-1 z-20">
              {[0, 1, 2].map((idx) => (
                <div key={idx} className="flex flex-col items-center">
                  {/* Flame */}
                  {!candlesBlown ? (
                    <div className="w-3.5 h-6 bg-gradient-to-t from-amber-500 via-amber-300 to-yellow-100 rounded-full animate-flame shadow-[0_0_15px_#fbbf24] transition-opacity" />
                  ) : (
                    <div className="w-1.5 h-4 flex flex-col items-center justify-center opacity-60">
                      {/* Gentle smoke wisp */}
                      <span className="w-1 h-3 bg-stone-400 rounded-full blur-[1px] animate-pulse" />
                    </div>
                  )}
                  {/* Candle Wick */}
                  <div className="w-0.5 h-2 bg-stone-700" />
                  {/* Candle Stick */}
                  <div className="w-3 h-10 bg-gradient-to-b from-rose-200 via-rose-300 to-rose-400 rounded-sm shadow-inner border border-rose-100/30" />
                </div>
              ))}
            </div>

            {/* Cake Top Tier */}
            <div className="relative w-36 h-14 bg-gradient-to-r from-rose-400 via-rose-300 to-rose-400 rounded-t-2xl shadow-md border-t border-rose-200/50 flex items-center justify-center z-10">
              {/* Icing drips */}
              <div className="absolute top-0 inset-x-0 h-3 bg-rose-100/80 rounded-t-2xl flex justify-around">
                <span className="w-2 h-4 bg-rose-100/80 rounded-b-full"></span>
                <span className="w-2.5 h-5 bg-rose-100/80 rounded-b-full"></span>
                <span className="w-2 h-3 bg-rose-100/80 rounded-b-full"></span>
                <span className="w-2.5 h-4 bg-rose-100/80 rounded-b-full"></span>
              </div>
              <span className="text-[10px] uppercase font-bold tracking-widest text-rose-950/70 pt-2">
                Pure Love
              </span>
            </div>

            {/* Cake Bottom Tier */}
            <div className="relative w-56 h-20 bg-gradient-to-r from-rose-600 via-rose-500 to-rose-600 rounded-t-2xl shadow-xl border-t border-rose-300/40 flex flex-col items-center justify-center z-10">
              {/* Decorative frosting piping */}
              <div className="absolute top-0 inset-x-0 h-4 bg-rose-200/90 rounded-t-2xl flex justify-around">
                {[...Array(7)].map((_, i) => (
                  <span key={i} className="w-3 h-3 bg-rose-200 rounded-full -mt-1 shadow-sm"></span>
                ))}
              </div>

              {/* Cake slice cut indicator */}
              {cakeCut && (
                <div className="absolute inset-y-0 right-12 w-10 bg-rose-950/70 backdrop-blur-sm border-l border-r border-rose-300/30 flex items-center justify-center">
                  <span className="text-[10px] text-amber-200 font-semibold rotate-90 whitespace-nowrap">
                    Sweet Slice
                  </span>
                </div>
              )}

              <div className="mt-2 text-center">
                <p className="text-xs font-serif font-semibold text-rose-100 tracking-wider">
                  Salgirah Mubarak
                </p>
                <p className="text-[10px] text-rose-200/80 font-sans">
                  {wifeName}
                </p>
              </div>
            </div>

            {/* Cake Stand / Golden Plate */}
            <div className="w-64 h-4 bg-gradient-to-r from-amber-600 via-amber-300 to-amber-700 rounded-full shadow-lg border border-amber-200/40 z-10" />
            <div className="w-20 h-4 bg-gradient-to-b from-amber-500 to-amber-700 rounded-b-lg shadow-sm z-10" />
          </div>

          {/* Interactive Action Buttons */}
          <div className="mt-8 flex flex-wrap items-center justify-center gap-3 w-full">
            {!candlesBlown ? (
              <button
                onClick={handleBlowCandles}
                type="button"
                className="flex items-center gap-2 px-6 py-3 text-sm font-semibold text-stone-900 bg-gradient-to-r from-amber-300 via-amber-200 to-yellow-400 hover:from-amber-200 hover:to-yellow-300 rounded-full shadow-lg shadow-amber-400/20 transition-all hover:scale-105 active:scale-95 cursor-pointer"
              >
                <Wind className="w-4 h-4 text-stone-900" />
                <span>Make a Wish & Blow Candles</span>
              </button>
            ) : (
              <div className="flex flex-wrap items-center justify-center gap-3">
                {!cakeCut ? (
                  <button
                    onClick={handleCutCake}
                    type="button"
                    className="flex items-center gap-2 px-6 py-3 text-sm font-semibold text-white bg-rose-600 hover:bg-rose-500 rounded-full shadow-lg shadow-rose-900/50 transition-all hover:scale-105 active:scale-95 cursor-pointer"
                  >
                    <Utensils className="w-4 h-4" />
                    <span>Cut The Cake Together</span>
                  </button>
                ) : (
                  <div className="flex items-center gap-2 px-4 py-2 bg-rose-950/40 border border-rose-800/40 rounded-full text-rose-200 text-xs font-medium">
                    <Heart className="w-3.5 h-3.5 text-rose-400 fill-rose-400" />
                    <span>Pehla piece sirf tumhare liye!</span>
                  </div>
                )}

                <button
                  onClick={handleRelight}
                  type="button"
                  className="flex items-center gap-1.5 px-4 py-2 text-xs font-medium text-stone-400 hover:text-stone-200 bg-stone-950/40 hover:bg-stone-950 border border-stone-800 rounded-full transition-all cursor-pointer"
                >
                  <RotateCcw className="w-3 h-3" />
                  <span>Relight Candles</span>
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Wish Revealed Modal / Card */}
        {showWishModal && (
          <div className="mt-8 max-w-xl mx-auto p-6 bg-gradient-to-b from-stone-900/90 to-stone-950/90 border border-rose-500/40 rounded-2xl shadow-xl shadow-rose-950/60 animate-in fade-in zoom-in-95 duration-300">
            <div className="flex items-center justify-center gap-2 text-amber-300 mb-2">
              <Sparkles className="w-4 h-4" />
              <span className="text-xs uppercase tracking-widest font-semibold">Dua Qubool Ho</span>
              <Sparkles className="w-4 h-4" />
            </div>
            <h3 className="text-xl font-serif font-bold text-stone-100 mb-2">
              Tumhari Har Khwahish Pura Ho, Meri Jaan!
            </h3>
            <p className="text-sm text-stone-300 leading-relaxed font-light">
              "Allah kare ke jo dua aaj tumne is mombatti ko bujhate waqt apne dil mein maangi hai, woh tumhari qismat mein sab se behtar andaaz mein qubool ho jaye. Meri har dua mein pehla naam hamesha tumhara hai."
            </p>
          </div>
        )}
      </div>
    </section>
  );
};

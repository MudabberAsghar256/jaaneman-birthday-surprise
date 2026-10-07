import React, { useState, useEffect } from 'react';
import { Heart, Sparkles, Cake, Mail, Calendar, Clock } from 'lucide-react';
import confetti from 'canvas-confetti';

interface HeroCountdownProps {
  wifeName: string;
  birthdayDate: string;
  onBlowCandlesClick: () => void;
  onReadLetterClick: () => void;
}

interface TimeRemaining {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
  isPassed: boolean;
}

export const HeroCountdown: React.FC<HeroCountdownProps> = ({
  wifeName,
  birthdayDate,
  onBlowCandlesClick,
  onReadLetterClick,
}) => {
  const [timeLeft, setTimeLeft] = useState<TimeRemaining>({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
    isPassed: false,
  });

  useEffect(() => {
    const calculateTime = () => {
      const target = new Date(birthdayDate).getTime();
      const now = new Date().getTime();
      const difference = target - now;

      if (difference <= 0) {
        setTimeLeft({
          days: 0,
          hours: 0,
          minutes: 0,
          seconds: 0,
          isPassed: true,
        });
      } else {
        const days = Math.floor(difference / (1000 * 60 * 60 * 24));
        const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((difference % (1000 * 60)) / 1000);

        setTimeLeft({
          days,
          hours,
          minutes,
          seconds,
          isPassed: false,
        });
      }
    };

    calculateTime();
    const interval = setInterval(calculateTime, 1000);
    return () => clearInterval(interval);
  }, [birthdayDate]);

  const triggerHeartBurst = () => {
    confetti({
      particleCount: 40,
      spread: 60,
      origin: { y: 0.6 },
      colors: ['#f43f5e', '#fb7185', '#fda4af', '#fbbf24'],
    });
  };

  return (
    <section id="countdown" className="relative min-h-[92vh] flex items-center justify-center overflow-hidden py-16 px-4 sm:px-6 lg:px-8">
      {/* Background ambient radial glow */}
      <div className="absolute inset-0 bg-radial from-rose-900/25 via-stone-950/90 to-stone-950 pointer-events-none" />
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[600px] h-[350px] bg-rose-600/10 rounded-full blur-3xl pointer-events-none" />

      {/* Floating subtle romantic hearts */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden opacity-30">
        <span className="absolute top-[12%] left-[10%] text-rose-400 text-xl animate-float">❤️</span>
        <span className="absolute top-[28%] right-[15%] text-rose-300 text-sm animate-float [animation-delay:1.5s]">✨</span>
        <span className="absolute bottom-[20%] left-[18%] text-rose-400 text-lg animate-float [animation-delay:3s]">💖</span>
        <span className="absolute bottom-[25%] right-[22%] text-rose-300 text-2xl animate-float [animation-delay:2s]">🌹</span>
      </div>

      <div className="relative z-10 max-w-4xl mx-auto text-center flex flex-col items-center">
        {/* Unboxed Metadata Header */}
        <div className="flex items-center gap-2.5 text-xs sm:text-sm font-medium text-rose-300/80 mb-4 tracking-wider uppercase">
          <span>Khusoosi Tohfa</span>
          <span aria-hidden="true">·</span>
          <span>Salgirah Mubarak</span>
          <span aria-hidden="true">·</span>
          <span>Meri Humsafar</span>
        </div>

        {/* Display Headline */}
        <h1 className="text-4xl sm:text-6xl md:text-7xl font-serif font-bold text-stone-100 tracking-tight leading-[1.1] mb-4 text-balance">
          Salgirah Mubarak,{' '}
          <span className="font-script font-normal text-rose-400 italic block sm:inline mt-1 sm:mt-0 text-5xl sm:text-7xl md:text-8xl">
            {wifeName}
          </span>
        </h1>

        {/* Heartfelt Emotional Sub-Prose in Roman Urdu */}
        <p className="text-base sm:text-lg md:text-xl text-stone-300 font-sans max-w-2xl mx-auto mb-10 leading-relaxed font-light text-balance">
          "Tum meri zindagi ka sab se khoobsurat moajza ho. Tumhara hona hi meri har subah ki umeed aur meri har raat ka sukoon hai."
        </p>

        {/* Live Countdown Clock or Celebration Banner */}
        <div className="w-full max-w-2xl bg-stone-900/60 backdrop-blur-md border border-rose-900/30 rounded-2xl p-6 sm:p-8 mb-10 shadow-2xl shadow-rose-950/40">
          <div className="flex items-center justify-center gap-2 text-xs uppercase tracking-widest text-rose-400 font-semibold mb-6">
            <Clock className="w-4 h-4 text-rose-400" />
            <span>{timeLeft.isPassed ? "Jashn-e-Viladat Shuru Ho Chuka Hai!" : "Countdown To The Special Moment"}</span>
          </div>

          {timeLeft.isPassed ? (
            <div className="py-3 text-center">
              <p className="text-2xl sm:text-3xl font-serif text-amber-200 font-semibold mb-2">
                🎉 Aaj Ka Din Sirf Tumhara Hai! 🎂
              </p>
              <p className="text-sm text-stone-300 max-w-md mx-auto">
                Dua hai ke aane wala saal tumhari zindagi mein be-panah muskurahatein aur barkat lekar aaye.
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-4 gap-2 sm:gap-4 text-center">
              {/* Days */}
              <div className="flex flex-col items-center bg-stone-950/50 rounded-xl p-3 sm:p-4 border border-rose-950/50">
                <span className="text-2xl sm:text-4xl md:text-5xl font-mono font-bold text-rose-200 tabular-nums">
                  {String(timeLeft.days).padStart(2, '0')}
                </span>
                <span className="text-[11px] sm:text-xs text-stone-400 mt-1 uppercase tracking-wider">Dina</span>
              </div>

              {/* Hours */}
              <div className="flex flex-col items-center bg-stone-950/50 rounded-xl p-3 sm:p-4 border border-rose-950/50">
                <span className="text-2xl sm:text-4xl md:text-5xl font-mono font-bold text-rose-200 tabular-nums">
                  {String(timeLeft.hours).padStart(2, '0')}
                </span>
                <span className="text-[11px] sm:text-xs text-stone-400 mt-1 uppercase tracking-wider">Ghantay</span>
              </div>

              {/* Minutes */}
              <div className="flex flex-col items-center bg-stone-950/50 rounded-xl p-3 sm:p-4 border border-rose-950/50">
                <span className="text-2xl sm:text-4xl md:text-5xl font-mono font-bold text-rose-200 tabular-nums">
                  {String(timeLeft.minutes).padStart(2, '0')}
                </span>
                <span className="text-[11px] sm:text-xs text-stone-400 mt-1 uppercase tracking-wider">Minute</span>
              </div>

              {/* Seconds */}
              <div className="flex flex-col items-center bg-stone-950/50 rounded-xl p-3 sm:p-4 border border-rose-950/50">
                <span className="text-2xl sm:text-4xl md:text-5xl font-mono font-bold text-amber-300 tabular-nums">
                  {String(timeLeft.seconds).padStart(2, '0')}
                </span>
                <span className="text-[11px] sm:text-xs text-stone-400 mt-1 uppercase tracking-wider">Second</span>
              </div>
            </div>
          )}
        </div>

        {/* Primary Action Buttons */}
        <div className="flex flex-wrap items-center justify-center gap-4">
          <button
            onClick={onBlowCandlesClick}
            type="button"
            className="flex items-center gap-2 px-6 py-3 text-sm font-semibold text-white bg-rose-600 hover:bg-rose-500 rounded-full shadow-lg shadow-rose-900/50 hover:shadow-rose-700/60 transition-all hover:scale-105 active:scale-95 cursor-pointer"
          >
            <Cake className="w-4 h-4" />
            <span>Blow The Candles & Cut Cake</span>
          </button>

          <button
            onClick={onReadLetterClick}
            type="button"
            className="flex items-center gap-2 px-6 py-3 text-sm font-semibold text-stone-200 bg-stone-900/80 hover:bg-stone-800 border border-rose-900/40 hover:border-rose-700/60 rounded-full transition-all hover:scale-105 active:scale-95 cursor-pointer"
          >
            <Mail className="w-4 h-4 text-rose-400" />
            <span>Read Emotional Love Letter</span>
          </button>

          <button
            onClick={triggerHeartBurst}
            type="button"
            className="flex items-center gap-2 px-4 py-3 text-sm font-medium text-rose-300 hover:text-rose-200 bg-rose-950/30 hover:bg-rose-950/50 border border-rose-900/30 rounded-full transition-all cursor-pointer"
            title="Send love burst"
          >
            <Heart className="w-4 h-4 text-rose-400 fill-rose-400" />
            <span>Send Love</span>
          </button>
        </div>
      </div>
    </section>
  );
};

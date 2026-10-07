import React, { useState } from 'react';
import {
  Smile,
  Home,
  Heart,
  Sparkles,
  ShieldCheck,
  Coffee,
  Flower2,
  Moon,
  Sun,
  Infinity,
  ChevronDown,
} from 'lucide-react';
import { REASONS_LIST } from '../utils/storage';
import { ReasonCard } from '../types';

interface ReasonsWhyProps {
  wifeName: string;
}

const ICON_MAP: Record<string, React.ReactNode> = {
  Smile: <Smile className="w-5 h-5 text-rose-400" />,
  Home: <Home className="w-5 h-5 text-amber-400" />,
  Heart: <Heart className="w-5 h-5 text-rose-500 fill-rose-500/20" />,
  Sparkles: <Sparkles className="w-5 h-5 text-yellow-300" />,
  ShieldCheck: <ShieldCheck className="w-5 h-5 text-emerald-400" />,
  Coffee: <Coffee className="w-5 h-5 text-amber-300" />,
  Flower2: <Flower2 className="w-5 h-5 text-rose-300" />,
  Moon: <Moon className="w-5 h-5 text-indigo-300" />,
  Sun: <Sun className="w-5 h-5 text-amber-400" />,
  Infinity: <Infinity className="w-5 h-5 text-rose-400" />,
};

export const ReasonsWhy: React.FC<ReasonsWhyProps> = ({ wifeName }) => {
  const [expandedId, setExpandedId] = useState<number | null>(null);

  const toggleExpand = (id: number) => {
    setExpandedId((prev) => (prev === id ? null : id));
  };

  return (
    <section id="reasons" className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      {/* Section Header */}
      <div className="text-center mb-12">
        <div className="flex items-center justify-center gap-2 text-xs sm:text-sm font-medium text-rose-300/80 mb-2 uppercase tracking-wider">
          <span>Mohabbat Ki Wajah</span>
          <span aria-hidden="true">·</span>
          <span>10 Reasons Why</span>
          <span aria-hidden="true">·</span>
          <span>Dil Ke Raaz</span>
        </div>
        <h2 className="text-3xl sm:text-4xl font-serif font-bold text-stone-100 mb-3">
          10 Baatein Jo Tumhein Meri Jaan Banati Hain
        </h2>
        <p className="text-stone-300 text-sm sm:text-base font-light max-w-xl mx-auto">
          Wese toh tumse mohabbat karne ke hazaron sabab hain, lekin yeh 10 baatein mere dil ke sab se qareeb hain.
        </p>
      </div>

      {/* Grid of Reasons */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {REASONS_LIST.map((item: ReasonCard) => {
          const isExpanded = expandedId === item.id;
          return (
            <div
              key={item.id}
              onClick={() => toggleExpand(item.id)}
              className={`group bg-stone-900/40 hover:bg-stone-900/80 border border-stone-800 hover:border-rose-900/50 rounded-2xl p-5 sm:p-6 transition-all duration-200 cursor-pointer flex flex-col justify-between ${
                isExpanded ? 'border-rose-700/60 shadow-lg shadow-rose-950/40' : ''
              }`}
            >
              <div>
                {/* Header with human editorial numbering */}
                <div className="flex items-center justify-between mb-4">
                  <span className="font-mono text-xs text-rose-400 font-bold tabular-nums">
                    {String(item.id).padStart(2, '0')}.
                  </span>
                  <div className="p-2 rounded-xl bg-stone-950/60 border border-stone-800/80">
                    {ICON_MAP[item.iconName] || <Heart className="w-5 h-5 text-rose-400" />}
                  </div>
                </div>

                {/* Roman Urdu Title & English Subtitle */}
                <h3 className="text-lg font-serif font-bold text-stone-100 group-hover:text-rose-200 transition-colors mb-1">
                  {item.romanTitle}
                </h3>
                <span className="text-xs text-stone-400 block mb-3 font-sans">
                  {item.title}
                </span>

                {/* Emotional Description */}
                <p className="text-sm text-stone-300 font-light leading-relaxed">
                  "{item.description}"
                </p>
              </div>

              {/* Expand hint */}
              <div className="mt-4 pt-3 border-t border-stone-800/50 flex items-center justify-between text-[11px] text-stone-500">
                <span>Dil Ka Ehsaas</span>
                <ChevronDown
                  className={`w-3.5 h-3.5 transition-transform duration-200 ${
                    isExpanded ? 'rotate-180 text-rose-400' : ''
                  }`}
                />
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
};

import React from 'react';
import { Heart, ArrowUp } from 'lucide-react';

interface FooterProps {
  wifeName: string;
  husbandName: string;
}

export const Footer: React.FC<FooterProps> = ({ wifeName, husbandName }) => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="border-t border-stone-800/80 bg-stone-950 py-12 px-4 sm:px-6 lg:px-8 text-stone-400">
      <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-6">
        <div className="flex flex-col items-center sm:items-start text-center sm:text-left">
          <span className="font-serif text-lg font-bold text-stone-200 tracking-tight">
            Jaaneman
          </span>
          <p className="text-xs text-stone-500 mt-1 flex items-center gap-1.5">
            <span>Banaaya gaya sirf {wifeName} ke liye</span>
            <span aria-hidden="true">·</span>
            <span className="flex items-center gap-1 text-rose-400">
              <Heart className="w-3 h-3 fill-rose-500" />
              <span>be-panah mohabbat ke saath</span>
            </span>
          </p>
        </div>

        <div className="flex items-center gap-4 text-xs">
          <span className="text-stone-500">Faqat: {husbandName}</span>
          <button
            onClick={scrollToTop}
            type="button"
            className="flex items-center gap-1 px-3 py-1.5 rounded-full bg-stone-900 hover:bg-stone-800 text-stone-300 transition-colors cursor-pointer"
          >
            <span>Back to top</span>
            <ArrowUp className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </footer>
  );
};

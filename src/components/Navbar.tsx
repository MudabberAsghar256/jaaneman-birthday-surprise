import React from 'react';
import { Volume2, VolumeX, SlidersHorizontal, Lock } from 'lucide-react';

interface NavbarProps {
  wifeName: string;
  isMusicPlaying: boolean;
  onToggleMusic: () => void;
  onOpenCustomize: () => void;
  onLock: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  wifeName,
  isMusicPlaying,
  onToggleMusic,
  onOpenCustomize,
  onLock,
}) => {
  return (
    <header className="sticky top-0 z-40 w-full backdrop-blur-md bg-stone-950/75 border-b border-rose-900/20 transition-all">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        {/* Zone 1: Single text element wordmark */}
        <a
          href="#"
          className="text-xl sm:text-2xl font-serif font-bold tracking-tight bg-gradient-to-r from-rose-200 via-rose-300 to-amber-200 bg-clip-text text-transparent hover:opacity-90 transition-opacity"
        >
          Jaaneman
        </a>

        {/* Zone 2: Clean text navigation links */}
        <nav className="hidden lg:flex items-center gap-6 text-sm font-medium text-stone-300">
          <a href="#birthday-video" className="hover:text-rose-300 transition-colors">
            Video Wish
          </a>
          <a href="#sweet-talks" className="hover:text-rose-300 transition-colors">
            Achi Achi Baatein
          </a>
          <a href="#celebration" className="hover:text-rose-300 transition-colors">
            Cake & Candle
          </a>
          <a href="#memories" className="hover:text-rose-300 transition-colors">
            Photo Album
          </a>
          <a href="#letters" className="hover:text-rose-300 transition-colors">
            Love Letter
          </a>
        </nav>

        {/* Zone 3: Primary interactive actions */}
        <div className="flex items-center gap-2.5">
          <button
            onClick={onToggleMusic}
            type="button"
            className={`flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium rounded-full transition-all border whitespace-nowrap cursor-pointer ${
              isMusicPlaying
                ? 'bg-rose-500/20 border-rose-500/40 text-rose-200 shadow-[0_0_15px_rgba(244,63,94,0.25)]'
                : 'bg-stone-900/60 border-stone-800 text-stone-400 hover:text-stone-200 hover:border-stone-700'
            }`}
            title={isMusicPlaying ? 'Pause romantic soundtrack' : 'Play romantic soundtrack'}
          >
            {isMusicPlaying ? (
              <>
                <Volume2 className="w-3.5 h-3.5 text-rose-400 animate-pulse" />
                <span className="hidden sm:inline">Melody</span>
              </>
            ) : (
              <>
                <VolumeX className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">Melody</span>
              </>
            )}
          </button>

          <button
            onClick={onOpenCustomize}
            type="button"
            className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold rounded-full bg-gradient-to-r from-rose-600 to-rose-700 hover:from-rose-500 hover:to-rose-600 text-white shadow-sm transition-all whitespace-nowrap cursor-pointer"
          >
            <SlidersHorizontal className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Settings</span>
          </button>

          <button
            onClick={onLock}
            type="button"
            className="flex items-center gap-1 px-2.5 py-1.5 text-xs font-medium text-stone-400 hover:text-rose-300 bg-stone-900/50 hover:bg-stone-800 border border-stone-800 rounded-full transition-colors cursor-pointer"
            title="Lock Surprise / View Login Screen"
          >
            <Lock className="w-3.5 h-3.5" />
            <span className="hidden md:inline">Lock</span>
          </button>
        </div>
      </div>
    </header>
  );
};

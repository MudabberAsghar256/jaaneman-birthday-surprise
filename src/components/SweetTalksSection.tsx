import React, { useState } from 'react';
import { Heart, MessageCircleHeart, Sparkles, Volume2, Play, Pause, ChevronRight, Bookmark } from 'lucide-react';
import { SWEET_TALKS, VOICE_NOTES } from '../utils/storage';
import { SweetTalk, VoiceNoteItem } from '../types';

interface SweetTalksSectionProps {
  wifeName: string;
  husbandName: string;
}

export const SweetTalksSection: React.FC<SweetTalksSectionProps> = ({ wifeName, husbandName }) => {
  const [selectedTalk, setSelectedTalk] = useState<SweetTalk>(SWEET_TALKS[0]);
  const [playingVoiceNoteId, setPlayingVoiceNoteId] = useState<string | null>(null);

  const handlePlayVoiceNote = (note: VoiceNoteItem) => {
    if (typeof window === 'undefined') return;

    if (playingVoiceNoteId === note.id) {
      if ('speechSynthesis' in window) {
        window.speechSynthesis.cancel();
      }
      setPlayingVoiceNoteId(null);
      return;
    }

    setPlayingVoiceNoteId(note.id);

    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
      const utterance = new SpeechSynthesisUtterance(note.romanAudioNote);
      utterance.rate = 0.86;
      utterance.pitch = 0.95;
      utterance.onend = () => setPlayingVoiceNoteId(null);
      utterance.onerror = () => setPlayingVoiceNoteId(null);
      window.speechSynthesis.speak(utterance);
    } else {
      setTimeout(() => setPlayingVoiceNoteId(null), 3000);
    }
  };

  return (
    <section id="sweet-talks" className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      {/* Header */}
      <div className="text-center mb-14">
        <div className="flex items-center justify-center gap-2 text-xs sm:text-sm font-medium text-rose-300/80 mb-2 uppercase tracking-wider">
          <MessageCircleHeart className="w-4 h-4 text-rose-400" />
          <span>Dil Se Dil Tak</span>
          <span aria-hidden="true">·</span>
          <span>Achi Achi Baatein</span>
          <span aria-hidden="true">·</span>
          <span>Heart-To-Heart</span>
        </div>
        <h2 className="text-3xl sm:text-5xl font-serif font-bold text-stone-100 mb-3">
          Meri Dil Ki Achi Achi Baatein
        </h2>
        <p className="text-stone-300 text-sm sm:text-base font-light max-w-xl mx-auto">
          Woh pyari baatein jo aam dino mein zuban par nahi aati, aaj tumhare is khaas din par sab kuch keh dena chahta hoon.
        </p>
      </div>

      {/* Main Split Layout: Left is list of romantic topics, Right is open expanded letter */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Column: Topics Selector (5 cols) */}
        <div className="lg:col-span-5 space-y-3">
          <div className="text-xs uppercase tracking-wider text-stone-500 font-semibold mb-2 px-1">
            Choose A Topic To Read:
          </div>
          {SWEET_TALKS.map((talk) => {
            const isSelected = selectedTalk.id === talk.id;
            return (
              <div
                key={talk.id}
                onClick={() => setSelectedTalk(talk)}
                className={`p-4 rounded-2xl border transition-all cursor-pointer flex items-center justify-between ${
                  isSelected
                    ? 'bg-rose-950/40 border-rose-600/70 shadow-lg shadow-rose-950/50'
                    : 'bg-stone-900/40 hover:bg-stone-900/80 border-stone-800 text-stone-300'
                }`}
              >
                <div className="flex items-start gap-3">
                  <div
                    className={`p-2 rounded-xl mt-0.5 ${
                      isSelected ? 'bg-rose-600 text-white' : 'bg-stone-950 text-stone-400'
                    }`}
                  >
                    <Bookmark className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="text-[11px] uppercase tracking-wider font-semibold text-rose-400 block mb-0.5">
                      {talk.tag}
                    </span>
                    <h4 className="text-sm font-serif font-semibold text-stone-100">
                      {talk.romanTitle}
                    </h4>
                    <p className="text-xs text-stone-400 line-clamp-1 mt-1 font-sans font-light">
                      "{talk.quote}"
                    </p>
                  </div>
                </div>

                <ChevronRight
                  className={`w-4 h-4 transition-transform ${
                    isSelected ? 'text-rose-400 translate-x-1' : 'text-stone-600'
                  }`}
                />
              </div>
            );
          })}

          {/* Voice Notes Subsection */}
          <div className="pt-6">
            <div className="text-xs uppercase tracking-wider text-rose-400 font-semibold mb-3 px-1 flex items-center gap-1.5">
              <Volume2 className="w-3.5 h-3.5" />
              <span>Voice Notes From Your Husband:</span>
            </div>

            <div className="space-y-2.5">
              {VOICE_NOTES.map((note) => {
                const isPlaying = playingVoiceNoteId === note.id;
                return (
                  <div
                    key={note.id}
                    className="p-3.5 bg-stone-900/60 border border-stone-800 rounded-xl flex items-center justify-between"
                  >
                    <div className="flex items-center gap-3">
                      <button
                        onClick={() => handlePlayVoiceNote(note)}
                        type="button"
                        className={`w-9 h-9 rounded-full flex items-center justify-center transition-transform hover:scale-105 active:scale-95 cursor-pointer ${
                          isPlaying ? 'bg-rose-600 text-white shadow-md' : 'bg-stone-800 text-stone-200 hover:bg-stone-700'
                        }`}
                        title="Play audio voice note"
                      >
                        {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4 fill-current ml-0.5" />}
                      </button>

                      <div>
                        <div className="text-xs font-semibold text-stone-200">
                          {note.title}
                        </div>
                        <div className="flex items-center gap-1.5 mt-0.5">
                          {/* Animated Waveform */}
                          <div className="flex items-end gap-0.5 h-3">
                            <span className={`w-0.5 bg-rose-400 rounded-full ${isPlaying ? 'h-3 animate-pulse' : 'h-1'}`} />
                            <span className={`w-0.5 bg-rose-400 rounded-full ${isPlaying ? 'h-2 animate-pulse delay-75' : 'h-2'}`} />
                            <span className={`w-0.5 bg-rose-400 rounded-full ${isPlaying ? 'h-3.5 animate-pulse delay-150' : 'h-1.5'}`} />
                            <span className={`w-0.5 bg-rose-400 rounded-full ${isPlaying ? 'h-2.5 animate-pulse delay-100' : 'h-2'}`} />
                          </div>
                          <span className="text-[10px] text-stone-500 font-mono">
                            {note.duration}
                          </span>
                        </div>
                      </div>
                    </div>

                    <span className="text-[10px] text-stone-400 italic max-w-[120px] truncate text-right">
                      {isPlaying ? 'Playing...' : note.transcription}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Right Column: Expanded Open Letter (7 cols) */}
        <div className="lg:col-span-7 bg-stone-900/60 backdrop-blur-md border border-rose-900/40 rounded-3xl p-6 sm:p-10 shadow-2xl relative min-h-[460px] flex flex-col justify-between">
          {/* Subtle Top corner heart */}
          <div className="absolute top-6 right-6 p-2 rounded-full bg-rose-950/40 border border-rose-800/40 text-rose-400">
            <Heart className="w-5 h-5 fill-rose-500 text-rose-500" />
          </div>

          <div>
            {/* Tag & Title */}
            <div className="border-b border-stone-800 pb-5 mb-6">
              <span className="text-xs uppercase tracking-widest font-semibold text-rose-400 block mb-1">
                Khaas Paighaam · {selectedTalk.tag}
              </span>
              <h3 className="text-2xl sm:text-3xl font-serif font-bold text-stone-100">
                {selectedTalk.romanTitle}
              </h3>
              <p className="text-xs text-stone-400 font-sans mt-1">
                Written with all my heart for {wifeName}
              </p>
            </div>

            {/* Romantic Highlight Quote */}
            <blockquote className="bg-rose-950/20 border-l-2 border-rose-500 p-4 rounded-r-xl mb-6 font-serif italic text-rose-200 text-base sm:text-lg">
              "{selectedTalk.quote}"
            </blockquote>

            {/* Full Message Body */}
            <div className="text-stone-200 text-sm sm:text-base leading-relaxed font-sans font-light space-y-4">
              <p>{selectedTalk.fullMessage}</p>
            </div>
          </div>

          {/* Footer Signature */}
          <div className="mt-8 pt-5 border-t border-stone-800 flex items-center justify-between">
            <span className="text-xs text-stone-500 uppercase tracking-wider">
              Har Sans Tumhare Naam
            </span>
            <span className="font-script text-3xl text-rose-400">
              — {husbandName}
            </span>
          </div>
        </div>
      </div>
    </section>
  );
};

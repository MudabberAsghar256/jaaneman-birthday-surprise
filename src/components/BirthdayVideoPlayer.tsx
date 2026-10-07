import React, { useState, useEffect, useRef } from 'react';
import { Play, Pause, RotateCcw, Volume2, VolumeX, Upload, Film, Heart, Sparkles } from 'lucide-react';
import { romanticAudio } from '../utils/audio';

interface BirthdayVideoPlayerProps {
  wifeName: string;
  husbandName: string;
  customVideoUrl?: string;
  videoTitle?: string;
  onUpdateVideoUrl: (url: string) => void;
}

const CINEMATIC_SCENES = [
  {
    image: '/src/assets/images/hero_romantic_surprise_1791351078392.jpg',
    caption: 'Salgirah Mubarak Meri Jaan — Aaj Ka Din Sirf Tumhare Naam',
    subtext: 'Har dua mein pehla naam hamesha tumhara hota hai.',
    duration: 5,
  },
  {
    image: '/src/assets/images/gallery_cherished_moment_1791351091079.jpg',
    caption: 'Tumhara Haath Thaam Kar Chalna Meri Zindagi Ka Inaam Hai',
    subtext: 'Har khushi, har dhoop chaaon mein hum dono hamesha sath hain.',
    duration: 5,
  },
  {
    image: '/src/assets/images/gallery_roses_gift_1791351101691.jpg',
    caption: 'Gulab Bhi Tumhari Masoom Muskurahat Ke Samne Pheeke Hain',
    subtext: 'Tumhari ek halki si hansi mere saare gham mita deti hai.',
    duration: 5,
  },
  {
    image: '/src/assets/images/gallery_starlit_celebration_1791351111597.jpg',
    caption: 'Sitaron Se Bhari Is Raat Mein Meri Dua Hai Tum Hamesha Salamat Raho',
    subtext: 'Tum meri pehli aur aakhri mohabbat ho.',
    duration: 6,
  },
];

export const BirthdayVideoPlayer: React.FC<BirthdayVideoPlayerProps> = ({
  wifeName,
  husbandName,
  customVideoUrl,
  videoTitle = 'Hamari Yaadon Ki Birthday Reel',
  onUpdateVideoUrl,
}) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentSceneIndex, setCurrentSceneIndex] = useState(0);
  const [progress, setProgress] = useState(0);
  const [isMuted, setIsMuted] = useState(false);
  const [showUploadModal, setShowUploadModal] = useState(false);
  const [inputUrl, setInputUrl] = useState('');
  const timerRef = useRef<number | null>(null);

  // Total duration in seconds for built-in reel
  const totalDuration = CINEMATIC_SCENES.reduce((acc, s) => acc + s.duration, 0);

  useEffect(() => {
    if (isPlaying && !customVideoUrl) {
      timerRef.current = window.setInterval(() => {
        setProgress((prev) => {
          if (prev >= 100) {
            setIsPlaying(false);
            return 100;
          }
          const next = prev + 100 / (totalDuration * 10);
          // calculate scene
          const elapsedSeconds = (next / 100) * totalDuration;
          let accum = 0;
          for (let i = 0; i < CINEMATIC_SCENES.length; i++) {
            accum += CINEMATIC_SCENES[i].duration;
            if (elapsedSeconds <= accum) {
              setCurrentSceneIndex(i);
              break;
            }
          }
          return next;
        });
      }, 100);
    } else {
      if (timerRef.current) clearInterval(timerRef.current);
    }

    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [isPlaying, customVideoUrl, totalDuration]);

  const handlePlayToggle = () => {
    if (progress >= 100) {
      setProgress(0);
      setCurrentSceneIndex(0);
    }
    const nextState = !isPlaying;
    setIsPlaying(nextState);

    // Play/stop background soundtrack synced with video
    if (nextState) {
      romanticAudio.startMusic();
    }
  };

  const handleRestart = () => {
    setProgress(0);
    setCurrentSceneIndex(0);
    setIsPlaying(true);
    romanticAudio.startMusic();
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const url = URL.createObjectURL(file);
      onUpdateVideoUrl(url);
      setShowUploadModal(false);
    }
  };

  const handleSaveUrl = (e: React.FormEvent) => {
    e.preventDefault();
    if (inputUrl.trim()) {
      onUpdateVideoUrl(inputUrl.trim());
      setShowUploadModal(false);
      setInputUrl('');
    }
  };

  const currentScene = CINEMATIC_SCENES[currentSceneIndex];

  return (
    <section id="birthday-video" className="py-20 px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto">
      {/* Section Header */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-8 pb-4 border-b border-stone-800/80 gap-4">
        <div>
          <div className="flex items-center gap-2 text-xs sm:text-sm font-medium text-rose-300/80 mb-2 uppercase tracking-wider">
            <Film className="w-3.5 h-3.5 text-rose-400" />
            <span>Khaas Birthday Film</span>
            <span aria-hidden="true">·</span>
            <span>Cinematic Memories</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-serif font-bold text-stone-100">
            A Special Video Wish For {wifeName}
          </h2>
        </div>

        <button
          onClick={() => setShowUploadModal(true)}
          type="button"
          className="flex items-center gap-2 px-4 py-2 bg-stone-900 hover:bg-stone-800 border border-stone-700/60 rounded-full text-xs font-semibold text-rose-200 transition-colors self-start sm:self-auto cursor-pointer"
        >
          <Upload className="w-3.5 h-3.5 text-rose-400" />
          <span>Upload Custom Video</span>
        </button>
      </div>

      {/* Video Container Frame */}
      <div className="relative rounded-3xl overflow-hidden bg-stone-950 border border-rose-900/40 shadow-2xl shadow-rose-950/40 aspect-16/9 max-w-4xl mx-auto group">
        {customVideoUrl ? (
          // Custom HTML5 Video or Embed
          customVideoUrl.includes('youtube.com') || customVideoUrl.includes('youtu.be') ? (
            <iframe
              src={customVideoUrl.replace('watch?v=', 'embed/')}
              title="Birthday Video"
              className="w-full h-full"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />
          ) : (
            <video
              src={customVideoUrl}
              controls
              className="w-full h-full object-cover"
              poster="/src/assets/images/hero_romantic_surprise_1791351078392.jpg"
            />
          )
        ) : (
          // Built-in Cinematic Romantic Film Reel
          <div className="relative w-full h-full flex items-center justify-center">
            {/* Background image transition */}
            <img
              src={currentScene.image}
              alt="Romantic Scene"
              className="absolute inset-0 w-full h-full object-cover transition-opacity duration-1000 scale-105"
            />

            {/* Dark vignette & contrast scrim */}
            <div className="absolute inset-0 bg-gradient-to-t from-stone-950/90 via-stone-950/40 to-stone-950/50" />

            {/* Subtitles & Romantic Wish Captions */}
            <div className="absolute inset-x-0 bottom-20 px-6 sm:px-12 text-center z-10 transition-all duration-500">
              <span className="inline-block px-3 py-1 bg-rose-950/60 backdrop-blur-md rounded-full text-rose-300 text-xs font-medium uppercase tracking-widest mb-3 border border-rose-800/40">
                Scene {currentSceneIndex + 1} of {CINEMATIC_SCENES.length}
              </span>
              <h3 className="text-xl sm:text-3xl md:text-4xl font-serif font-bold text-stone-100 mb-2 drop-shadow-md">
                "{currentScene.caption}"
              </h3>
              <p className="text-xs sm:text-sm text-stone-300 font-light max-w-lg mx-auto">
                {currentScene.subtext}
              </p>
            </div>

            {/* Big Play Button Overlay when paused */}
            {!isPlaying && (
              <div
                onClick={handlePlayToggle}
                className="absolute inset-0 flex items-center justify-center z-20 cursor-pointer bg-stone-950/30 backdrop-blur-[2px] transition-colors"
              >
                <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-full bg-rose-600/90 hover:bg-rose-500 text-white flex items-center justify-center shadow-2xl shadow-rose-950/80 transition-transform hover:scale-110 active:scale-95 pl-1">
                  <Play className="w-8 h-8 sm:w-10 sm:h-10 fill-white" />
                </div>
              </div>
            )}

            {/* Cinematic Controls Bar */}
            <div className="absolute inset-x-0 bottom-0 p-4 bg-gradient-to-t from-stone-950 via-stone-950/80 to-transparent z-20 flex flex-col gap-2">
              {/* Progress Bar */}
              <div
                onClick={(e) => {
                  const rect = e.currentTarget.getBoundingClientRect();
                  const clickX = e.clientX - rect.left;
                  const newPct = (clickX / rect.width) * 100;
                  setProgress(newPct);
                }}
                className="w-full h-1.5 bg-stone-800/80 rounded-full overflow-hidden cursor-pointer group/bar"
              >
                <div
                  className="h-full bg-gradient-to-r from-rose-500 to-amber-400 transition-all duration-100"
                  style={{ width: `${progress}%` }}
                />
              </div>

              {/* Controls */}
              <div className="flex items-center justify-between text-xs text-stone-300 pt-1">
                <div className="flex items-center gap-3">
                  <button
                    onClick={handlePlayToggle}
                    type="button"
                    className="p-1.5 rounded-lg hover:bg-stone-800 text-white transition-colors"
                  >
                    {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4 fill-white" />}
                  </button>

                  <button
                    onClick={handleRestart}
                    type="button"
                    className="p-1.5 rounded-lg hover:bg-stone-800 text-stone-300 transition-colors"
                    title="Replay from start"
                  >
                    <RotateCcw className="w-4 h-4" />
                  </button>

                  <span className="font-mono text-[11px] text-stone-400 tabular-nums">
                    {Math.floor(((progress / 100) * totalDuration))}s / {totalDuration}s
                  </span>
                </div>

                <div className="flex items-center gap-2">
                  <span className="hidden sm:inline text-xs text-rose-300 font-serif italic">
                    Sirf {wifeName} ke liye
                  </span>
                  <button
                    onClick={() => {
                      setIsMuted(!isMuted);
                      if (!isMuted) romanticAudio.stopMusic();
                      else romanticAudio.startMusic();
                    }}
                    type="button"
                    className="p-1.5 rounded-lg hover:bg-stone-800 text-stone-300 transition-colors"
                  >
                    {isMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4 text-rose-400" />}
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Video Dedication Note */}
      <div className="mt-8 max-w-2xl mx-auto text-center p-6 bg-stone-900/40 border border-stone-800/80 rounded-2xl">
        <div className="flex items-center justify-center gap-2 text-rose-400 mb-2">
          <Heart className="w-4 h-4 fill-rose-500 text-rose-500" />
          <span className="text-xs font-semibold uppercase tracking-wider">A Husband's Dedication</span>
        </div>
        <p className="text-stone-300 text-sm font-light leading-relaxed">
          "Yeh video reel humare un haseen lamhaat ka aaina hai jo maine tumhare sath jiye hain. Har naya saal tumhare sath pehle se zyada khoobsurat ho, meri jaan!"
        </p>
        <span className="font-script text-2xl text-rose-400 block mt-2">
          — {husbandName}
        </span>
      </div>

      {/* Upload Custom Video Modal */}
      {showUploadModal && (
        <div
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 z-50 bg-stone-950/85 backdrop-blur-sm flex items-center justify-center p-4"
          onClick={() => setShowUploadModal(false)}
        >
          <div
            className="max-w-md w-full bg-stone-900 border border-stone-800 rounded-2xl p-6 shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <h3 className="text-lg font-serif font-bold text-stone-100 mb-2">
              Upload Ya Link Birthday Video
            </h3>
            <p className="text-xs text-stone-400 mb-4">
              Aap apne phone ya laptop se apni banayi hui birthday video file (MP4) upload kar sakte hain, ya direct YouTube video link paste karein.
            </p>

            <div className="space-y-4">
              <div>
                <label className="block text-xs font-medium text-stone-300 mb-1.5">
                  1. Choose Video File (Phone / PC)
                </label>
                <input
                  type="file"
                  accept="video/*"
                  onChange={handleFileUpload}
                  className="block w-full text-xs text-stone-400 file:mr-3 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-xs file:font-semibold file:bg-rose-950 file:text-rose-200 hover:file:bg-rose-900 cursor-pointer"
                />
              </div>

              <div className="flex items-center gap-2 text-xs text-stone-500 my-2">
                <span className="flex-1 h-px bg-stone-800" />
                <span>YA</span>
                <span className="flex-1 h-px bg-stone-800" />
              </div>

              <form onSubmit={handleSaveUrl}>
                <label className="block text-xs font-medium text-stone-300 mb-1.5">
                  2. Video URL Paste Karein (YouTube / MP4)
                </label>
                <div className="flex gap-2">
                  <input
                    type="url"
                    value={inputUrl}
                    onChange={(e) => setInputUrl(e.target.value)}
                    placeholder="https://www.youtube.com/watch?v=..."
                    className="flex-1 px-3 py-2 text-sm bg-stone-950 border border-stone-800 rounded-lg text-stone-200 focus:outline-none focus:border-rose-500"
                  />
                  <button
                    type="submit"
                    className="px-4 py-2 bg-rose-600 hover:bg-rose-500 text-white text-xs font-semibold rounded-lg"
                  >
                    Save Link
                  </button>
                </div>
              </form>

              {customVideoUrl && (
                <button
                  type="button"
                  onClick={() => {
                    onUpdateVideoUrl('');
                    setShowUploadModal(false);
                  }}
                  className="w-full text-xs text-stone-400 hover:text-stone-200 py-1"
                >
                  Reset to Built-in Romantic Reel
                </button>
              )}

              <div className="pt-2 flex justify-end">
                <button
                  type="button"
                  onClick={() => setShowUploadModal(false)}
                  className="px-4 py-1.5 text-xs text-stone-400 hover:text-stone-200"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

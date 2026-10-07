import React, { useState } from 'react';
import { Heart, Maximize2, X, Plus, Image as ImageIcon } from 'lucide-react';
import { MemoryPhoto } from '../types';

interface PhotoGalleryProps {
  photos: MemoryPhoto[];
  onAddPhoto: (photo: MemoryPhoto) => void;
}

export const PhotoGallery: React.FC<PhotoGalleryProps> = ({ photos, onAddPhoto }) => {
  const [activePhoto, setActivePhoto] = useState<MemoryPhoto | null>(null);
  const [likes, setLikes] = useState<Record<string, number>>({});
  const [showAddModal, setShowAddModal] = useState<boolean>(false);
  const [newCaption, setNewCaption] = useState<string>('');
  const [newLocation, setNewLocation] = useState<string>('');
  const [newImagePreview, setNewImagePreview] = useState<string>('');

  const handleLike = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    setLikes((prev) => ({
      ...prev,
      [id]: (prev[id] || 0) + 1,
    }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setNewImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSaveNewPhoto = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newImagePreview) return;

    const newPhoto: MemoryPhoto = {
      id: `custom_${Date.now()}`,
      url: newImagePreview,
      caption: newCaption || 'Hamari ek aur khoobsurat yaad.',
      location: newLocation || 'Dil Ke Qareeb',
      date: new Date().toLocaleDateString('en-US', { month: 'short', year: 'numeric' }),
    };

    onAddPhoto(newPhoto);
    setShowAddModal(false);
    setNewImagePreview('');
    setNewCaption('');
    setNewLocation('');
  };

  return (
    <section id="memories" className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      {/* Section Header */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-12 border-b border-stone-800/80 pb-6 gap-4">
        <div>
          <div className="flex items-center gap-2 text-xs sm:text-sm font-medium text-rose-300/80 mb-2 uppercase tracking-wider">
            <span>Hamari Yaadein</span>
            <span aria-hidden="true">·</span>
            <span>Cherished Moments</span>
            <span aria-hidden="true">·</span>
            <span>{photos.length} Photos</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-serif font-bold text-stone-100">
            Khubsurat Lamhaat Ka Album
          </h2>
        </div>

        <button
          onClick={() => setShowAddModal(true)}
          type="button"
          className="flex items-center gap-2 self-start sm:self-auto px-4 py-2 text-xs font-semibold text-rose-200 bg-rose-950/40 hover:bg-rose-900/60 border border-rose-800/40 rounded-full transition-all cursor-pointer"
        >
          <Plus className="w-4 h-4 text-rose-400" />
          <span>Add Our Photo</span>
        </button>
      </div>

      {/* Bento / Polaroid Masonry Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {photos.map((photo, index) => {
          // Dynamic Bento layout: first photo spans 2 columns on lg
          const isLarge = index === 0;
          const currentLikes = (likes[photo.id] || 0) + 12; // warm baseline likes

          return (
            <div
              key={photo.id}
              onClick={() => setActivePhoto(photo)}
              className={`group relative bg-stone-900/40 hover:bg-stone-900/80 border border-stone-800 hover:border-rose-800/60 rounded-2xl p-3 sm:p-4 transition-all duration-300 cursor-pointer flex flex-col justify-between shadow-lg hover:shadow-rose-950/30 ${isLarge ? 'sm:col-span-2 sm:row-span-2' : ''
                }`}
            >
              {/* Photo Frame Container with styled fallback */}
              <div
                className={`relative w-full rounded-xl overflow-hidden bg-stone-950 ${isLarge ? 'aspect-4/3 sm:aspect-16/10' : 'aspect-4/3'
                  }`}
              >
                <img
                  src={photo.url}
                  alt={photo.caption}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  onError={(e) => {
                    // Graceful fallback to maintain zero broken images
                    const target = e.currentTarget;
                    target.style.display = 'none';
                    if (target.parentElement) {
                      const fallback = target.parentElement.querySelector('.image-fallback');
                      if (fallback) (fallback as HTMLElement).style.display = 'flex';
                    }
                  }}
                />

                {/* Styled CSS Fallback in case image fails to load */}
                <div className="image-fallback hidden absolute inset-0 bg-gradient-to-tr from-stone-900 via-rose-950/40 to-stone-900 flex-col items-center justify-center p-4 text-center">
                  <ImageIcon className="w-8 h-8 text-rose-400/60 mb-2" />
                  <span className="text-xs text-stone-400 font-serif italic">Hamari pyari yaad</span>
                </div>

                {/* Subtle scrim overlay on hover */}
                <div className="absolute inset-0 bg-gradient-to-t from-stone-950/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end justify-between p-4">
                  <span className="text-xs text-rose-200 font-medium flex items-center gap-1.5">
                    <Maximize2 className="w-3.5 h-3.5" />
                    <span>View Full Size</span>
                  </span>
                  <button
                    onClick={(e) => handleLike(photo.id, e)}
                    type="button"
                    className="p-1.5 rounded-full bg-rose-950/80 text-rose-300 hover:text-white transition-colors"
                  >
                    <Heart className="w-4 h-4 fill-rose-500 text-rose-500" />
                  </button>
                </div>
              </div>

              {/* Polaroid-style Caption & Clean Unboxed Metadata */}
              <div className="pt-3 px-1">
                <p className="text-sm font-medium text-stone-200 line-clamp-2 mb-2 group-hover:text-rose-200 transition-colors font-serif">
                  "{photo.caption}"
                </p>

                {/* Clean unboxed metadata with typographic separators */}
                <div className="flex items-center justify-between text-xs text-stone-500 pt-1 border-t border-stone-800/60">
                  <div className="flex items-center gap-1.5 truncate">
                    {photo.location && <span>{photo.location}</span>}
                    {photo.location && photo.date && <span aria-hidden="true">·</span>}
                    {photo.date && <span>{photo.date}</span>}
                  </div>
                  <div className="flex items-center gap-1 text-rose-400/80 font-mono text-[11px]">
                    <Heart className="w-3 h-3 fill-rose-500/80 text-rose-500/80" />
                    <span>{currentLikes}</span>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Fullscreen Lightbox Modal */}
      {activePhoto && (
        <div
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 z-50 bg-stone-950/90 backdrop-blur-md flex items-center justify-center p-4 sm:p-6"
          onClick={() => setActivePhoto(null)}
        >
          <div
            className="relative max-w-4xl w-full bg-stone-900 border border-stone-800 rounded-2xl overflow-hidden shadow-2xl flex flex-col"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Top Bar inside Lightbox */}
            <div className="flex items-center justify-between px-6 py-4 border-b border-stone-800 bg-stone-950/40">
              <div className="flex items-center gap-2 text-xs text-stone-400">
                <span>Photo Memoir</span>
                {activePhoto.location && (
                  <>
                    <span aria-hidden="true">·</span>
                    <span>{activePhoto.location}</span>
                  </>
                )}
                {activePhoto.date && (
                  <>
                    <span aria-hidden="true">·</span>
                    <span>{activePhoto.date}</span>
                  </>
                )}
              </div>
              <button
                onClick={() => setActivePhoto(null)}
                type="button"
                className="p-1 rounded-lg text-stone-400 hover:text-stone-100 hover:bg-stone-800 transition-colors cursor-pointer"
                title="Close Lightbox"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Lightbox Image Container */}
            <div className="relative max-h-[65vh] overflow-hidden bg-black flex items-center justify-center">
              <img
                src={activePhoto.url}
                alt={activePhoto.caption}
                referrerPolicy="no-referrer"
                className="max-h-[65vh] w-auto max-w-full object-contain select-none"
              />
            </div>

            {/* Bottom Caption & Reaction */}
            <div className="p-6 bg-stone-950/80 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <p className="text-base text-rose-100 font-serif italic max-w-2xl">
                "{activePhoto.caption}"
              </p>
              <button
                onClick={(e) => handleLike(activePhoto.id, e)}
                type="button"
                className="flex items-center gap-2 self-start sm:self-auto px-4 py-2 bg-rose-950/60 hover:bg-rose-900/60 text-rose-200 border border-rose-800/40 rounded-full text-xs font-semibold transition-all cursor-pointer"
              >
                <Heart className="w-4 h-4 fill-rose-500 text-rose-500" />
                <span>Loved {(likes[activePhoto.id] || 0) + 12} times</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Add Custom Photo Modal */}
      {showAddModal && (
        <div
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 z-50 bg-stone-950/85 backdrop-blur-sm flex items-center justify-center p-4"
          onClick={() => setShowAddModal(false)}
        >
          <div
            className="max-w-md w-full bg-stone-900 border border-stone-800 rounded-2xl p-6 shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between mb-4 pb-3 border-b border-stone-800">
              <h3 className="text-lg font-serif font-bold text-stone-100">
                Apni Photo Add Karein
              </h3>
              <button
                onClick={() => setShowAddModal(false)}
                type="button"
                className="text-stone-400 hover:text-stone-200"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSaveNewPhoto} className="space-y-4">
              <div>
                <label className="block text-xs font-medium text-stone-300 mb-1.5">
                  Select Photo from Device
                </label>
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleFileChange}
                  required
                  className="block w-full text-xs text-stone-400 file:mr-3 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-xs file:font-semibold file:bg-rose-950/80 file:text-rose-200 hover:file:bg-rose-900/80 cursor-pointer"
                />
              </div>

              {newImagePreview && (
                <div className="w-full aspect-video rounded-lg overflow-hidden bg-stone-950 border border-stone-800">
                  <img
                    src={newImagePreview}
                    alt="Preview"
                    className="w-full h-full object-cover"
                  />
                </div>
              )}

              <div>
                <label className="block text-xs font-medium text-stone-300 mb-1.5">
                  Pyara Sa Caption (Roman Urdu / English)
                </label>
                <input
                  type="text"
                  value={newCaption}
                  onChange={(e) => setNewCaption(e.target.value)}
                  placeholder="e.g. Humara pehla safar, tumhari pyari muskurahat..."
                  className="w-full px-3.5 py-2 text-sm bg-stone-950 border border-stone-800 rounded-lg text-stone-200 focus:outline-none focus:border-rose-500"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-stone-300 mb-1.5">
                  Location / Moment (Optional)
                </label>
                <input
                  type="text"
                  value={newLocation}
                  onChange={(e) => setNewLocation(e.target.value)}
                  placeholder="e.g. Murree Trip, Shaadi Ki Raat, Long Drive..."
                  className="w-full px-3.5 py-2 text-sm bg-stone-950 border border-stone-800 rounded-lg text-stone-200 focus:outline-none focus:border-rose-500"
                />
              </div>

              <div className="flex justify-end gap-2.5 pt-2">
                <button
                  type="button"
                  onClick={() => setShowAddModal(false)}
                  className="px-4 py-2 text-xs font-medium text-stone-400 hover:text-stone-200"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={!newImagePreview}
                  className="px-4 py-2 text-xs font-semibold text-white bg-rose-600 hover:bg-rose-500 disabled:opacity-50 rounded-lg transition-colors"
                >
                  Save to Album
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </section>
  );
};

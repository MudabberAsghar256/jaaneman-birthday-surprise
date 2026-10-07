'use client';

import React, { useState, useEffect } from 'react';
import { Navbar } from '../components/Navbar';
import { RomanticLogin } from '../components/RomanticLogin';
import { HeroCountdown } from '../components/HeroCountdown';
import { BirthdayVideoPlayer } from '../components/BirthdayVideoPlayer';
import { SweetTalksSection } from '../components/SweetTalksSection';
import { CakeCutting } from '../components/CakeCutting';
import { PhotoGallery } from '../components/PhotoGallery';
import { LoveLetters } from '../components/LoveLetters';
import { ReasonsWhy } from '../components/ReasonsWhy';
import { CustomizeModal } from '../components/CustomizeModal';
import { Footer } from '../components/Footer';
import { getSavedSettings, saveSettings, INITIAL_LETTERS } from '../utils/storage';
import { romanticAudio } from '../utils/audio';
import { MemoryPhoto, SurpriseSettings } from '../types';

export default function Home() {
  const [settings, setSettings] = useState<SurpriseSettings>(() => getSavedSettings());
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
  const [isMusicPlaying, setIsMusicPlaying] = useState<boolean>(false);
  const [isCustomizeOpen, setIsCustomizeOpen] = useState<boolean>(false);

  useEffect(() => {
    setIsMusicPlaying(romanticAudio.getIsPlaying());

    return () => {
      romanticAudio.stopMusic();
    };
  }, []);

  const handleToggleMusic = () => {
    romanticAudio.toggleMusic((status) => {
      setIsMusicPlaying(status);
    });
  };

  const handleSaveSettings = (updated: SurpriseSettings) => {
    setSettings(updated);
    saveSettings(updated);
  };

  const handleAddPhoto = (newPhoto: MemoryPhoto) => {
    const updatedPhotos = [newPhoto, ...settings.photos];
    const updatedSettings = {
      ...settings,
      photos: updatedPhotos,
    };
    handleSaveSettings(updatedSettings);
  };

  const handleUpdateVideoUrl = (url: string) => {
    const updatedSettings = {
      ...settings,
      videoUrl: url,
    };
    handleSaveSettings(updatedSettings);
  };

  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  // If not logged in, show the aesthetic Romantic VIP Login Form
  if (!isLoggedIn) {
    return (
      <RomanticLogin
        wifeName={settings.wifeName}
        husbandName={settings.husbandName}
        expectedPasscode={settings.secretPasscode}
        onLoginSuccess={() => setIsLoggedIn(true)}
      />
    );
  }

  return (
    <div className="min-h-screen bg-stone-950 text-stone-100 flex flex-col font-sans selection:bg-rose-600/30 selection:text-rose-200">
      {/* Navigation Header */}
      <Navbar
        wifeName={settings.wifeName}
        isMusicPlaying={isMusicPlaying}
        onToggleMusic={handleToggleMusic}
        onOpenCustomize={() => setIsCustomizeOpen(true)}
        onLock={() => setIsLoggedIn(false)}
      />

      <main className="flex-1">
        {/* Hero Section with Live Countdown */}
        <HeroCountdown
          wifeName={settings.wifeName}
          birthdayDate={settings.birthdayDate}
          onBlowCandlesClick={() => scrollToSection('celebration')}
          onReadLetterClick={() => scrollToSection('letters')}
        />

        {/* Birthday Video Reel & Custom Video Player */}
        <BirthdayVideoPlayer
          wifeName={settings.wifeName}
          husbandName={settings.husbandName}
          customVideoUrl={settings.videoUrl}
          videoTitle={settings.videoTitle}
          onUpdateVideoUrl={handleUpdateVideoUrl}
        />

        {/* Dil Ki Achi Achi Baatein & Husband's Voice Notes */}
        <SweetTalksSection
          wifeName={settings.wifeName}
          husbandName={settings.husbandName}
        />

        {/* Interactive Candle Blowing & Cake Cutting */}
        <CakeCutting wifeName={settings.wifeName} />

        {/* Photo Gallery & Memories Bento Grid */}
        <PhotoGallery
          photos={settings.photos}
          onAddPhoto={handleAddPhoto}
        />

        {/* Emotional Love Letters & Poetic Messages */}
        <LoveLetters
          letters={INITIAL_LETTERS}
          wifeName={settings.wifeName}
          husbandName={settings.husbandName}
        />

        {/* 10 Reasons Why You Mean The World To Me */}
        <ReasonsWhy wifeName={settings.wifeName} />
      </main>

      {/* Footer */}
      <Footer
        wifeName={settings.wifeName}
        husbandName={settings.husbandName}
      />

      {/* Personalization Modal */}
      <CustomizeModal
        isOpen={isCustomizeOpen}
        onClose={() => setIsCustomizeOpen(false)}
        settings={settings}
        onSave={handleSaveSettings}
      />
    </div>
  );
}

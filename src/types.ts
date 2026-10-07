export interface MemoryPhoto {
  id: string;
  url: string;
  caption: string;
  date?: string;
  location?: string;
}

export interface LoveLetter {
  id: string;
  title: string;
  subtitle: string;
  urduPoetry?: {
    urdu: string;
    roman: string;
    meaning: string;
  };
  content: string[];
}

export interface ReasonCard {
  id: number;
  title: string;
  romanTitle: string;
  description: string;
  iconName: string;
}

export interface SweetTalk {
  id: string;
  title: string;
  romanTitle: string;
  quote: string;
  fullMessage: string;
  tag: string;
}

export interface VoiceNoteItem {
  id: string;
  title: string;
  duration: string;
  transcription: string;
  romanAudioNote: string;
}

export interface SurpriseSettings {
  wifeName: string;
  husbandName: string;
  birthdayDate: string; // ISO date string e.g. "2026-10-07T00:00:00"
  secretPasscode: string;
  customMessage?: string;
  videoUrl?: string;
  videoTitle?: string;
  photos: MemoryPhoto[];
}


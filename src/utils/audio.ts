class RomanticSoundtrack {
  private ctx: AudioContext | null = null;
  private isPlaying: boolean = false;
  private timer: number | null = null;
  private noteIndex: number = 0;

  // Gentle romantic music box notes (frequencies in Hz: C4, E4, G4, B4, C5, D5, E5, G5)
  private melody = [
    { note: 261.63, dur: 0.8 }, // C4
    { note: 329.63, dur: 0.8 }, // E4
    { note: 392.00, dur: 0.8 }, // G4
    { note: 493.88, dur: 1.2 }, // B4
    { note: 523.25, dur: 1.4 }, // C5
    { note: 392.00, dur: 0.7 }, // G4
    { note: 329.63, dur: 0.7 }, // E4
    { note: 440.00, dur: 1.0 }, // A4
    { note: 523.25, dur: 0.8 }, // C5
    { note: 587.33, dur: 1.2 }, // D5
    { note: 659.25, dur: 1.6 }, // E5
    { note: 587.33, dur: 0.8 }, // D5
    { note: 523.25, dur: 0.8 }, // C5
    { note: 493.88, dur: 1.0 }, // B4
    { note: 392.00, dur: 1.2 }, // G4
    { note: 329.63, dur: 1.4 }, // E4
    { note: 349.23, dur: 0.8 }, // F4
    { note: 440.00, dur: 0.8 }, // A4
    { note: 523.25, dur: 1.2 }, // C5
    { note: 659.25, dur: 1.5 }, // E5
    { note: 783.99, dur: 2.0 }, // G5
  ];

  private getContext(): AudioContext | null {
    if (typeof window === 'undefined') return null;
    if (!this.ctx) {
      const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      if (AudioCtx) {
        this.ctx = new AudioCtx();
      }
    }
    if (this.ctx && this.ctx.state === 'suspended') {
      this.ctx.resume().catch(() => {});
    }
    return this.ctx;
  }

  public playTone(freq: number, duration: number, type: OscillatorType = 'sine', volume: number = 0.08) {
    const ctx = this.getContext();
    if (!ctx) return;

    try {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      osc.type = type;
      osc.frequency.setValueAtTime(freq, ctx.currentTime);

      // Bell / music-box envelope: crisp attack, gentle exponential decay
      gain.gain.setValueAtTime(0.0001, ctx.currentTime);
      gain.gain.linearRampToValueAtTime(volume, ctx.currentTime + 0.04);
      gain.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + duration);

      osc.connect(gain);
      gain.connect(ctx.destination);

      osc.start();
      osc.stop(ctx.currentTime + duration);
    } catch {
      // Audio playback caught
    }
  }

  public toggleMusic(onStatusChange?: (playing: boolean) => void): boolean {
    if (this.isPlaying) {
      this.stopMusic();
      onStatusChange?.(false);
      return false;
    } else {
      this.startMusic();
      onStatusChange?.(true);
      return true;
    }
  }

  public startMusic() {
    const ctx = this.getContext();
    if (!ctx) return;
    this.isPlaying = true;

    const playNext = () => {
      if (!this.isPlaying) return;
      const item = this.melody[this.noteIndex % this.melody.length];
      this.playTone(item.note, item.dur * 1.5, 'triangle', 0.06);

      // Subtle warm harmonizing sub-tone
      if (this.noteIndex % 3 === 0) {
        this.playTone(item.note / 2, item.dur * 2, 'sine', 0.03);
      }

      this.noteIndex = (this.noteIndex + 1) % this.melody.length;
      this.timer = window.setTimeout(playNext, item.dur * 850);
    };

    playNext();
  }

  public stopMusic() {
    this.isPlaying = false;
    if (this.timer) {
      clearTimeout(this.timer);
      this.timer = null;
    }
  }

  public getIsPlaying(): boolean {
    return this.isPlaying;
  }

  // Celebratory birthday fanfare when candles are blown
  public playCelebrationFanfare() {
    const ctx = this.getContext();
    if (!ctx) return;

    // "Happy Birthday to you" opening arpeggio notes
    const fanfareNotes = [
      { freq: 261.63, delay: 0, dur: 0.3 },   // C4
      { freq: 261.63, delay: 0.3, dur: 0.3 }, // C4
      { freq: 293.66, delay: 0.6, dur: 0.5 }, // D4
      { freq: 261.63, delay: 1.1, dur: 0.5 }, // C4
      { freq: 349.23, delay: 1.6, dur: 0.5 }, // F4
      { freq: 329.63, delay: 2.1, dur: 0.9 }, // E4
      // Second phrase
      { freq: 261.63, delay: 3.1, dur: 0.3 }, // C4
      { freq: 261.63, delay: 3.4, dur: 0.3 }, // C4
      { freq: 293.66, delay: 3.7, dur: 0.5 }, // D4
      { freq: 261.63, delay: 4.2, dur: 0.5 }, // C4
      { freq: 392.00, delay: 4.7, dur: 0.5 }, // G4
      { freq: 349.23, delay: 5.2, dur: 1.2 }, // F4
    ];

    fanfareNotes.forEach((item) => {
      setTimeout(() => {
        this.playTone(item.freq, item.dur, 'sine', 0.12);
        this.playTone(item.freq * 1.5, item.dur * 0.8, 'triangle', 0.05);
      }, item.delay * 1000);
    });
  }

  // Realistic candle blow whoosh sound
  public playBlowSound() {
    const ctx = this.getContext();
    if (!ctx) return;

    try {
      // Noise buffer for gentle wind / blow breath sound
      const bufferSize = ctx.sampleRate * 0.5;
      const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
      const data = buffer.getChannelData(0);
      for (let i = 0; i < bufferSize; i++) {
        data[i] = Math.random() * 2 - 1;
      }

      const noise = ctx.createBufferSource();
      noise.buffer = buffer;

      const filter = ctx.createBiquadFilter();
      filter.type = 'lowpass';
      filter.frequency.setValueAtTime(600, ctx.currentTime);
      filter.frequency.exponentialRampToValueAtTime(120, ctx.currentTime + 0.5);

      const gain = ctx.createGain();
      gain.gain.setValueAtTime(0.001, ctx.currentTime);
      gain.gain.linearRampToValueAtTime(0.15, ctx.currentTime + 0.08);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.5);

      noise.connect(filter);
      filter.connect(gain);
      gain.connect(ctx.destination);

      noise.start();
    } catch {
      // fallback tone
      this.playTone(180, 0.4, 'sine', 0.08);
    }
  }
}

export const romanticAudio = new RomanticSoundtrack();

/**
 * Web Audio synthetic haptic feedback module
 * Provides subtle tactile auditory feedback without external audio files
 */

class HapticAudioController {
  constructor() {
    this.audioCtx = null;
    this.isEnabled = false; // muted by default for friendly web experience
    this.storageKey = 'productzero_sound_enabled';
    this.initFromStorage();
  }

  initFromStorage() {
    try {
      const saved = localStorage.getItem(this.storageKey);
      if (saved !== null) {
        this.isEnabled = JSON.parse(saved);
      }
    } catch {
      this.isEnabled = false;
    }
  }

  toggleSound() {
    this.isEnabled = !this.isEnabled;
    try {
      localStorage.setItem(this.storageKey, JSON.stringify(this.isEnabled));
    } catch {
      // Ignore storage write errors
    }
    if (this.isEnabled) {
      this.playChirp();
    }
    return this.isEnabled;
  }

  ensureContext() {
    if (!this.audioCtx) {
      const AudioContextClass = window.AudioContext || window.webkitAudioContext;
      if (AudioContextClass) {
        this.audioCtx = new AudioContextClass();
      }
    }
    if (this.audioCtx && this.audioCtx.state === 'suspended') {
      this.audioCtx.resume();
    }
    return this.audioCtx;
  }

  /**
   * Subtle popping sound on carousel swipe or arrow click
   */
  playPop() {
    if (!this.isEnabled) return;
    const ctx = this.ensureContext();
    if (!ctx) return;

    const osc = ctx.createOscillator();
    const gain = ctx.createGain();

    osc.type = 'sine';
    const now = ctx.currentTime;
    osc.frequency.setValueAtTime(320, now);
    osc.frequency.exponentialRampToValueAtTime(140, now + 0.06);

    gain.gain.setValueAtTime(0.08, now);
    gain.gain.exponentialRampToValueAtTime(0.001, now + 0.06);

    osc.connect(gain);
    gain.connect(ctx.destination);

    osc.start(now);
    osc.stop(now + 0.06);
  }

  /**
   * Subtle tick for hovering/selecting product card
   */
  playTick() {
    if (!this.isEnabled) return;
    const ctx = this.ensureContext();
    if (!ctx) return;

    const osc = ctx.createOscillator();
    const gain = ctx.createGain();

    osc.type = 'triangle';
    const now = ctx.currentTime;
    osc.frequency.setValueAtTime(600, now);
    osc.frequency.exponentialRampToValueAtTime(450, now + 0.03);

    gain.gain.setValueAtTime(0.04, now);
    gain.gain.exponentialRampToValueAtTime(0.001, now + 0.03);

    osc.connect(gain);
    gain.connect(ctx.destination);

    osc.start(now);
    osc.stop(now + 0.03);
  }

  /**
   * Confirmation chirp when opening modal or action
   */
  playChirp() {
    const ctx = this.ensureContext();
    if (!ctx) return;

    const osc = ctx.createOscillator();
    const gain = ctx.createGain();

    osc.type = 'sine';
    const now = ctx.currentTime;
    osc.frequency.setValueAtTime(440, now);
    osc.frequency.exponentialRampToValueAtTime(880, now + 0.09);

    gain.gain.setValueAtTime(0.06, now);
    gain.gain.exponentialRampToValueAtTime(0.001, now + 0.09);

    osc.connect(gain);
    gain.connect(ctx.destination);

    osc.start(now);
    osc.stop(now + 0.09);
  }
}

export const hapticAudio = new HapticAudioController();

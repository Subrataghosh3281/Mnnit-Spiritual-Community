import React, { useState, useEffect, useRef } from 'react';
import { Volume2, VolumeX, Music } from 'lucide-react';

export default function AudioPlayer() {
  const [isPlaying, setIsPlaying] = useState(false);
  const audioCtxRef = useRef(null);
  const gainNodeRef = useRef(null);
  const oscillatorsRef = useRef([]);

  // Synthesize meditative Tanpura Sa-Pa drone using Web Audio API
  const startDrone = () => {
    try {
      const AudioContext = window.AudioContext || window.webkitAudioContext;
      const ctx = new AudioContext();
      audioCtxRef.current = ctx;

      const masterGain = ctx.createGain();
      masterGain.gain.setValueAtTime(0.001, ctx.currentTime);
      masterGain.gain.exponentialRampToValueAtTime(0.08, ctx.currentTime + 2.5);
      masterGain.connect(ctx.destination);
      gainNodeRef.current = masterGain;

      // Frequencies for C# Tanpura (Sa = 138.59 Hz, Pa = 207.65 Hz)
      // With warm overtones for divine ambiance
      const freqs = [
        { f: 138.59, type: 'sine', gain: 0.5 },    // Sa (root)
        { f: 207.65, type: 'triangle', gain: 0.35 },// Pa (fifth)
        { f: 277.18, type: 'sine', gain: 0.2 },    // Sa higher octave
        { f: 415.30, type: 'sine', gain: 0.12 },   // Pa harmonic
        { f: 554.37, type: 'sine', gain: 0.08 },   // Shimmer
      ];

      oscillatorsRef.current = freqs.map(({ f, type, gain }) => {
        const osc = ctx.createOscillator();
        const g = ctx.createGain();
        osc.type = type;
        osc.frequency.setValueAtTime(f, ctx.currentTime);
        
        // Gentle subtle detuning for natural acoustic chorus shimmer
        osc.detune.setValueAtTime((Math.random() - 0.5) * 6, ctx.currentTime);
        
        g.gain.setValueAtTime(gain, ctx.currentTime);
        osc.connect(g);
        g.connect(masterGain);
        osc.start();
        return osc;
      });

      setIsPlaying(true);
    } catch (e) {
      console.warn("AudioContext init error:", e);
    }
  };

  const stopDrone = () => {
    if (gainNodeRef.current && audioCtxRef.current) {
      const ctx = audioCtxRef.current;
      gainNodeRef.current.gain.setValueAtTime(gainNodeRef.current.gain.value, ctx.currentTime);
      gainNodeRef.current.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + 1.2);
      
      setTimeout(() => {
        oscillatorsRef.current.forEach(osc => {
          try { osc.stop(); osc.disconnect(); } catch (_) {}
        });
        oscillatorsRef.current = [];
        if (ctx.state !== 'closed') {
          ctx.close();
        }
        setIsPlaying(false);
      }, 1200);
    } else {
      setIsPlaying(false);
    }
  };

  const toggleSound = () => {
    if (isPlaying) {
      stopDrone();
    } else {
      startDrone();
    }
  };

  useEffect(() => {
    return () => {
      if (audioCtxRef.current && audioCtxRef.current.state !== 'closed') {
        audioCtxRef.current.close().catch(() => {});
      }
    };
  }, []);

  return (
    <button
      onClick={toggleSound}
      title={isPlaying ? "Pause Sacred Tanpura Dhwani" : "Play Sacred Tanpura Dhwani (अनहद नाद)"}
      className={`group relative flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-medium transition-all duration-300 border ${
        isPlaying
          ? 'bg-vedic-saffron/20 border-vedic-gold text-vedic-gold-light shadow-[0_0_15px_rgba(245,158,11,0.3)]'
          : 'bg-vedic-card/80 border-vedic-border/60 text-vedic-cream/80 hover:text-vedic-gold hover:border-vedic-gold/40'
      }`}
    >
      {isPlaying ? (
        <>
          <Volume2 className="w-3.5 h-3.5 text-vedic-gold animate-pulse" />
          <div className="flex items-center gap-0.5 h-3">
            <span className="w-1 bg-vedic-gold rounded-full wave-bar-1"></span>
            <span className="w-1 bg-vedic-saffron rounded-full wave-bar-2"></span>
            <span className="w-1 bg-vedic-gold-light rounded-full wave-bar-3"></span>
            <span className="w-1 bg-vedic-saffron rounded-full wave-bar-4"></span>
          </div>
          <span className="hidden sm:inline">Naad Playing</span>
        </>
      ) : (
        <>
          <VolumeX className="w-3.5 h-3.5 text-vedic-muted group-hover:text-vedic-gold" />
          <span className="hidden sm:inline">Play Naad</span>
        </>
      )}
    </button>
  );
}

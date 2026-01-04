
import React, { useState, useEffect, useRef } from 'react';
import { Translation, Language } from '../types';

interface PomodoroProps {
  lang: Language;
  t: Translation;
}

const Pomodoro: React.FC<PomodoroProps> = ({ lang, t }) => {
  const [timeLeft, setTimeLeft] = useState(25 * 60);
  const [isActive, setIsActive] = useState(false);
  const [sessions, setSessions] = useState(() => Number(localStorage.getItem('sessions') || 0));
  const [initialTime, setInitialTime] = useState(25 * 60);
  // Fix: Use ReturnType<typeof setInterval> instead of NodeJS.Timeout to avoid namespace errors in browser environments
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  useEffect(() => {
    localStorage.setItem('sessions', sessions.toString());
  }, [sessions]);

  useEffect(() => {
    if (isActive && timeLeft > 0) {
      timerRef.current = setInterval(() => {
        setTimeLeft(prev => prev - 1);
      }, 1000);
    } else if (timeLeft === 0) {
      setIsActive(false);
      setSessions(prev => prev + 1);
      // Optional sound notification
      try {
        const audio = new Audio('https://assets.mixkit.co/active_storage/sfx/2869/2869-preview.mp3');
        audio.play();
      } catch (e) {}
      alert(lang === 'ar' ? 'انتهى الوقت! خذ بريك يا بطل' : 'Time up! Take a break champion');
    }
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [isActive, timeLeft, lang]);

  const formatTime = (seconds: number) => {
    const m = Math.floor(seconds / 60);
    const s = seconds % 60;
    return `${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
  };

  const setPreset = (mins: number) => {
    setIsActive(false);
    setTimeLeft(mins * 60);
    setInitialTime(mins * 60);
  };

  const progress = ((initialTime - timeLeft) / initialTime) * 100;

  return (
    <div className="glass rounded-3xl p-8 shadow-xl flex flex-col items-center">
      <h2 className="text-2xl font-bold mb-8 flex items-center gap-3 self-start">
        <span className="text-3xl">⏱️</span>
        {t.timerTitle}
      </h2>

      <div className="relative w-64 h-64 mb-10 flex items-center justify-center">
        {/* Progress Circle SVG */}
        <svg className="absolute w-full h-full -rotate-90">
          <circle 
            cx="128" cy="128" r="110" 
            className="stroke-slate-200 dark:stroke-slate-800 fill-none stroke-[8px]" 
          />
          <circle 
            cx="128" cy="128" r="110" 
            className="stroke-blue-600 fill-none stroke-[8px] transition-all duration-1000" 
            strokeDasharray="691.15"
            strokeDashoffset={691.15 - (691.15 * progress) / 100}
            strokeLinecap="round"
          />
        </svg>
        <div className="text-5xl font-mono font-black text-slate-800 dark:text-white">
          {formatTime(timeLeft)}
        </div>
      </div>

      <div className="flex flex-wrap justify-center gap-3 mb-8">
        {[25, 50, 15].map(mins => (
          <button 
            key={mins} 
            onClick={() => setPreset(mins)}
            className="px-4 py-2 rounded-lg bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors font-bold text-sm"
          >
            {mins}m
          </button>
        ))}
      </div>

      <div className="flex gap-4 w-full">
        <button 
          onClick={() => setIsActive(!isActive)}
          className={`flex-1 py-4 rounded-2xl font-bold text-lg transition-all shadow-lg transform active:scale-95 ${
            isActive ? 'bg-orange-100 text-orange-600' : 'bg-blue-600 text-white hover:bg-blue-700'
          }`}
        >
          {isActive ? t.timerPause : t.timerStart}
        </button>
        <button 
          onClick={() => setPreset(initialTime / 60)}
          className="px-6 py-4 bg-slate-100 dark:bg-slate-800 rounded-2xl hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors"
          aria-label="Reset"
        >
          🔄
        </button>
      </div>

      <div className="mt-8 pt-6 border-t border-slate-100 dark:border-slate-800 w-full text-center">
        <p className="text-slate-500 dark:text-slate-400 text-sm font-medium">
          {t.timerSessions}: <span className="text-blue-600 dark:text-blue-400 font-bold text-lg">{sessions}</span>
        </p>
      </div>
    </div>
  );
};

export default Pomodoro;

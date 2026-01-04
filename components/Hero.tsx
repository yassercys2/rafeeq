
import React, { useState, useEffect } from 'react';
import { Language, Translation } from '../types';

interface HeroProps {
  lang: Language;
  t: Translation;
}

const Hero: React.FC<HeroProps> = ({ lang, t }) => {
  const [today, setToday] = useState('');

  useEffect(() => {
    const options: Intl.DateTimeFormatOptions = { 
      weekday: 'long', 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    };
    setToday(new Date().toLocaleDateString(lang === 'ar' ? 'ar-SA' : 'en-US', options));
  }, [lang]);

  return (
    <div className="relative overflow-hidden pt-10 pb-16">
      {/* Background decoration */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full -z-10 opacity-30">
        <div className="absolute top-10 left-1/4 w-64 h-64 bg-blue-400 rounded-full blur-[100px]"></div>
        <div className="absolute bottom-10 right-1/4 w-64 h-64 bg-purple-400 rounded-full blur-[100px]"></div>
      </div>

      <div className="max-w-6xl mx-auto px-6 text-center">
        <div className="inline-block glass px-4 py-2 rounded-full text-sm mb-6 animate-fade-in shadow-sm">
          <span className="text-blue-600 dark:text-blue-400 font-bold">✨ {t.todayGreeting}</span> 
          <span className="mx-2 opacity-50">|</span> 
          <span>{today}</span>
        </div>

        <h1 className="text-5xl md:text-7xl font-extrabold mb-6 tracking-tight bg-gradient-to-b from-slate-900 to-slate-600 dark:from-white dark:to-slate-400 bg-clip-text text-transparent">
          {t.title}
        </h1>
        <p className="text-xl text-slate-600 dark:text-slate-400 mb-10 max-w-2xl mx-auto">
          {t.subtitle}
        </p>

        <div className="flex flex-wrap justify-center gap-4 mb-12">
          <a href="#planner" className="px-8 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-xl font-bold transition-all shadow-lg hover:shadow-blue-200 dark:hover:shadow-none transform hover:-translate-y-1">
            {t.heroStart}
          </a>
          <a href="#timer" className="px-8 py-3 bg-white dark:bg-slate-800 text-slate-900 dark:text-white border border-slate-200 dark:border-slate-700 rounded-xl font-bold transition-all hover:bg-slate-50 dark:hover:bg-slate-700 transform hover:-translate-y-1">
            {t.heroTimer}
          </a>
        </div>

        <div className="flex flex-wrap justify-center gap-6 text-slate-500 dark:text-slate-400 text-sm font-medium">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-blue-500"></span>
            {t.badgeWeekly}
          </div>
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-purple-500"></span>
            {t.badgePomodoro}
          </div>
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-green-500"></span>
            {t.badgeTasks}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;

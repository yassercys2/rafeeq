
import React, { useState, useEffect, useMemo } from 'react';
import { translations } from './translations';
import { Language, Theme } from './types';
import Hero from './components/Hero';
import Planner from './components/Planner';
import Pomodoro from './components/Pomodoro';
import Todo from './components/Todo';
import Tips from './components/Tips';
import Footer from './components/Footer';

const App: React.FC = () => {
  const [lang, setLang] = useState<Language>(() => (localStorage.getItem('lang') as Language) || 'ar');
  const [theme, setTheme] = useState<Theme>(() => (localStorage.getItem('theme') as Theme) || 'light');

  const t = useMemo(() => translations[lang], [lang]);

  useEffect(() => {
    localStorage.setItem('lang', lang);
    document.documentElement.lang = lang;
    document.documentElement.dir = lang === 'ar' ? 'rtl' : 'ltr';
  }, [lang]);

  useEffect(() => {
    localStorage.setItem('theme', theme);
    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [theme]);

  const toggleLang = () => setLang(prev => (prev === 'ar' ? 'en' : 'ar'));
  const toggleTheme = () => setTheme(prev => (prev === 'light' ? 'dark' : 'light'));

  return (
    <div className={`min-h-screen ${lang === 'ar' ? 'font-ar' : 'font-en'}`}>
      {/* Navbar */}
      <nav className="fixed top-0 w-full z-50 glass shadow-sm px-6 py-4 flex justify-between items-center transition-all">
        <div className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
          {t.title}
        </div>
        
        <div className="flex items-center gap-4">
          <button 
            onClick={toggleTheme}
            className="p-2 rounded-full hover:bg-slate-200 dark:hover:bg-slate-800 transition-colors"
            aria-label="Toggle Theme"
          >
            {theme === 'light' ? (
              <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" /></svg>
            ) : (
              <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v1m0 16v1m9-9h-1M4 9H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" /></svg>
            )}
          </button>
          
          <button 
            onClick={toggleLang}
            className="px-3 py-1 rounded-lg border border-slate-300 dark:border-slate-700 hover:bg-slate-200 dark:hover:bg-slate-800 transition-all font-medium text-sm"
          >
            {lang === 'ar' ? 'English' : 'العربية'}
          </button>
        </div>
      </nav>

      {/* Main Content */}
      <main className="pt-24 pb-12 space-y-20">
        <Hero lang={lang} t={t} />
        
        <div className="max-w-6xl mx-auto px-6 space-y-24">
          <section id="planner">
            <Planner lang={lang} t={t} />
          </section>

          <section id="timer" className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
            <Pomodoro lang={lang} t={t} />
            <Todo lang={lang} t={t} />
          </section>

          <section id="tips">
            <Tips lang={lang} t={t} />
          </section>
        </div>
      </main>

      <Footer lang={lang} t={t} />
    </div>
  );
};

export default App;


import React, { useState } from 'react';
import { Translation, Language } from '../types';

interface FooterProps {
  lang: Language;
  t: Translation;
}

const Footer: React.FC<FooterProps> = ({ lang, t }) => {
  const [showModal, setShowModal] = useState(false);
  const [sent, setSent] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSent(true);
    setTimeout(() => {
      setSent(false);
      setShowModal(false);
    }, 2000);
  };

  return (
    <footer className="mt-20 py-12 border-t border-slate-200 dark:border-slate-800 glass">
      <div className="max-w-6xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-8">
        <div className="text-center md:text-left">
          <div className="text-xl font-bold text-blue-600 mb-2">{t.title}</div>
          <p className="text-slate-500 dark:text-slate-400 text-sm">
            {t.footerMadeWith} ❤️
          </p>
        </div>

        <div className="flex gap-8 text-sm font-medium text-slate-500 dark:text-slate-400">
          <a href="#planner" className="hover:text-blue-600 transition-colors">Planner</a>
          <a href="#timer" className="hover:text-blue-600 transition-colors">Timer</a>
          <button onClick={() => setShowModal(true)} className="hover:text-blue-600 transition-colors font-bold text-blue-600">
            {t.contactTitle}
          </button>
        </div>
      </div>

      <div className="mt-8 text-center text-xs text-slate-400">
        © {new Date().getFullYear()} Uni Study Buddy. All rights reserved.
      </div>

      {/* Contact Modal */}
      {showModal && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center px-6">
          <div className="absolute inset-0 bg-slate-900/40 backdrop-blur-sm" onClick={() => setShowModal(false)}></div>
          <div className="relative glass w-full max-w-md rounded-3xl p-8 shadow-2xl animate-in fade-in zoom-in duration-300">
            <button onClick={() => setShowModal(false)} className="absolute top-4 right-4 text-2xl opacity-50 hover:opacity-100">×</button>
            <h2 className="text-2xl font-bold mb-6">{t.contactTitle}</h2>
            
            {sent ? (
              <div className="py-12 text-center">
                <div className="w-16 h-16 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto mb-4 text-2xl">✓</div>
                <p className="font-bold text-green-600">{t.contactSuccess}</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="space-y-1">
                  <label className="text-xs font-bold uppercase tracking-wider opacity-60">{t.contactName}</label>
                  <input type="text" required className="w-full px-4 py-2 rounded-xl bg-slate-100 dark:bg-slate-800 border-none outline-none focus:ring-2 focus:ring-blue-500" />
                </div>
                <div className="space-y-1">
                  <label className="text-xs font-bold uppercase tracking-wider opacity-60">{t.contactEmail}</label>
                  <input type="email" required className="w-full px-4 py-2 rounded-xl bg-slate-100 dark:bg-slate-800 border-none outline-none focus:ring-2 focus:ring-blue-500" />
                </div>
                <div className="space-y-1">
                  <label className="text-xs font-bold uppercase tracking-wider opacity-60">{t.contactMessage}</label>
                  <textarea rows={3} required className="w-full px-4 py-2 rounded-xl bg-slate-100 dark:bg-slate-800 border-none outline-none focus:ring-2 focus:ring-blue-500 resize-none"></textarea>
                </div>
                <button type="submit" className="w-full py-4 bg-blue-600 hover:bg-blue-700 text-white rounded-2xl font-bold transition-all transform active:scale-95 shadow-lg shadow-blue-100 dark:shadow-none">
                  {t.contactSend}
                </button>
              </form>
            )}
          </div>
        </div>
      )}
    </footer>
  );
};

export default Footer;

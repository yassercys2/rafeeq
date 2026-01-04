
import React from 'react';
import { Translation, Language } from '../types';
import { studyTips } from '../translations';

interface TipsProps {
  lang: Language;
  t: Translation;
}

const Tips: React.FC<TipsProps> = ({ lang, t }) => {
  const tips = studyTips[lang];

  return (
    <div className="space-y-10">
      <div className="text-center">
        <h2 className="text-4xl font-black mb-4">{t.tipsTitle}</h2>
        <p className="text-slate-500 dark:text-slate-400">{lang === 'ar' ? 'ضبطنا لك أهم النصائح عشان تبدع في دراستك' : 'Key tips to help you excel in your studies'}</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {tips.map((tip, idx) => (
          <div 
            key={idx} 
            className="p-8 rounded-3xl bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 shadow-sm hover:shadow-xl transition-all hover:-translate-y-2 group"
          >
            <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900/30 text-blue-600 rounded-2xl flex items-center justify-center mb-6 text-xl group-hover:scale-110 transition-transform">
              {['💡', '📍', '🔄', '🎁', '💧', '😴'][idx]}
            </div>
            <h3 className="text-xl font-bold mb-3">{tip.title}</h3>
            <p className="text-slate-500 dark:text-slate-400 leading-relaxed text-sm">
              {tip.desc}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Tips;


import React, { useState, useEffect } from 'react';
import { Translation, PlanItem, Priority, Language } from '../types';

interface PlannerProps {
  lang: Language;
  t: Translation;
}

const Planner: React.FC<PlannerProps> = ({ lang, t }) => {
  const [items, setItems] = useState<PlanItem[]>(() => {
    const saved = localStorage.getItem('study-plan');
    return saved ? JSON.parse(saved) : [];
  });

  const [course, setCourse] = useState('');
  const [topic, setTopic] = useState('');
  const [deadline, setDeadline] = useState('');
  const [priority, setPriority] = useState<Priority>('Medium');

  useEffect(() => {
    localStorage.setItem('study-plan', JSON.stringify(items));
  }, [items]);

  const addItem = (e: React.FormEvent) => {
    e.preventDefault();
    if (!course || !topic || !deadline) return;

    const newItem: PlanItem = {
      id: crypto.randomUUID(),
      course,
      topic,
      deadline,
      priority,
      completed: false
    };

    setItems([newItem, ...items]);
    setCourse('');
    setTopic('');
    setDeadline('');
    setPriority('Medium');
  };

  const deleteItem = (id: string) => {
    setItems(items.filter(item => item.id !== id));
  };

  const toggleComplete = (id: string) => {
    setItems(items.map(item => item.id === id ? { ...item, completed: !item.completed } : item));
  };

  return (
    <div className="glass rounded-3xl p-8 shadow-xl">
      <h2 className="text-3xl font-bold mb-8 flex items-center gap-3">
        <span className="text-4xl">🗓️</span>
        {t.plannerTitle}
      </h2>

      <form onSubmit={addItem} className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-10 bg-slate-50 dark:bg-slate-800/50 p-6 rounded-2xl border border-slate-100 dark:border-slate-700">
        <div className="space-y-2">
          <label className="text-sm font-bold opacity-70">{t.plannerCourse}</label>
          <input 
            type="text" 
            value={course} 
            onChange={e => setCourse(e.target.value)}
            className="w-full px-4 py-2 rounded-xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 focus:ring-2 focus:ring-blue-500 outline-none" 
            placeholder="e.g. CS101"
            required
          />
        </div>
        <div className="space-y-2">
          <label className="text-sm font-bold opacity-70">{t.plannerTopic}</label>
          <input 
            type="text" 
            value={topic} 
            onChange={e => setTopic(e.target.value)}
            className="w-full px-4 py-2 rounded-xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 focus:ring-2 focus:ring-blue-500 outline-none" 
            placeholder="e.g. Algebra"
            required
          />
        </div>
        <div className="space-y-2">
          <label className="text-sm font-bold opacity-70">{t.plannerDeadline}</label>
          <input 
            type="date" 
            value={deadline} 
            onChange={e => setDeadline(e.target.value)}
            className="w-full px-4 py-2 rounded-xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 focus:ring-2 focus:ring-blue-500 outline-none" 
            required
          />
        </div>
        <div className="space-y-2">
          <label className="text-sm font-bold opacity-70">{t.plannerPriority}</label>
          <select 
            value={priority} 
            onChange={e => setPriority(e.target.value as Priority)}
            className="w-full px-4 py-2 rounded-xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 focus:ring-2 focus:ring-blue-500 outline-none"
          >
            <option value="Low">{t.priorityLow}</option>
            <option value="Medium">{t.priorityMed}</option>
            <option value="High">{t.priorityHigh}</option>
          </select>
        </div>
        <div className="md:col-span-4 mt-2">
          <button type="submit" className="w-full md:w-auto px-10 py-3 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl font-bold transition-all shadow-md transform hover:scale-[1.02]">
            {t.plannerAdd}
          </button>
        </div>
      </form>

      <div className="overflow-x-auto">
        <table className="w-full text-left">
          <thead>
            <tr className={`border-b border-slate-200 dark:border-slate-800 text-slate-500 dark:text-slate-400 ${lang === 'ar' ? 'text-right' : 'text-left'}`}>
              <th className="pb-4 font-semibold">{t.plannerCourse}</th>
              <th className="pb-4 font-semibold">{t.plannerTopic}</th>
              <th className="pb-4 font-semibold">{t.plannerDeadline}</th>
              <th className="pb-4 font-semibold">{t.plannerPriority}</th>
              <th className="pb-4 font-semibold"></th>
            </tr>
          </thead>
          <tbody className={lang === 'ar' ? 'text-right' : 'text-left'}>
            {items.map(item => (
              <tr key={item.id} className={`border-b border-slate-100 dark:border-slate-800 transition-colors hover:bg-slate-50/50 dark:hover:bg-slate-800/30 ${item.completed ? 'opacity-50 line-through' : ''}`}>
                <td className="py-4 font-bold">{item.course}</td>
                <td className="py-4">{item.topic}</td>
                <td className="py-4 text-sm opacity-70">{item.deadline}</td>
                <td className="py-4">
                  <span className={`px-3 py-1 rounded-full text-xs font-bold ${
                    item.priority === 'High' ? 'bg-red-100 text-red-600' : 
                    item.priority === 'Medium' ? 'bg-orange-100 text-orange-600' : 
                    'bg-green-100 text-green-600'
                  }`}>
                    {item.priority === 'High' ? t.priorityHigh : item.priority === 'Medium' ? t.priorityMed : t.priorityLow}
                  </span>
                </td>
                <td className="py-4 text-right space-x-2 space-x-reverse">
                  <button onClick={() => toggleComplete(item.id)} className="p-2 text-slate-400 hover:text-green-500 transition-colors">
                    {item.completed ? '↩️' : '✅'}
                  </button>
                  <button onClick={() => deleteItem(item.id)} className="p-2 text-slate-400 hover:text-red-500 transition-colors">
                    🗑️
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {items.length === 0 && (
          <div className="py-12 text-center text-slate-400 italic">
             {lang === 'ar' ? 'لا توجد مهام حالياً.. ابدأ بإضافة مادة' : 'No items yet.. Start by adding a course'}
          </div>
        )}
      </div>
    </div>
  );
};

export default Planner;

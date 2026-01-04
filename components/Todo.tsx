
import React, { useState, useEffect } from 'react';
import { Translation, TodoItem, Language } from '../types';

interface TodoProps {
  lang: Language;
  t: Translation;
}

type Filter = 'All' | 'Active' | 'Done';

const Todo: React.FC<TodoProps> = ({ lang, t }) => {
  const [todos, setTodos] = useState<TodoItem[]>(() => {
    const saved = localStorage.getItem('todo-list');
    return saved ? JSON.parse(saved) : [];
  });
  const [input, setInput] = useState('');
  const [filter, setFilter] = useState<Filter>('All');

  useEffect(() => {
    localStorage.setItem('todo-list', JSON.stringify(todos));
  }, [todos]);

  const addTodo = (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;
    const newTodo: TodoItem = {
      id: crypto.randomUUID(),
      text: input,
      completed: false
    };
    setTodos([...todos, newTodo]);
    setInput('');
  };

  const toggleTodo = (id: string) => {
    setTodos(todos.map(t => t.id === id ? { ...t, completed: !t.completed } : t));
  };

  const removeTodo = (id: string) => {
    setTodos(todos.filter(t => t.id !== id));
  };

  const filteredTodos = todos.filter(t => {
    if (filter === 'Active') return !t.completed;
    if (filter === 'Done') return t.completed;
    return true;
  });

  return (
    <div className="glass rounded-3xl p-8 shadow-xl">
      <h2 className="text-2xl font-bold mb-8 flex items-center gap-3">
        <span className="text-3xl">📝</span>
        {t.todoTitle}
      </h2>

      <form onSubmit={addTodo} className="mb-6">
        <input 
          type="text" 
          value={input}
          onChange={e => setInput(e.target.value)}
          placeholder={t.todoAdd}
          className="w-full px-5 py-3 rounded-2xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 focus:ring-2 focus:ring-blue-500 outline-none transition-all"
        />
      </form>

      <div className="flex gap-2 mb-6">
        {(['All', 'Active', 'Done'] as Filter[]).map(f => (
          <button 
            key={f}
            onClick={() => setFilter(f)}
            className={`px-4 py-1.5 rounded-full text-sm font-bold transition-all ${
              filter === f 
              ? 'bg-blue-600 text-white shadow-md' 
              : 'bg-slate-100 dark:bg-slate-800 text-slate-500 hover:bg-slate-200 dark:hover:bg-slate-700'
            }`}
          >
            {f === 'All' ? t.todoAll : f === 'Active' ? t.todoActive : t.todoDone}
          </button>
        ))}
      </div>

      <div className="space-y-3 max-h-[400px] overflow-y-auto pr-1">
        {filteredTodos.map(todo => (
          <div 
            key={todo.id}
            className={`flex items-center gap-3 p-4 bg-slate-50/50 dark:bg-slate-800/40 rounded-2xl border border-slate-100 dark:border-slate-700 transition-all ${todo.completed ? 'opacity-60' : ''}`}
          >
            <button 
              onClick={() => toggleTodo(todo.id)}
              className={`w-6 h-6 rounded-full border-2 flex items-center justify-center transition-all ${
                todo.completed ? 'bg-green-500 border-green-500' : 'border-slate-300 dark:border-slate-600'
              }`}
            >
              {todo.completed && <span className="text-white text-xs">✓</span>}
            </button>
            <span className={`flex-1 ${todo.completed ? 'line-through' : ''}`}>{todo.text}</span>
            <button 
              onClick={() => removeTodo(todo.id)}
              className="text-slate-400 hover:text-red-500 opacity-0 group-hover:opacity-100 transition-all"
              aria-label="Delete"
            >
              ×
            </button>
          </div>
        ))}
        {filteredTodos.length === 0 && (
          <div className="py-10 text-center text-slate-400 italic text-sm">
             {lang === 'ar' ? 'مافيه شيء حالياً..' : 'Nothing here right now..'}
          </div>
        )}
      </div>

      <div className="mt-6 pt-4 border-t border-slate-100 dark:border-slate-800 flex justify-between items-center text-xs text-slate-500">
        <span>{filteredTodos.length} {lang === 'ar' ? 'مهام' : 'items'}</span>
        <button 
          onClick={() => setTodos(todos.filter(t => !t.completed))}
          className="hover:text-red-500 transition-colors font-bold"
        >
          {t.todoClear}
        </button>
      </div>
    </div>
  );
};

export default Todo;

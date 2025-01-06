'use client';

import { useState, useEffect } from 'react';

interface DateTimeProps {
  lang: 'ru' | 'en';
}

export default function DateTime({ lang }: DateTimeProps) {
  const [date, setDate] = useState<Date | null>(null);

  useEffect(() => {
    setDate(new Date());
    const timer = setInterval(() => setDate(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  if (!date) return null;

  const formattedDate = date.toLocaleDateString(lang === 'ru' ? 'ru-RU' : 'en-US', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });

  const formattedTime = date.toLocaleTimeString(lang === 'ru' ? 'ru-RU' : 'en-US');

  return (
    <div className="bg-black/40 backdrop-blur-sm p-6 rounded-lg border border-zinc-800">
      <div className="text-zinc-300">
        <p className="text-lg">{formattedDate}</p>
        <p className="text-3xl font-mono mt-2">{formattedTime}</p>
      </div>
    </div>
  );
} 
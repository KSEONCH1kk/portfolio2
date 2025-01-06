'use client';

interface WeatherProps {
  lang: 'ru' | 'en';
}

export default function Weather({ lang }: WeatherProps) {
  return (
    <div className="bg-black/40 backdrop-blur-sm p-6 rounded-lg border border-zinc-800">
      <div className="text-zinc-300">
        <p className="text-lg">{lang === 'ru' ? 'Москва' : 'Moscow'}</p>
        <p className="text-3xl font-mono mt-2">+20°C</p>
        <p className="text-sm text-zinc-400 mt-1">
          {lang === 'ru' ? 'Солнечно' : 'Sunny'}
        </p>
      </div>
    </div>
  );
} 
'use client';

import React, { useState, useEffect } from 'react';
import { FaArrowLeft, FaCode } from 'react-icons/fa';
import Link from 'next/link';
import Image from 'next/image';
import { useSearchParams } from 'next/navigation';
import { SiNextdotjs, SiTypescript, SiTailwindcss } from 'react-icons/si';

// Добавим тип для категории проекта
type ProjectCategory = 'personal' | 'commercial' | 'frontend' | 'backend' | 'bots';

// Обновим интерфейс Project
interface Project {
  title: string;
  description: {
    ru: string;
    en: string;
  };
  tech: Array<{
    name: string;
    version: string;
    icon: React.ReactNode;
  }>;
  image?: string;
  categories: ProjectCategory[]; // Добавим категории
}

// Добавим переводы для категорий
const categoryLocales: Record<ProjectCategory, { ru: string; en: string }> = {
  personal: {
    ru: 'Личные проекты',
    en: 'Personal Projects'
  },
  commercial: {
    ru: 'Проекты на заказ',
    en: 'Commercial Projects'
  },
  frontend: {
    ru: 'Фронтенд',
    en: 'Frontend'
  },
  backend: {
    ru: 'Бекенд',
    en: 'Backend'
  },
  bots: {
    ru: 'Боты',
    en: 'Bots'
  }
};

// Обновим массив проектов
const projects: Project[] = [
  {
    title: 'Portfolio Website',
    description: {
      ru: 'Персональный веб-сайт портфолио с анимациями и интерактивными элементами',
      en: 'Personal portfolio website with animations and interactive elements'
    },
    tech: [
      { name: 'Next.js', version: '15.1.3', icon: <SiNextdotjs className="text-white" /> },
      { name: 'TypeScript', version: '5.0.0', icon: <SiTypescript className="text-blue-400" /> },
      { name: 'TailwindCSS', version: '3.3.0', icon: <SiTailwindcss className="text-cyan-400" /> }
    ],
    image: '/project1.png',
    categories: ['personal', 'frontend']
  }
  // Добавьте другие проекты
];

// Добавим компонент для пустого результата
const EmptyState = ({ lang }: { lang: 'ru' | 'en' }) => (
  <div className="flex flex-col items-center justify-center p-12 text-center animate-fade-up">
    <div className="text-6xl mb-4 animate-bounce">
      🤔
    </div>
    <h3 className="text-xl font-semibold mb-2 bg-gradient-to-r from-red-500 to-yellow-500 
      bg-clip-text text-transparent"
    >
      {lang === 'ru' ? 'Упс! Ничего не найдено' : 'Oops! Nothing found'}
    </h3>
    <p className="text-zinc-400 mb-6 max-w-md">
      {lang === 'ru' 
        ? 'Похоже, проекты решили поиграть в прятки. Попробуйте другие фильтры!' 
        : 'Looks like the projects are playing hide and seek. Try different filters!'}
    </p>
    <div className="flex gap-2 text-2xl animate-pulse">
      <span>🎮</span>
      <span>🎲</span>
      <span>🎯</span>
    </div>
  </div>
);

// Обновим компонент ProjectsPage
export default function ProjectsPage() {
  const searchParams = useSearchParams();
  const [lang, setLang] = useState<'ru' | 'en'>(
    searchParams.get('lang') === 'en' ? 'en' : 'ru'
  );
  const [selectedCategories, setSelectedCategories] = useState<ProjectCategory[]>([]);

  // Группируем категории по типу
  const categoryGroups = {
    type: ['personal', 'commercial'] as ProjectCategory[],
    tech: ['frontend', 'backend', 'bots'] as ProjectCategory[]
  };

  // Фильтруем проекты с учетом нескольких категорий
  const filteredProjects = projects.filter(project => {
    if (selectedCategories.length === 0) return true;
    
    // Проект должен соответствовать ВСЕМ выбранным категориям
    return selectedCategories.every(category => 
      project.categories.includes(category)
    );
  });

  // Обработчик выбора категории
  const toggleCategory = (category: ProjectCategory) => {
    setSelectedCategories(prev => 
      prev.includes(category)
        ? prev.filter(c => c !== category)
        : [...prev, category]
    );
  };

  useEffect(() => {
    const url = new URL(window.location.href);
    url.searchParams.set('lang', lang);
    window.history.replaceState({}, '', url);
  }, [lang]);

  return (
    <div className="min-h-screen bg-black text-white p-8">
      <div className="max-w-4xl mx-auto">
        <Link 
          href="/"
          className="inline-flex items-center gap-2 text-zinc-400 hover:text-white transition-colors mb-8"
        >
          <FaArrowLeft />
          {lang === 'ru' ? 'Назад' : 'Back'}
        </Link>

        <div className="space-y-8 animate-fade-up">
          <h1 className="text-3xl font-bold bg-gradient-to-r from-red-500 to-yellow-500 bg-clip-text text-transparent">
            {lang === 'ru' ? 'Проекты' : 'Projects'}
          </h1>

          {/* Группированные фильтры */}
          <div className="space-y-4">
            <div className="space-y-2">
              <h3 className="text-sm text-zinc-500">
                {lang === 'ru' ? 'Тип проекта' : 'Project Type'}
              </h3>
              <div className="flex flex-wrap gap-3">
                {categoryGroups.type.map(category => (
                  <button
                    key={category}
                    onClick={() => toggleCategory(category)}
                    className={`px-4 py-2 rounded-full border transition-all duration-300
                      ${selectedCategories.includes(category)
                        ? 'border-red-500 text-red-500 bg-red-500/10'
                        : 'border-zinc-800 text-zinc-400 hover:border-zinc-700 hover:text-zinc-300'
                      }`}
                  >
                    {categoryLocales[category][lang]}
                  </button>
                ))}
              </div>
            </div>

            <div className="space-y-2">
              <h3 className="text-sm text-zinc-500">
                {lang === 'ru' ? 'Технологии' : 'Technologies'}
              </h3>
              <div className="flex flex-wrap gap-3">
                {categoryGroups.tech.map(category => (
                  <button
                    key={category}
                    onClick={() => toggleCategory(category)}
                    className={`px-4 py-2 rounded-full border transition-all duration-300
                      ${selectedCategories.includes(category)
                        ? 'border-red-500 text-red-500 bg-red-500/10'
                        : 'border-zinc-800 text-zinc-400 hover:border-zinc-700 hover:text-zinc-300'
                      }`}
                  >
                    {categoryLocales[category][lang]}
                  </button>
                ))}
              </div>
            </div>

            {selectedCategories.length > 0 && (
              <button
                onClick={() => setSelectedCategories([])}
                className="text-sm text-zinc-400 hover:text-zinc-300 transition-colors"
              >
                {lang === 'ru' ? 'Сбросить фильтры' : 'Clear filters'}
              </button>
            )}
          </div>
          
          {/* Список проектов или пустое состояние */}
          <div className="grid grid-cols-1 gap-6">
            {filteredProjects.length > 0 ? (
              filteredProjects.map((project, index) => (
                <div 
                  key={index}
                  className="group relative flex flex-col gap-6 p-6 pt-14 rounded-lg 
                    border border-zinc-800/50 hover:border-zinc-700 transition-all duration-300 
                    hover:shadow-[0_0_30px_rgba(239,68,68,0.15)] bg-black/20 backdrop-blur-sm 
                    overflow-hidden animate-fade-up"
                  style={{ 
                    opacity: 0,
                    animation: 'fadeIn 0.5s ease-out forwards',
                    animationDelay: `${index * 0.1}s`
                  }}
                >
                  {/* Фоновое изображение */}
                  {project.image ? (
                    <div className="absolute inset-0 -z-10">
                      <Image
                        src={project.image}
                        alt=""
                        fill
                        className="object-cover opacity-5 blur-xl scale-110"
                      />
                      <div className="absolute inset-0 bg-gradient-to-br from-black/90 via-black/80 to-black/90" />
                    </div>
                  ) : (
                    <div className="absolute inset-0 -z-10 bg-gradient-to-br from-zinc-900/50 via-black to-zinc-900/50" />
                  )}

                  {/* Контент */}
                  <div className="flex-1 flex flex-col">
                    <h3 className="text-xl font-semibold mb-2 bg-gradient-to-r from-red-500 to-yellow-500 
                      bg-clip-text text-transparent group-hover:animate-gradient-x relative"
                    >
                      {project.title}
                      <div className="absolute -inset-x-6 -inset-y-2 bg-gradient-to-r from-red-500/10 to-yellow-500/10 
                        blur-lg opacity-0 group-hover:opacity-100 transition-opacity -z-10" />
                    </h3>

                    <p className="text-zinc-400 mb-6 flex-grow group-hover:text-zinc-300 transition-colors">
                      {project.description[lang]}
                    </p>

                    <div className="flex flex-wrap gap-3">
                      {project.tech.map(tech => (
                        <div 
                          key={tech.name}
                          className="flex items-center gap-2 text-zinc-400 group-hover:text-zinc-300 
                            transition-colors"
                        >
                          {tech.icon}
                          <span className="text-sm">{tech.name}</span>
                          <span className="text-xs text-zinc-500">v{tech.version}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Бейджи категорий - переместим их выше */}
                  <div className="absolute top-4 right-4 flex flex-wrap gap-2 justify-end max-w-[calc(100%-2rem)]">
                    {project.categories.map(category => (
                      <span
                        key={category}
                        className="px-2 py-1 text-xs rounded-full bg-black/40 border border-zinc-800
                          text-zinc-400 whitespace-nowrap"
                      >
                        {categoryLocales[category][lang]}
                      </span>
                    ))}
                  </div>
                </div>
              ))
            ) : (
              <EmptyState lang={lang} />
            )}
          </div>
        </div>
      </div>
    </div>
  );
} 
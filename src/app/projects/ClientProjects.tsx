'use client';

import React, { useState } from 'react';
import { FaArrowLeft } from 'react-icons/fa';
import Link from 'next/link';
import Image from 'next/image';
import { SiNextdotjs, SiTypescript, SiTailwindcss } from 'react-icons/si';

type ProjectCategory = 'personal' | 'commercial' | 'frontend' | 'backend' | 'bots';

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
  categories: ProjectCategory[];
}

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
];

const EmptyState = ({ lang }: { lang: 'ru' | 'en' }) => (
  <div className="flex flex-col items-center justify-center p-12 text-center animate-fade-up">
    <div className="text-6xl mb-4 animate-bounce">🤔</div>
    <h3 className="text-xl font-semibold mb-2 bg-gradient-to-r from-red-500 to-yellow-500 bg-clip-text text-transparent">
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

interface ClientProjectsProps {
  initialLang: 'ru' | 'en';
}

export default function ClientProjects({ initialLang }: ClientProjectsProps) {
  const [lang, setLang] = useState<'ru' | 'en'>(initialLang);
  const [selectedCategories, setSelectedCategories] = useState<ProjectCategory[]>([]);

  const filteredProjects = projects.filter(project => 
    selectedCategories.length === 0 || 
    selectedCategories.every(category => project.categories.includes(category))
  );

  const handleCategoryToggle = (category: ProjectCategory) => {
    setSelectedCategories(prev => 
      prev.includes(category)
        ? prev.filter(c => c !== category)
        : [...prev, category]
    );
  };

  const clearFilters = () => {
    setSelectedCategories([]);
  };

  return (
    <div className="min-h-screen bg-black text-white p-8">
      <div className="max-w-4xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <Link 
            href="/"
            className="inline-flex items-center gap-2 text-zinc-400 hover:text-white transition-colors"
          >
            <FaArrowLeft />
            {lang === 'ru' ? 'Назад' : 'Back'}
          </Link>
          
          <button
            onClick={() => setLang(lang === 'ru' ? 'en' : 'ru')}
            className="px-3 py-1.5 rounded-full text-sm bg-zinc-800/50 text-zinc-400 
              border border-zinc-800 hover:border-zinc-700 transition-all"
          >
            {lang === 'ru' ? 'EN' : 'RU'}
          </button>
        </div>

        <div className="space-y-8">
          <div className="flex flex-wrap items-center gap-2">
            {Object.entries(categoryLocales).map(([category, labels]) => (
              <button
                key={category}
                className={`px-3 py-1.5 rounded-full text-sm transition-all ${
                  selectedCategories.includes(category as ProjectCategory)
                    ? 'bg-red-500/20 text-red-500 border border-red-500/50'
                    : 'bg-zinc-800/50 text-zinc-400 border border-zinc-800 hover:border-zinc-700'
                }`}
                onClick={() => handleCategoryToggle(category as ProjectCategory)}
              >
                {labels[lang]}
              </button>
            ))}
            {selectedCategories.length > 0 && (
              <button
                className="px-3 py-1.5 rounded-full text-sm bg-zinc-800/50 text-zinc-400 
                  border border-zinc-800 hover:border-zinc-700 transition-all ml-2"
                onClick={clearFilters}
              >
                {lang === 'ru' ? 'Сбросить' : 'Clear'}
              </button>
            )}
          </div>

          <div className="grid grid-cols-1 gap-6">
            {filteredProjects.length > 0 ? (
              filteredProjects.map((project, index) => (
                <div 
                  key={index}
                  className="group relative flex flex-col gap-6 p-6 rounded-lg 
                    border border-zinc-800/50 hover:border-zinc-700 transition-all duration-300 
                    hover:shadow-[0_0_30px_rgba(239,68,68,0.15)] bg-black/20 backdrop-blur-sm 
                    overflow-hidden"
                  style={{ 
                    opacity: 0,
                    animation: 'fadeIn 0.5s ease-out forwards',
                    animationDelay: `${index * 0.1}s`
                  }}
                >
                  {project.image && (
                    <div className="absolute inset-0 -z-10">
                      <Image
                        src={project.image}
                        alt=""
                        fill
                        className="object-cover opacity-5 blur-xl scale-110"
                      />
                      <div className="absolute inset-0 bg-gradient-to-br from-black/90 via-black/80 to-black/90" />
                    </div>
                  )}

                  <div className="flex flex-wrap gap-2 md:absolute md:top-4 md:right-4 md:max-w-[calc(100%-2rem)]
                    order-first md:order-none"
                  >
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

                  <div className="flex-1 flex flex-col">
                    <h3 className="text-xl font-semibold mb-2 bg-gradient-to-r from-red-500 to-yellow-500 
                      bg-clip-text text-transparent group-hover:animate-gradient-x relative"
                    >
                      {project.title}
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
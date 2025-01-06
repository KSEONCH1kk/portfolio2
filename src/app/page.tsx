'use client';

import { useState } from 'react';
import DateTime from '@/components/DateTime';
import Weather from '@/components/Weather';
import { FaGithub, FaTelegram, FaCode, FaRocket, FaClock, FaCloud, FaLink, FaMoon, FaSun, FaLanguage, FaChevronRight } from 'react-icons/fa';
import { BiCodeAlt } from 'react-icons/bi';
import { SiJavascript, SiTypescript, SiReact, SiNextdotjs, SiNodedotjs, SiTailwindcss, SiGit, SiDocker, SiPostgresql, SiVuedotjs, SiPython, SiRust, SiGo } from 'react-icons/si';
import Link from 'next/link';
import Image from 'next/image';

type SkillCategory = 'current' | 'learning' | 'interested';
type LocaleKey = `${SkillCategory}Skills`;

const locales: Record<'ru' | 'en', Record<LocaleKey | 'greeting' | 'about' | 'viewAllSkills' | 'viewAllProjects' | 'skillsDescription', string>> = {
  ru: {
    greeting: 'Привет! Я',
    about: 'Привет! Мне 14 лет, я фуллстак-разработчик, работаю с Typescript. Пишу фронтенд на Next.js и React, бекенд и ботов на Python. Сейчас изучаю Java для моддинга Minecraft и разрабатываю плагины для серверов в свободное время. Готов принять заказы на создание фронтенда, бекенда или ботов. Если вас это интересует — свяжитесь со мной!',
    viewAllSkills: 'Просмотреть все навыки',
    viewAllProjects: 'Посмотреть все проекты',
    skillsDescription: 'Языки, которые я хочу выучить, фреймворки, с которыми я работаю, и прочие классные штуки!',
    currentSkills: 'Текущие навыки',
    learningSkills: 'Изучаю',
    interestedSkills: 'Интересуюсь'
  },
  en: {
    greeting: 'Hi! I\'m',
    about: 'Hi! I\'m 14 years old and a full-stack developer specializing in TypeScript. I work on the frontend using Next.js and React, and on the backend and bots with Python. Currently, I\'m learning Java for Minecraft modding and developing plugins for servers in my free time. I\'m open for orders to create frontend, backend, or bots. If you\'re interested, feel free to reach out!',
    viewAllSkills: 'View all skills',
    viewAllProjects: 'View all projects',
    skillsDescription: 'Languages I want to learn, frameworks I work with, and other cool stuff!',
    currentSkills: 'Current skills',
    learningSkills: 'Learning',
    interestedSkills: 'Interested in'
  }
};

const skills = [
  { name: 'JavaScript', icon: <SiJavascript className="text-yellow-400" /> },
  { name: 'TypeScript', icon: <SiTypescript className="text-blue-400" /> },
  { name: 'React', icon: <SiReact className="text-blue-500" /> },
  { name: 'Next.js', icon: <SiNextdotjs className="text-white" /> },
  { name: 'Node.js', icon: <SiNodedotjs className="text-green-500" /> },
  { name: 'TailwindCSS', icon: <SiTailwindcss className="text-cyan-400" /> },
  { name: 'Git', icon: <SiGit className="text-orange-500" /> },
  { name: 'PostgreSQL', icon: <SiPostgresql className="text-blue-400" /> },
];

const extendedSkills = {
  current: skills,
  learning: [
    { name: 'Vue.js', icon: <SiVuedotjs className="text-green-400" /> },
    { name: 'Python', icon: <SiPython className="text-blue-400" /> },
  ],
  interested: [
    { name: 'Rust', icon: <SiRust className="text-orange-400" /> },
    { name: 'Go', icon: <SiGo className="text-blue-400" /> },
  ]
};

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
}

const projects: Project[] = [
  {
    title: 'Portfolio Website',
    description: {
      ru: 'Персональный веб-сайт портфолио с анимациями и интерактивными элементами',
      en: 'Personal portfolio website with animations and interactive elements'
    },
    tech: [
      { 
        name: 'Next.js', 
        version: '15.1.3',
        icon: <SiNextdotjs className="text-white" />
      },
      { 
        name: 'TypeScript',
        version: '5.0.0',
        icon: <SiTypescript className="text-blue-400" />
      },
      { 
        name: 'TailwindCSS',
        version: '3.3.0',
        icon: <SiTailwindcss className="text-cyan-400" />
      }
    ],
    image: '/project1.png'
  }
];

type ProjectCategory = 'personal' | 'commercial' | 'frontend' | 'backend' | 'bots';

const categoryLocales: Record<ProjectCategory, { ru: string; en: string }> = {
  personal: { ru: 'Личные проекты', en: 'Personal Projects' },
  frontend: { ru: 'Фронтенд', en: 'Frontend' },
  backend: { ru: 'Бекенд', en: 'Backend' },
  commercial: { ru: 'Проекты на заказ', en: 'Commercial Projects' },
  bots: { ru: 'Боты', en: 'Bots' }
};

const featuredProject = {
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
};

export default function Home() {
  const [lang, setLang] = useState<'ru' | 'en'>('ru');
  const [theme, setTheme] = useState<'dark' | 'light'>('dark');
  const [showAllSkills, setShowAllSkills] = useState(false);
  const t = locales[lang];

  return (
    <div className={`min-h-screen p-8 overflow-hidden transition-colors duration-300 ${
      theme === 'dark' 
        ? 'bg-black text-white' 
        : 'bg-white text-black'
    }`}>
      <div className="fixed top-4 right-4 flex items-center gap-4 z-20">
        <button
          onClick={() => setLang(lang === 'ru' ? 'en' : 'ru')}
          className="p-2 rounded-full hover:bg-zinc-800 transition-colors"
        >
          <FaLanguage className="w-6 h-6" />
          <span className="sr-only">Switch language</span>
        </button>
      </div>

      <div className="max-w-4xl mx-auto space-y-8">
        {/* Username Section */}
        <section className="relative flex flex-col justify-center items-center py-20">
          <div className="absolute inset-0 flex items-center justify-center animate-fade-scale">
            <div className="w-full max-w-[600px] h-[200px] rounded-full blur-[100px] transition-colors duration-300 
              bg-gradient-to-r from-red-500/20 via-yellow-500/20 to-red-500/20" />
          </div>
          <p className="text-xl md:text-2xl text-zinc-400 mb-4 animate-fade-up">
            {t.greeting}
          </p>
          <h1 className="text-5xl md:text-8xl font-bold relative z-10 animate-gradient-x 
            bg-clip-text text-transparent text-center"
          >
            @kseonyt
          </h1>
        </section>

        {/* Files Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* System Files */}
          <div className="space-y-6">
            <div className="animate-fade-up delay-1">
              <div className={`flex items-center gap-2 text-sm mb-2 transition-colors duration-300 ${
                theme === 'dark' ? 'text-zinc-400' : 'text-black/60'
              }`}>
                <BiCodeAlt className={theme === 'dark' ? 'text-red-500' : 'text-red-600'} />
                about.md
              </div>
              <div className={`backdrop-blur-sm p-6 rounded-lg border transition-all duration-300 
                hover:scale-[1.02] ${
                theme === 'dark'
                  ? 'bg-black/40 border-zinc-800 hover:border-zinc-700'
                  : 'bg-white border-black/10 hover:border-black/20 shadow-sm hover:shadow-md'
              }`}>
                <p className={`transition-colors duration-300 break-words ${
                  theme === 'dark' ? 'text-zinc-300' : 'text-black/80'
                }`}>
                  {t.about}
                </p>
              </div>
            </div>

            <div className="animate-fade-up delay-2">
              <div className="flex items-center justify-between text-sm text-zinc-400 mb-2">
                <div className="flex items-center gap-2">
                  <FaRocket />
                  skills.json
                </div>
                <Link
                  href={`/skills?lang=${lang}`}
                  className="flex items-center gap-1 hover:text-zinc-300 transition-colors"
                >
                  {t.viewAllSkills}
                  <FaChevronRight />
                </Link>
              </div>
              <div className="bg-black/40 backdrop-blur-sm p-6 rounded-lg border border-zinc-800">
                {showAllSkills ? (
                  <div className="skills-expanded">
                    <p className="text-zinc-400 mb-6">{t.skillsDescription}</p>
                    
                    {Object.entries(extendedSkills).map(([category, skills], categoryIndex) => (
                      <div key={category} className="mb-8 last:mb-0">
                        <h3 className="text-zinc-300 mb-4">
                          {t[`${category as SkillCategory}Skills` as LocaleKey]}
                        </h3>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                          {skills.map((skill, index) => (
                            <div 
                              key={skill.name}
                              className="flex items-center gap-2 text-zinc-300 skill-item"
                              style={{ animationDelay: `${(categoryIndex * skills.length + index) * 50}ms` }}
                            >
                              {skill.icon}
                              <span className="truncate">{skill.name}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {skills.map(skill => (
                      <div key={skill.name} className="flex items-center gap-2 text-zinc-300">
                        {skill.icon}
                        <span className="truncate">{skill.name}</span>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Live Data */}
          <div className="space-y-6">
            <div className="animate-fade-up delay-1">
              <div className={`flex items-center gap-2 text-sm transition-colors duration-300 ${
                theme === 'dark' ? 'text-zinc-400' : 'text-zinc-500'
              }`}>
                <FaClock />
                time.live
              </div>
              <DateTime lang={lang} />
            </div>

            <div className="animate-fade-up delay-2">
              <div className={`flex items-center gap-2 text-sm transition-colors duration-300 ${
                theme === 'dark' ? 'text-zinc-400' : 'text-zinc-500'
              }`}>
                <FaCloud />
                weather.json
              </div>
              <Weather lang={lang} />
            </div>
          </div>
        </div>

        {/* Projects Section */}
        <div className="animate-fade-up delay-3">
          <div className="flex items-center justify-between text-sm text-zinc-400 mb-2">
            <div className="flex items-center gap-2">
              <FaGithub />
              projects.json
            </div>
            <Link
              href={`/projects?lang=${lang}`}
              className="flex items-center gap-1 hover:text-zinc-300 transition-colors"
            >
              {t.viewAllProjects}
              <FaChevronRight />
            </Link>
          </div>
          <div className="bg-black/40 backdrop-blur-sm p-6 rounded-lg border border-zinc-800">
            <div className="grid grid-cols-1 gap-6">
              <div 
                className="group relative flex flex-col gap-6 p-6 rounded-lg 
                  border border-zinc-800/50 hover:border-zinc-700 transition-all duration-300 
                  hover:shadow-[0_0_30px_rgba(239,68,68,0.15)] bg-black/20 backdrop-blur-sm 
                  overflow-hidden"
                style={{ 
                  opacity: 0,
                  animation: 'fadeIn 0.5s ease-out forwards',
                  animationDelay: '0.3s'
                }}
              >
                {featuredProject.image && (
                  <div className="absolute inset-0 -z-10">
                    <Image
                      src={featuredProject.image}
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
                  {featuredProject.categories.map(category => (
                    <span
                      key={category}
                      className="px-2 py-1 text-xs rounded-full bg-black/40 border border-zinc-800
                        text-zinc-400 whitespace-nowrap"
                    >
                      {categoryLocales[category as ProjectCategory][lang]}
                    </span>
                  ))}
                </div>

                <div className="flex-1 flex flex-col">
                  <h3 className="text-xl font-semibold mb-2 bg-gradient-to-r from-red-500 to-yellow-500 
                    bg-clip-text text-transparent group-hover:animate-gradient-x relative"
                  >
                    {featuredProject.title}
                  </h3>

                  <p className="text-zinc-400 mb-6 flex-grow group-hover:text-zinc-300 transition-colors">
                    {featuredProject.description[lang]}
                  </p>

                  <div className="flex flex-wrap gap-3">
                    {featuredProject.tech.map(tech => (
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
            </div>
          </div>
        </div>

        {/* Social Links */}
        <div className="animate-fade-up delay-4">
          <div className={`flex items-center gap-2 text-sm transition-colors duration-300 ${
            theme === 'dark' ? 'text-zinc-400' : 'text-zinc-500'
          }`}>
            <FaLink />
            social.links
          </div>
          <div className="bg-black/40 backdrop-blur-sm p-4 rounded-lg border border-zinc-800">
            <div className="flex justify-center gap-6">
              <a 
                href="https://github.com/KSEONCH1kk" 
                className="text-2xl hover:text-red-500 transition-all hover:scale-125"
          target="_blank"
          rel="noopener noreferrer"
        >
                <FaGithub />
        </a>
        <a
                href="https://t.me/kseonyt" 
                className="text-2xl hover:text-yellow-500 transition-all hover:scale-125"
          target="_blank"
          rel="noopener noreferrer"
        >
                <FaTelegram />
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

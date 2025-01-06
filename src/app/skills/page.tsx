'use client';

import React from 'react';
import { useState } from 'react';
import { FaArrowLeft, FaServer, FaJava, FaCode, FaWindows, FaPython } from 'react-icons/fa';
import Link from 'next/link';
import {
  SiJavascript, SiTypescript, SiPython, SiRust, SiGo,
  SiReact, SiNextdotjs, SiVuedotjs, SiTailwindcss, SiSass,
  SiNodedotjs, SiExpress, SiNestjs, SiDjango,
  SiGraphql, SiOpenai,
  SiGit, SiDocker, SiPostgresql, SiMongodb, SiRedis, SiDiscord
} from 'react-icons/si';

type SkillStatus = 'active' | 'learning' | 'used';

interface Skill {
  name: string;
  icon: React.ReactNode;
  level: number;
  status: SkillStatus;
  description: {
    ru: string;
    en: string;
  };
}

interface SkillCategory {
  ru: string;
  en: string;
  description: {
    ru: string;
    en: string;
  };
  skills: Skill[];
}

const skillCategories: Record<string, SkillCategory> = {
  programming: {
    ru: 'Языки программирования',
    en: 'Programming Languages',
    description: {
      ru: 'Основные языки программирования, которые я использую для разработки',
      en: 'Main programming languages I use for development'
    },
    skills: [
      { 
        name: 'JavaScript',
        icon: <SiJavascript className="text-yellow-400" />,
        level: 90,
        status: 'active',
        description: {
          ru: 'Основной язык для веб-разработки. Использую для создания интерактивных интерфейсов и серверной логики',
          en: 'Primary language for web development. Used for creating interactive interfaces and server logic'
        }
      },
      { 
        name: 'TypeScript',
        icon: <SiTypescript className="text-blue-400" />,
        level: 85,
        status: 'active',
        description: {
          ru: 'Типизированный JavaScript для более надежного и поддерживаемого кода',
          en: 'Typed JavaScript for more reliable and maintainable code'
        }
      },
      {
        name: 'Python',
        icon: <SiPython className="text-blue-500" />,
        level: 60,
        status: 'active',
        description: {
          ru: 'Использую для автоматизации, обработки данных и машинного обучения',
          en: 'Used for automation, data processing and machine learning'
        }
      },
      {
        name: 'Rust',
        icon: <SiRust className="text-orange-500" />,
        level: 30,
        status: 'learning',
        description: {
          ru: 'Изучаю для системного программирования и высокопроизводительных приложений',
          en: 'Learning for systems programming and high-performance applications'
        }
      },
      {
        name: 'Go',
        icon: <SiGo className="text-blue-400" />,
        level: 25,
        status: 'learning',
        description: {
          ru: 'Исследую для создания эффективных микросервисов и утилит',
          en: 'Exploring for building efficient microservices and utilities'
        }
      },
      {
        name: 'Java',
        icon: <FaJava className="text-red-500" />,
        level: 55,
        status: 'active',
        description: {
          ru: 'Разработка корпоративных приложений и Android-приложений',
          en: 'Enterprise and Android application development'
        }
      },
      {
        name: 'C++',
        icon: <FaCode className="text-blue-600" />,
        level: 45,
        status: 'active',
        description: {
          ru: 'Системное программирование и оптимизация производительности',
          en: 'Systems programming and performance optimization'
        }
      },
      {
        name: 'C#',
        icon: <FaWindows className="text-purple-500" />,
        level: 50,
        status: 'active',
        description: {
          ru: 'Разработка приложений на платформе .NET',
          en: '.NET platform application development'
        }
      }
    ]
  },
  frontend: {
    ru: 'Фронтенд',
    en: 'Frontend',
    description: {
      ru: 'Фреймворки и инструменты для создания пользовательских интерфейсов',
      en: 'Frameworks and tools for creating user interfaces'
    },
    skills: [
      {
        name: 'React',
        icon: <SiReact className="text-blue-500" />,
        level: 90,
        status: 'active',
        description: {
          ru: 'Основной фреймворк для разработки современных веб-приложений',
          en: 'Main framework for developing modern web applications'
        }
      },
      {
        name: 'Next.js',
        icon: <SiNextdotjs className="text-white" />,
        level: 85,
        status: 'active',
        description: {
          ru: 'Использую для создания оптимизированных React приложений с SSR',
          en: 'Used for creating optimized React applications with SSR'
        }
      },
      {
        name: 'Vue.js',
        icon: <SiVuedotjs className="text-green-400" />,
        level: 40,
        status: 'learning',
        description: {
          ru: 'Изучаю как альтернативный фреймворк для расширения навыков',
          en: 'Learning as an alternative framework to expand skills'
        }
      },
      {
        name: 'TailwindCSS',
        icon: <SiTailwindcss className="text-cyan-400" />,
        level: 95,
        status: 'active',
        description: {
          ru: 'Предпочитаемый инструмент для стилизации и создания адаптивных интерфейсов',
          en: 'Preferred tool for styling and creating responsive interfaces'
        }
      }
    ]
  },
  backend: {
    ru: 'Бэкенд',
    en: 'Backend',
    description: {
      ru: 'Технологии для разработки серверной части приложений',
      en: 'Technologies for backend development'
    },
    skills: [
      {
        name: 'Node.js',
        icon: <SiNodedotjs className="text-green-500" />,
        level: 85,
        status: 'active',
        description: {
          ru: 'Платформа для создания быстрых и масштабируемых серверных приложений',
          en: 'Platform for building fast and scalable server applications'
        }
      },
      {
        name: 'Express',
        icon: <SiExpress className="text-white" />,
        level: 80,
        status: 'active',
        description: {
          ru: 'Быстрый и минималистичный веб-фреймворк для Node.js',
          en: 'Fast, unopinionated web framework for Node.js'
        }
      },
      {
        name: 'NestJS',
        icon: <SiNestjs className="text-red-500" />,
        level: 70,
        status: 'active',
        description: {
          ru: 'Прогрессивный фреймворк для создания эффективных серверных приложений',
          en: 'Progressive framework for building efficient server-side applications'
        }
      },
      {
        name: 'Django',
        icon: <SiDjango className="text-green-600" />,
        level: 50,
        status: 'active',
        description: {
          ru: 'Python фреймворк для быстрой разработки веб-приложений',
          en: 'Python framework for rapid web development'
        }
      },
      {
        name: 'Discord.JS',
        icon: <SiDiscord className="text-indigo-400" />,
        level: 75,
        status: 'active',
        description: {
          ru: 'Библиотека для создания Discord ботов на Node.js',
          en: 'Library for creating Discord bots with Node.js'
        }
      },
      {
        name: 'Flask',
        icon: <FaPython className="text-gray-300" />,
        level: 65,
        status: 'active',
        description: {
          ru: 'Легковесный фреймворк для создания бекенда на Python',
          en: 'Lightweight Python backend framework'
        }
      }
    ]
  },
  api: {
    ru: 'API',
    en: 'API',
    description: {
      ru: 'Технологии для создания и работы с API',
      en: 'Technologies for creating and working with APIs'
    },
    skills: [
      {
        name: 'REST',
        icon: <FaServer className="text-orange-400" />,
        level: 90,
        status: 'learning',
        description: {
          ru: 'Архитектурный стиль для создания веб-сервисов',
          en: 'Architectural style for creating web services'
        }
    }
    ]
  },
  other: {
    ru: 'Прочее',
    en: 'Other',
    description: {
      ru: 'Дополнительные инструменты и технологии',
      en: 'Additional tools and technologies'
    },
    skills: [
      {
        name: 'Git',
        icon: <SiGit className="text-orange-500" />,
        level: 90,
        status: 'active',
        description: {
          ru: 'Система контроля версий для отслеживания изменений в коде',
          en: 'Version control system for tracking code changes'
        }
      },
      {
        name: 'PostgreSQL',
        icon: <SiPostgresql className="text-blue-400" />,
        level: 80,
        status: 'active',
        description: {
          ru: 'Мощная объектно-реляционная база данных',
          en: 'Powerful object-relational database'
        }
      },
      {
        name: 'MongoDB',
        icon: <SiMongodb className="text-green-500" />,
        level: 70,
        status: 'active',
        description: {
          ru: 'NoSQL база данных для современных приложений',
          en: 'NoSQL database for modern applications'
        }
      }
    ]
  }
};

export default function SkillsPage() {
  const [lang, setLang] = useState<'ru' | 'en'>('ru');

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

        <div className="space-y-12 animate-fade-up">
          {Object.entries(skillCategories).map(([key, category], categoryIndex) => (
            <section 
              key={key} 
              className="space-y-4"
              style={{ animationDelay: `${categoryIndex * 0.1}s` }}
            >
              <div className="mb-6 animate-fade-scale" style={{ animationDelay: `${categoryIndex * 0.1 + 0.2}s` }}>
                <h2 className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-red-500 to-yellow-500">
                  {category[lang]}
                </h2>
                <p className="text-zinc-400 mt-2">
                  {category.description[lang]}
                </p>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {category.skills.map((skill, skillIndex) => (
                  <div 
                    key={skill.name}
                    className="bg-black/40 backdrop-blur-sm p-4 rounded-lg border border-zinc-800 
                      hover:border-zinc-700 transition-all group hover:shadow-[0_0_15px_rgba(239,68,68,0.1)] 
                      hover:-translate-y-0.5 animate-fade-up"
                    style={{ animationDelay: `${categoryIndex * 0.1 + skillIndex * 0.05 + 0.3}s` }}
                  >
                    <div className="flex items-center gap-3">
                      <div className="p-2 rounded-lg bg-zinc-900/50 group-hover:bg-zinc-900/80 
                        transition-all duration-300 group-hover:shadow-[0_0_10px_rgba(239,68,68,0.2)]">
                        {skill.icon}
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center gap-2">
                          <h3 className="font-medium group-hover:text-transparent group-hover:bg-clip-text 
                            group-hover:bg-gradient-to-r group-hover:from-red-500 group-hover:to-yellow-500 
                            transition-all duration-300">
                            {skill.name}
                          </h3>
                          <div className={`w-2 h-2 rounded-full ${
                            skill.status === 'active' 
                              ? 'bg-green-500 animate-pulse shadow-[0_0_10px_rgba(34,197,94,0.5)]'
                              : skill.status === 'learning'
                                ? 'bg-yellow-500 animate-pulse shadow-[0_0_10px_rgba(234,179,8,0.5)]'
                                : 'bg-zinc-500'
                          }`} />
                        </div>
                        <p className="text-sm text-zinc-400 group-hover:text-zinc-300 transition-colors">
                          {skill.description[lang]}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              <div 
                className="flex items-center gap-6 text-sm text-zinc-400 mt-8 animate-fade-up"
                style={{ animationDelay: `${categoryIndex * 0.1 + 0.5}s` }}
              >
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse shadow-[0_0_10px_rgba(34,197,94,0.5)]" />
                  <span>{lang === 'ru' ? 'Активно использую' : 'In active use'}</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-yellow-500 animate-pulse shadow-[0_0_10px_rgba(234,179,8,0.5)]" />
                  <span>{lang === 'ru' ? 'Изучаю' : 'Learning'}</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-zinc-500" />
                  <span>{lang === 'ru' ? 'Использовал' : 'Used'}</span>
                </div>
              </div>
            </section>
          ))}
        </div>
      </div>
    </div>
  );
}
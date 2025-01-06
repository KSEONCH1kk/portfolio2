import React from 'react';
import ClientProjects from './ClientProjects';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Projects | @kseonyt',
  description: 'My projects showcase'
};

interface Props {
  searchParams: Record<string, string | string[] | undefined>;
}

export default function ProjectsPage(props: Props) {
  const lang = props.searchParams?.lang === 'en' ? 'en' : 'ru';
  return <ClientProjects initialLang={lang} />;
} 
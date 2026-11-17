'use client';

import { useTranslation } from 'react-i18next';
import Image from 'next/image';
import type { MainProps } from './Main.types';

export const Main = (props: MainProps) => {
  const { t } = useTranslation('main');
  const { description = t('description'), title = t('title') } = props;

  return (
    <main className="bg-default-background w-full h-screen text-white p-8 text-center flex-col flex justify-center items-center">
      <Image alt={t('logoAlt')} className="w-64 mb-1" height={56} src="/img/logo.svg" width={256} />

      <h1 className="text-2xl font-bold">{title}</h1>
      <h2 className="text-xl font-normal">{description}</h2>

      <Image
        alt={t('heroAlt')}
        className="w-[min(30rem,_100%)] mt-8"
        height={42}
        src="/img/hero-illustration.svg"
        width={48}
      />
    </main>
  );
};

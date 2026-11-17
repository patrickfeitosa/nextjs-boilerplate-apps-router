'use client';

import { useTranslation } from 'react-i18next';

const NotFound = () => {
  const { t } = useTranslation('common');

  return (
    <main className="flex h-screen flex-col items-center justify-center gap-2 p-8 text-center">
      <h1 className="text-2xl font-bold">{t('notFound.title')}</h1>
      <p>{t('notFound.description')}</p>
    </main>
  );
};

export default NotFound;

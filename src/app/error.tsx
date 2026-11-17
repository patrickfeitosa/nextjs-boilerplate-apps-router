'use client';

import { useTranslation } from 'react-i18next';

type ErrorPageProps = {
  error: Error & { digest?: string };
  reset: () => void;
};

const ErrorPage = (props: ErrorPageProps) => {
  const { reset } = props;
  const { t } = useTranslation('common');

  return (
    <main className="flex h-screen flex-col items-center justify-center gap-2 p-8 text-center">
      <h1 className="text-2xl font-bold">{t('error.title')}</h1>
      <p>{t('error.description')}</p>
      <button className="rounded border px-4 py-2" onClick={reset} type="button">
        {t('error.retry')}
      </button>
    </main>
  );
};

export default ErrorPage;

import React from 'react';
import { useRouter } from 'next/router';
import { HomePage } from '../../components/Home/HomePage';
import { ErrorBoundary } from '../../sharedComponents/ErrorBoundary/ErrorBoundary';

export default function Page() {
  const router = useRouter();
  const { pageNumber } = router.query;

  return (
    <ErrorBoundary>
      <HomePage pageNumber={pageNumber as string} />
    </ErrorBoundary>
  );
}

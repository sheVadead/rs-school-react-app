import React from 'react';
import { Details } from '../../../../components/Home/components/Details/Details';
import { useRouter } from 'next/router';
import { HomePage } from '../../../../components/Home/HomePage';
import { ErrorBoundary } from '../../../../sharedComponents/ErrorBoundary/ErrorBoundary';

export default function DetailsPage() {
  const router = useRouter();
  const { details, pageNumber } = router.query;
  return (
    <>
      <ErrorBoundary>
        <HomePage pageNumber={pageNumber as string} />

        {details && <Details />}
      </ErrorBoundary>
    </>
  );
}

'use client';

import React from 'react';
import { useParams } from 'next/navigation';
import { HomePage } from '../../components/Home/HomePage';
import { ErrorBoundary } from '../../sharedComponents/ErrorBoundary/ErrorBoundary';
import { QueryParams } from '../../types';

export default function Page() {
  const { pageNumber } = useParams<QueryParams>();

  return (
    <ErrorBoundary>
      <HomePage pageNumber={pageNumber as string} />
    </ErrorBoundary>
  );
}

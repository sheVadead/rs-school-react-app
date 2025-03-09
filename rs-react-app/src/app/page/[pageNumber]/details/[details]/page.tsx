'use client';

import React, { FC } from 'react';
import { Details } from '../../../../../components/Home/components/Details/Details';
import { useParams } from 'next/navigation';
import { HomePage } from '../../../../../components/Home/HomePage';
import { ErrorBoundary } from '../../../../../sharedComponents/ErrorBoundary/ErrorBoundary';
import { QueryParams } from '../../../../../types';

const DetailsPage: FC = () => {
  const { pageNumber, details } = useParams<QueryParams>();

  return (
    <>
      <ErrorBoundary>
        <HomePage pageNumber={pageNumber as string} />

        {details && <Details />}
      </ErrorBoundary>
    </>
  );
};

export default DetailsPage;

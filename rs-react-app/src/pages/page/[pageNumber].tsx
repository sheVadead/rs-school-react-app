import React from 'react';
import { useRouter } from 'next/router';
import { HomePage } from '../../components/Home/HomePage';

export default function Page() {
  const router = useRouter();
  const { pageNumber } = router.query;

  return <HomePage pageNumber={pageNumber as string} />;
}

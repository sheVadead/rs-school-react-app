"use client"

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

const Home = () => {
  const router = useRouter();

  useEffect(() => {
    router.push('/page/1');
  }, [router]);

  return null;
};

export default Home;

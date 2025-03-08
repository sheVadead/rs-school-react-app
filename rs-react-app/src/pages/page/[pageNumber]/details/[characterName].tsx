import { Details } from '../../../../components/Home/components/Details/Details';
import { useRouter } from 'next/router';

export default function DetailsPage() {
  const router = useRouter();
  const { characterName } = router.query;

  return <Details characterName={characterName as string} />;
}
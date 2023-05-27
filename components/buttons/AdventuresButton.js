import Link from 'next/link';
import { Button } from 'react-bootstrap';

export default function DiscoveriesButton() {
  return (
    <Link href="/adventures/personal/myAdventures" passHref>
      <Button>Adventures</Button>;
    </Link>
  );
}

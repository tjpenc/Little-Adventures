import Link from 'next/link';
import { Button } from 'react-bootstrap';

export default function DiscoveriesButton() {
  return (
    <Link href="/discoveries/personal/myDiscoveries" passHref>
      <Button>Discoveries</Button>;
    </Link>
  );
}

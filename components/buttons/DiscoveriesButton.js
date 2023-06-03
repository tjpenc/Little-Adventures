import Link from 'next/link';
import PropTypes from 'prop-types';
import { Button } from 'react-bootstrap';

export default function DiscoveriesButton({ toExplore }) {
  return (
    <>
      {toExplore
        ? (
          <Link href="/toExplore/discoveries" passHref>
            <Button>Discoveries</Button>
          </Link>
        ) : (
          <Link href="/discoveries/personal/myDiscoveries" passHref>
            <Button>Discoveries</Button>
          </Link>
        )}
    </>
  );
}

DiscoveriesButton.propTypes = {
  toExplore: PropTypes.bool.isRequired,
};

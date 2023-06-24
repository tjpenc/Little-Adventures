import Link from 'next/link';
import PropTypes from 'prop-types';
import { BasicButton } from '../../styles/commonStyles';

export default function DiscoveriesButton({ toExplore }) {
  return (
    <>
      {toExplore
        ? (
          <Link href="/toExplore/discoveries" passHref>
            <BasicButton className="thicker">Discoveries Explore Page</BasicButton>
          </Link>
        ) : (
          <Link href="/discoveries/personal/myDiscoveries" passHref>
            <BasicButton className="thicker">My Discoveries</BasicButton>
          </Link>
        )}
    </>
  );
}

DiscoveriesButton.propTypes = {
  toExplore: PropTypes.bool.isRequired,
};

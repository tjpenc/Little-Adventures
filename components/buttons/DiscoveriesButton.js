import Link from 'next/link';
import PropTypes from 'prop-types';
import { BasicButton } from '../../styles/commonStyles';

export default function DiscoveriesButton({ toExplore }) {
  return (
    <>
      {toExplore
        ? (
          <Link href="/toExplore/discoveries" passHref>
            <BasicButton className="big_round_button">Discoveries to Find</BasicButton>
          </Link>
        ) : (
          <Link href="/discoveries/personal/myDiscoveries" passHref>
            <BasicButton className="big_round_button">My Discoveries</BasicButton>
          </Link>
        )}
    </>
  );
}

DiscoveriesButton.propTypes = {
  toExplore: PropTypes.bool.isRequired,
};

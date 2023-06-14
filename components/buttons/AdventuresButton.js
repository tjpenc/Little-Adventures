import Link from 'next/link';
import PropTypes from 'prop-types';
import { BasicButton } from '../../styles/commonStyles';

export default function AdventuresButton({ toExplore }) {
  return (
    <>
      {toExplore
        ? (
          <Link href="/toExplore/adventures" passHref>
            <BasicButton className="big_round_button">Adventures To Explore</BasicButton>
          </Link>
        ) : (
          <Link href="/adventures/personal/myAdventures" passHref>
            <BasicButton className="big_round_button">My Adventures</BasicButton>
          </Link>
        )}
    </>
  );
}

AdventuresButton.propTypes = {
  toExplore: PropTypes.bool.isRequired,
};

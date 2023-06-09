import Link from 'next/link';
import PropTypes from 'prop-types';
import { Button } from 'react-bootstrap';

export default function AdventuresButton({ toExplore }) {
  return (
    <>
      {toExplore
        ? (
          <Link href="/toExplore/adventures" passHref>
            <Button>Adventures</Button>
          </Link>
        ) : (
          <Link href="/adventures/personal/myAdventures" passHref>
            <Button className="adventures_button">Adventures</Button>
          </Link>
        )}
    </>
  );
}

AdventuresButton.propTypes = {
  toExplore: PropTypes.bool.isRequired,
};

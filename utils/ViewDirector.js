import PropTypes from 'prop-types';
import styled from 'styled-components';
import { useAuth } from './context/authContext';
import Loading from '../components/Loading';
import Signin from '../components/Signin';
import NavBarAuth from '../components/NavBarAuth';

const ViewDirectorBasedOnUserAuthStatus = ({ component: Component, pageProps }) => {
  const { user, userLoading } = useAuth();

  // if user state is null, then show loader
  if (userLoading) {
    return <Loading />;
  }

  // what the user should see if they are logged in
  if (user) {
    return (
      <AppContainer>
        <NavContainer>
          <NavBarAuth />
        </NavContainer>
        <ContentContainer>
          <Component {...pageProps} />
        </ContentContainer>
      </AppContainer>
    );
  }

  return <Signin />;
};

export default ViewDirectorBasedOnUserAuthStatus;

ViewDirectorBasedOnUserAuthStatus.propTypes = {
  component: PropTypes.func.isRequired,
  pageProps: PropTypes.oneOfType([PropTypes.object]).isRequired,
};

const AppContainer = styled.div`
 display: flex;
`;

const NavContainer = styled.div`
  z-index: 1;
  width: 170px;
`;

const ContentContainer = styled.div`
  flex-grow: 1;
`;

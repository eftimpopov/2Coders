import React, { useContext, useRef, useEffect, useState } from 'react';
import './header.scss';
import logo from '../../assets/logo.png';
import { Link, useLocation } from 'react-router-dom';
import Modal, { ModalContent } from './../modal/Modal';
import { OutlineButton } from '../button/Button';
import tmdbAPI from '../../api/tmdbAPI';
import { MainContext } from '../../context/main';
import { isTokenValid } from './../../utils/helpers';

const headerNav = [
  {
    display: 'Home',
    path: '/',
  },
  {
    display: 'Movies',
    path: '/movie',
  },
  {
    display: 'TV Series',
    path: '/tv',
  },
];

const Header = () => {
  const { pathname } = useLocation();
  const headerRef = useRef();
  const active = headerNav.findIndex((e) => e.path === pathname);
  useEffect(() => {
    const shrinkHeader = () => {
      if (
        document.body.scrollTop > 100 ||
        document.documentElement.scrollTop > 100
      ) {
        headerRef.current.classList.add('shrink');
      } else {
        headerRef.current.classList.remove('shrink');
      }
    };
    window.addEventListener('scroll', shrinkHeader);
    return () => {
      window.removeEventListener('scroll', shrinkHeader);
    };
  }, []);

  const setModalActive = () => {
    const modal = document.querySelector('#login-modal');

    modal.classList.add('active');
  };

  return (
    <div ref={headerRef} className="header">
      <div className="header__wrap container">
        <div className="logo">
          <img src={logo} />
          <Link to="/">ReactFlix</Link>
        </div>
        <ul className="header__nav">
          {headerNav.map((e, i) => (
            <li key={i} className={`${i === active ? 'active' : ''}`}>
              <Link to={e.path}> {e.display} </Link>
            </li>
          ))}
          <li className="login-icon" onClick={setModalActive}>
            <i className="bx bxs-log-in"></i>
          </li>
          <LoginModal />
        </ul>
      </div>
    </div>
  );
};

const LoginModal = () => {
  const { user, setUser } = useContext(MainContext);

  let [username, setUsername] = useState('');
  let [password, setPassword] = useState('');
  let [isLogged, setIsLogged] = useState(isTokenValid);
  let [responseData, setResponseData] = useState('');
  let [hasErrorLogging, setHasErrorLogging] = useState('');

  const setUsernameF = (userN) => {
    setUsername((user) => (user = userN));
  };
  const setPasswordF = (userP) => {
    setPassword((pass) => (pass = userP));
  };
  //Function to log the user in and upddate the global state of the user.
  const login = async () => {
    let data;
    let responseToken = null;
    await tmdbAPI
      .getToken()
      .then((res) => {
        responseToken = res;
      })
      .catch((err) => {
        console.log(err);
      });
    data = {
      username: username,
      password: password,
      request_token: responseToken.request_token,
    };
    let loginUser = '';
    await tmdbAPI
      .loginWithUser(data)
      .then((res) => {
        loginUser = res;
        setHasErrorLogging(false);
      })
      .catch((err) => {
        setHasErrorLogging(true);
      });
    let sessionIdReq = await tmdbAPI.createSessionId({
      request_token: loginUser.request_token,
    });
    let sessionId = sessionIdReq.session_id;
    setResponseData((oldVal) => (oldVal = loginUser));
    var userData = { ...loginUser, sessionId };
    setUser(JSON.stringify(userData));
    setIsLogged((oldVal) => (oldVal = isTokenValid()));
  };

  //Function to log the user out and update the global state of the user.
  const logout = () => {
    localStorage.setItem('reactflixUser', '{"isNull" : true}');
    setUser('{"isNull" : true}');
    setIsLogged(false);
  };

  return (
    <Modal active={false} id={'login-modal'}>
      <ModalContent>
        <div className="login-form">
          {!isLogged ? (
            <>
              <input
                type="text"
                placeholder="Username"
                onChange={(e) => setUsernameF(e.target.value)}
                onKeyPress={(event) => {
                  if (event.key === 'Enter') {
                    login();
                  }
                }}
              />
              <input
                type="password"
                placeholder="Password"
                onChange={(e) => setPasswordF(e.target.value)}
                onKeyPress={(event) => {
                  if (event.key === 'Enter') {
                    login();
                  }
                }}
              />
              <OutlineButton onClick={login}>Log in</OutlineButton>{' '}
              {hasErrorLogging ? (
                <span className="err">Wrong username or password</span>
              ) : null}
            </>
          ) : (
            <div className="logout__container">
              <h3>Logged in</h3>
              <OutlineButton onClick={logout}>Log out</OutlineButton>
            </div>
          )}
        </div>
      </ModalContent>
    </Modal>
  );
};

export default Header;

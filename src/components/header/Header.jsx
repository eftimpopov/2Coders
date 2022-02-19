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

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [isLogged, setIsLogged] = useState(isTokenValid);
  const [responseData, setResponseData] = useState('');

  const setUsernameF = (userN) => {
    setUsername((user) => (user = userN));
  };
  const setPasswordF = (userP) => {
    setPassword((pass) => (pass = userP));
  };
  const login = async () => {
    let data, data1;
    let responseToken = null;
    responseToken = await tmdbAPI.getToken();
    data = {
      username: username,
      password: password,
      request_token: responseToken.request_token,
    };

    let loginUser = await tmdbAPI.loginWithUser(data);
    let sessionIdReq = await tmdbAPI.createSessionId({
      request_token: loginUser.request_token,
    });
    let sessionId = sessionIdReq.session_id;
    setResponseData((oldVal) => (oldVal = loginUser));
    var userData = { ...loginUser, sessionId };
    setUser(JSON.stringify(userData));
    setIsLogged((oldVal) => (oldVal = isTokenValid()));
  };
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
              />
              <input
                type="password"
                placeholder="Password"
                onChange={(e) => setPasswordF(e.target.value)}
              />
              <OutlineButton onClick={login}>Log in</OutlineButton>{' '}
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

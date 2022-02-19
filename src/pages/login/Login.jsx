import React, { useState } from 'react';
import './login.scss';
import tmdbAPI from '../../api/tmdbAPI';

import axios from 'axios';

const Login = () => {
  const login = async () => {
    let data;
    let responseToken = null;
    let responseSession = null;
    responseToken = await tmdbAPI.getToken();
    data = {
      username: username,
      password: password,
      request_token: responseToken.request_token,
    };
    responseSession = await tmdbAPI.createSession(data);

    console.log(responseSession);
  };
  return (
    <div className="login-form">
      <input type="text" onChange={(e) => setUsername(e.target.value)} />
      <input type="text" onChange={(e) => setPassword(e.target.value)} />
      <button onClick={login}>Log in</button>
    </div>
  );
};

export default Login;

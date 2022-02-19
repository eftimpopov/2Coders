import React, { useState, useEffect } from 'react';
import './login-modal.scss';

const LoginModal = () => {
  const [active, setActive] = useState(false);

  return (
    <div id="login-modal" className={`modal ${active ? 'active' : ''}`}>
      <div className="modal__content">
        <div className="modal__content__close">
          <i className="bx bx-x"></i>
        </div>
      </div>
    </div>
  );
};

export default LoginModal;

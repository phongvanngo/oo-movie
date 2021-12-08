import React, { useState, useEffect, useRef } from 'react';
import PropTypes from 'prop-types';

import './modal.scss';
import Button, { OutlineButton } from 'components/button/Button';

const Modal = (props) => {
  const [active, setActive] = useState(false);

  useEffect(() => {
    setActive(props.active);
  }, [props.active]);

  return (
    <div id={props.id} className={`modal ${active ? 'active' : ''}`}>
      {props.children}
    </div>
  );
};

Modal.propTypes = {
  active: PropTypes.bool,
  id: PropTypes.string,
};

export const ModalContent = (props) => {
  const contentRef = useRef(null);

  const closeModal = () => {
    contentRef.current.parentNode.classList.remove('active');
    if (props.onClose) props.onClose();
  };

  return (
    <div ref={contentRef} className="modal__content">
      {props.children}
      <div className="modal__content__close" onClick={closeModal}>
        <i className="bx bx-x"></i>
      </div>
    </div>
  );
};

ModalContent.propTypes = {
  onClose: PropTypes.func,
};

export const ModalWithButton = (props) => {
  const contentRef = useRef(null);

  const closeModal = () => {
    contentRef.current.parentNode.classList.remove('active');
  };

  const SelectOk = () => {
    closeModal();
    if (props.onOk) props.onOk();
  };

  const SelectAbort = () => {
    closeModal();
    if (props.onAbort) props.onAbort();
  };

  return (
    <div ref={contentRef} className="modal__content">
      {props.children}
      <div className="modal__content__close" onClick={closeModal}>
        <i className="bx bx-x"></i>
      </div>
      <div className="flex justify-center items-end pt-8">
        <div className="px-4">
          <Button className="small" onClick={SelectOk}>
            {' '}
            {props.okContent}
          </Button>
        </div>
        {props.onAbort && (
          <div className="px-4">
            <OutlineButton className="small" onClick={SelectAbort}>
              {' '}
              {props.abortContent}
            </OutlineButton>
          </div>
        )}
      </div>
    </div>
  );
};

ModalWithButton.propTypes = {
  onOk: PropTypes.func,
  onAbort: PropTypes.func,
  okContent: PropTypes.string,
  abortContent: PropTypes.string,
};

export default Modal;

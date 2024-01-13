import { Component } from 'react';
import { createPortal } from 'react-dom';
import css from './Modal.module.css';

const modalRoot = document.getElementById('modal-root');

class Modal extends Component {
  componentDidMount() {
    document.addEventListener('keydown', this.closeModal);
  }

  componentWillUnmount() {
    document.removeEventListener('keydown', this.closeModal);
  }

  closeModal = ({ target, currentTarget, code }) => {
    if (target === currentTarget || code === 'Escape') {
      this.props.close();
    }
  };

  render() {
    const { closeModal } = this;
    const { children, close } = this.props;

    return createPortal(
      <div onClick={closeModal} className={css.overlay}>
        <div className={css.modal}>
          <p onClick={close} className={css.close}>
            <span className={css.closeLabel}>Close</span>
          </p>
          {children}
        </div>
      </div>,
      modalRoot
    );
  }
}

export default Modal;

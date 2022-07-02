import { Component } from 'react';
import { createPortal } from 'react-dom';
import { StyledModal, ModalBody } from './Modal.styled';
import PropTypes from 'prop-types';

const modalRoot = document.querySelector('#modal-root');

export class Modal extends Component {
  componentDidMount() {
    window.addEventListener('keydown', this.handleKeyDown);
  }

  componentWillUnmount() {
    window.removeEventListener('keydown', this.handleKeyDown);
  }

  handleKeyDown = e => {
    if (e.code === 'Escape') {
      this.props.onClose();
    }
  };

  handleOverlayClick = e => {
    if (e.currentTarget === e.target) {
      this.props.onClose();
    }
  };

  render() {
    return createPortal(
      <StyledModal onClick={this.handleOverlayClick}>
        <ModalBody>{this.props.children}</ModalBody>
      </StyledModal>,
      modalRoot
    );
  }
}

Modal.propTypes = {
  onClose: PropTypes.func.isRequired,
};

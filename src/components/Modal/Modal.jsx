import React, { Component } from 'react';
import { createPortal } from 'react-dom';
import PropTypes from 'prop-types';
import { Box, ModalContent } from './Modal.styled';

const modalRoot = document.querySelector('#modal-root');

export class Modal extends Component {
  componentDidMount() {
    window.addEventListener('keydown', this.handleKeydown);
  }

  componentWillUnmount() {
    window.removeEventListener('keydown', this.handleKeydown);
  }

  handleKeydown = e => {
    if (e.code === 'Escape') {
      console.log('esc');
      this.props.onClose();
    }
  };
  handleBackdropClick = e => {
    if (e.currentTarget === e.target) {
      this.props.onClose();
    }
  };

  render() {
    const { url, alt } = this.props;
    const { handleBackdropClick } = this;
    return createPortal(
      <Box onClick={handleBackdropClick}>
        <ModalContent>
          <img src={url} alt={alt} />
        </ModalContent>
      </Box>,
      modalRoot
    );
  }
}
Box.propTypes = {
  onClick: PropTypes.func.isRequired,
};

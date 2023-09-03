import PropTypes from 'prop-types';
import { createPortal } from 'react-dom';
import { Component } from 'react';
import { Overlay, ModalWraper } from './Modal.styled';

const modalRoot = document.querySelector('#modal-root');

export class Modal extends Component {
  componentDidMount() {
    window.addEventListener('keydown', this.handleKeyDown);
  }
  componentWillUnmount() {
    window.removeEventListener('keydown', this.handleKeyDown);
  }

  handleKeyDown = event => {
    if (event.code === 'Escape') {
      this.props.closeModal();
    }
  };

  handleClick = event => {
    if (event.target.tagName !== 'IMG') {
      this.props.closeModal();
    }
  };
  render() {
    return createPortal(
      <Overlay onClick={this.handleClick}>
        <ModalWraper>
          <img src={this.props.image} alt="" />
        </ModalWraper>
      </Overlay>,
      modalRoot
    );
  }
}

Modal.propTypes = {
  image: PropTypes.string,
  closeModal: PropTypes.func,
};

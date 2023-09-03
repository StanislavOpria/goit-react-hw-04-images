import PropTypes from 'prop-types';
import { AddButton } from './Button.styled';

export const Button = ({ onClick }) => {
  return (
    <AddButton type="click" onClick={onClick}>
      Load more
    </AddButton>
  );
};

Button.propTypes = {
  onClick: PropTypes.func,
};

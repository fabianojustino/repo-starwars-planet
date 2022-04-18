import React, { Component } from 'react';
import PropTypes from 'prop-types';

class Button extends Component {
  render() {
    const { label, onClick, disabled, id, value, className, img } = this.props;
    return (
      <button
        type="button"
        onClick={ onClick }
        disabled={ disabled }
        data-testid={ id }
        value={ value }
        className={ className }
      >
        { label }
        {img && (<img src={ img } alt="" className="btn__settings" />)}
      </button>
    );
  }
}

export default Button;

Button.propTypes = {
  onClick: PropTypes.func.isRequired,
  id: PropTypes.string,
  value: PropTypes.string,
  label: PropTypes.string.isRequired,
  disabled: PropTypes.bool.isRequired,
  className: PropTypes.string.isRequired,
  img: PropTypes.string.isRequired,
};

Button.defaultProps = {
  id: '',
  value: '',
};

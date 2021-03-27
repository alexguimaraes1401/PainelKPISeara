import React from "react";
import PropTypes from "prop-types";

  /**
 * A simple Checkbox component
 */

Checkbox.propTypes = {
  /** name given to input[type=checkbox] */
  name: PropTypes.string.isRequired,
  /** Text to display. Apllied to <Label> element */
  label: PropTypes.string.isRequired,
  /** Is the checkbox checked or nor */
  checked: PropTypes.bool.isRequired,
  /** function to run when the checkbox is clicked */
  onChange: PropTypes.func.isRequired,
  /** is the Checkbox disabled? */
  disabled: PropTypes.bool
};

/**
 * NOTES/TODOS:
 * -------------------
 * <span> is used as a wrapper since input and label are both inline elements
 * <span.checkbox-indicator> can be expanded to hold Icons/SVG for different
 * states at a later date.
 * <label> is semantically linked to input element.
 * Checkbox should be read to screenreaders
 */

export default function Checkbox({
  disabled = false,
  name,
  label,
  checked,
  onChange
}) {
  const handler = !disabled ? onChange : undefined;

  return (
    <span className="checkbox" onClick={handler}>
      <input
        className="checkbox-input"
        type="checkbox"
        name={name}
        id={`${name}-id`}
        disabled={disabled}
        checked={checked}
        onChange={handler}
        area-labelledby="checkbox-label"
      />
      <span className="checkbox-indicator" />
      <label className="checkbox-label" htmlFor={`${name}-id`}>
        {label}
      </label>
    </span>
  );
}

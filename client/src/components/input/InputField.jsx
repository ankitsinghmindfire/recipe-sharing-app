import React from "react";
import PropTypes from "prop-types";

const InputField = React.forwardRef(({ label, error, ...props }, ref) => {
  return (
    <div>
      <label htmlFor={props?.id}>{label}</label> <br />
      <input ref={ref} {...props} />
      <span className="error">{error}</span>
    </div>
  );
});

// Adding displayName for better debugging
InputField.displayName = "InputField";

// Prop validation with PropTypes
InputField.propTypes = {
  label: PropTypes.string.isRequired,
  id: PropTypes.string.isRequired,
  error: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
  value: PropTypes.string,
  onChange: PropTypes.func,
  placeholder: PropTypes.string,
};

export default InputField;

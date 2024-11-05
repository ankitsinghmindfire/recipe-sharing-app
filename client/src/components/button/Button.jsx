// eslint-disable-next-line react/prop-types
const Button = ({ type = "button", onClick, className, children }) => {
  return (
    <button type={type} onClick={onClick} className={className}>
      {children}
    </button>
  );
};

export default Button;

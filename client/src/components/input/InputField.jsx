/* eslint-disable react/prop-types */
const InputField = ({
  type,
  value,
  onChange,
  label,
  id,
  name,
  key,
  placeholder,
}) => {
  return (
    <>
      <label htmlFor={id}>{label}</label>
      <input
        type={type}
        id={id}
        value={value}
        onChange={onChange}
        name={name}
        key={key}
        placeholder={placeholder}
      />
    </>
  );
};

export default InputField;

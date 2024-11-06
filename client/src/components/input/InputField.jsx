// eslint-disable-next-line react/prop-types
const InputField = ({ type, value, onChange, label, id, name, key }) => {
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
      />
    </>
  );
};

export default InputField;

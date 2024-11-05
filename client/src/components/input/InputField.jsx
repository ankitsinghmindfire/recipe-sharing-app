// eslint-disable-next-line react/prop-types
const InputField = ({ type, value, onChange, label, id }) => {
  return (
    <>
      <label htmlFor={id}>{label}</label>
      <input type={type} id={id} value={value} onChange={onChange} />
    </>
  );
};

export default InputField;

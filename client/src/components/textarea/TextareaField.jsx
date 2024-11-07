// eslint-disable-next-line react/prop-types
const TextareaField = ({ label, name, value, onChange, id, placeholder }) => {
  return (
    <>
      <label htmlFor={id}>{label}</label>
      <textarea
        id={id}
        name={name}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
      ></textarea>
    </>
  );
};

export default TextareaField;

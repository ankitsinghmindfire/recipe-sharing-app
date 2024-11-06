// eslint-disable-next-line react/prop-types
const TextareaField = ({ label, name, value, onChange, id }) => {
  return (
    <>
      <label htmlFor={id}>{label}</label>
      <textarea
        id={id}
        name={name}
        value={value}
        onChange={onChange}
      ></textarea>
    </>
  );
};

export default TextareaField;

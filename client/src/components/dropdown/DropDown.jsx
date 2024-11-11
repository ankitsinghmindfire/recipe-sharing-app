import PropTypes from 'prop-types';

export const DropDown = ({
  itemsList,
  name,
  id,
  label,
  optionStyle,
  onChange,
}) => {
  return (
    <div
      style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'baseline',
      }}
    >
      <label>{label}</label> &nbsp;&nbsp;
      <select
        name={name}
        id={id}
        style={{ borderRadius: '5px', outline: 'none', margin: '10px' }}
        className={optionStyle}
        onChange={onChange}
      >
        {itemsList.map((item, index) => {
          return (
            <option key={index} value={`${item.value}`}>
              {item.key}
            </option>
          );
        })}
      </select>
    </div>
  );
};

DropDown.propTypes = {
  id: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  optionStyle: PropTypes.string.isRequired,
  onChange: PropTypes.func,
  itemsList: PropTypes.arrayOf(PropTypes.number).isRequired,
};

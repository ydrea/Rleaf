import Select, { type CSSObjectWithLabel } from 'react-select';

function Selekt() {
  const cusTom = {
    control: (styles: CSSObjectWithLabel) => ({
      ...styles,
      backgroundColor: 'transparent', // Make the background transparent
      border: 'none', // Remove the default border
      borderBottom: '1px solid white', // Add the white bottom border
      borderRadius: '0', // Remove border radius if needed
    }),
    option: (styles: CSSObjectWithLabel) => {
      return { ...styles, color: 'black' };
    },
    placeholder: (styles: CSSObjectWithLabel) => ({
      ...styles,
      color: 'white', // Set the placeholder text color to white
    }),
    dropdownIndicator: (provided: CSSObjectWithLabel) => ({
      ...provided,
      display: 'none',
    }),
    indicatorSeparator: (provided: CSSObjectWithLabel) => ({
      ...provided,
      display: 'none',
    }),
  };
  //
  return (
    <Select
      styles={cusTom}
      placeholder='projekt'
      isSearchable
      isMulti
      options={[
        { value: 'Banija', label: 'Banija' },
        { value: 'EWAP', label: 'EWAP' },
      ]}
    />
  );
}

export default Selekt;

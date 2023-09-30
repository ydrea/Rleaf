import React, { useState } from 'react';
import Select from 'react-select';
import { useDispatch } from 'react-redux';
import { setFilters } from '../redux/rtk/gallerySlice';

function KategorijeSelekt() {
  const dispatch = useDispatch();
  const [filterSelected, setFilterSelected] = useState([]);

  // Define your updated kategorijeOptions array here
  const kategorijeOptions = [
    {
      value: 'vjerski_objekti',
      label: 'Vjerski objekti',
    },
    {
      value: 'neka_druga_kategorija',
      label: 'New Label for Another Category',
    },
    // Add more options as needed
  ];

  const handleFilterChange = selectedFilters => {
    setFilterSelected(selectedFilters);

    const selectedFilterValues = selectedFilters.map(
      filter => filter.value
    );
    dispatch(setFilters(selectedFilterValues));
  };

  //
  const cusTom = {
    control: styles => ({
      ...styles,
      backgroundColor: 'transparent',
      border: 'none',
      borderTop: '1px solid black',
      borderRadius: '0',
      cursor: 'pointer',
    }),
    option: (styles, { data, isDisabled, isFocused, isSelected }) => {
      console.log('selekt', data, isDisabled, isFocused, isSelected);
      return { ...styles, color: 'black', cursor: 'pointer' };
    },
    placeholder: styles => ({
      ...styles,
      color: 'black',
      marginTop: '-13px',
      marginLeft: '-8px',
      fontSize: '22px',
    }),
    dropdownIndicator: provided => ({ ...provided, display: 'none' }),
    indicatorSeparator: provided => ({
      ...provided,
      display: 'none',
    }),
    menu: styles => ({
      ...styles,
      zIndex: '999',
      cursor: 'pointer',
      width: '16vw',
      height: 'auto',
    }),
  };

  return (
    <div>
      <Select
        styles={cusTom}
        placeholder="Unesi/Odaberi"
        isSearchable
        isMulti
        options={kategorijeOptions} // Update this with your updated array
        value={filterSelected}
        onChange={handleFilterChange}
      />
      <label
        htmlFor="kategorije-select"
        style={{
          fontSize: '22px',
          color: '#545550',
        }}
      >
        Kategorije
      </label>
    </div>
  );
}

export default KategorijeSelekt;

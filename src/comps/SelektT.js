import React, { useState } from 'react';
import Select from 'react-select';
import { useDispatch } from 'react-redux';
import { setFilters } from '../redux/rtk/gallerySlice';

function TagoviSelekt({ tagoviOptions }) {
  const dispatch = useDispatch();
  const [filterSelected, setFilterSelected] = useState([]);

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
      backgroundColor: 'transparent', // Make the background transparent
      border: 'none', // Remove the default border
      borderTop: '1px solid white', // Add the white bottom border
      borderRadius: '0',
      cursor: 'pointer',
      // Remove border radius if needed
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
      fontSize: '18px',
    }),
    dropdownIndicator: provided => ({ ...provided, display: 'none' }),
    indicatorSeparator: provided => ({
      ...provided,
      display: 'none',
    }),
    menu: styles => ({ ...styles, zIndex: '999', cursor: 'pointer' }),
  };

  return (
    <div>
      <Select
        styles={cusTom}
        placeholder="unesi/odaberi"
        isSearchable
        isMulti
        options={tagoviOptions}
        value={filterSelected}
        onChange={handleFilterChange}
      />
      <label
        htmlFor="keyword-select"
        style={{ color: 'white', fontSize: '18px' }}
      >
        ključne riječi
      </label>
    </div>
  );
}

export default TagoviSelekt;

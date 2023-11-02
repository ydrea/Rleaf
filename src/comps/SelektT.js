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
      color: '#7e7e77',
      marginTop: '-13px',
      marginLeft: '-8px',
      fontSize: '22px',
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
        style={{ color: '#545550', fontSize: '22px' }}
      >
        ključne riječi
      </label>
    </div>
  );
}

export default TagoviSelekt;

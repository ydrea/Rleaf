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
  const cusTom = {
    control: styles => ({
      ...styles,
      backgroundColor: 'transparent', // Make the background transparent
      border: 'none', // Remove the default border
      borderBottom: '1px solid white', // Add the white bottom border
      borderRadius: '0', // Remove border radius if needed
    }),
    option: (styles, { data, isDisabled, isFocused, isSelected }) => {
      console.log('selekt', data, isDisabled, isFocused, isSelected);
      return { ...styles, color: 'black' };
    },
    placeholder: styles => ({
      ...styles,
      color: 'white', // Set the placeholder text color to white
    }),
    dropdownIndicator: provided => ({ ...provided, display: 'none' }),
    indicatorSeparator: provided => ({
      ...provided,
      display: 'none',
    }),
  };

  return (
    <Select
      styles={cusTom}
      placeholder="filter"
      isSearchable
      isMulti
      options={tagoviOptions}
      value={filterSelected}
      onChange={handleFilterChange}
    />
  );
}

export default TagoviSelekt;

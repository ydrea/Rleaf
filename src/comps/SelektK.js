import React, { useState } from 'react';
import Select from 'react-select';
import { useDispatch } from 'react-redux';
import { setFilters } from '../redux/rtk/gallerySlice';

function KategorijeSelekt({ kategorijeOptions }) {
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
      borderTop: '1px solid white',
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
        options={kategorijeOptions}
        value={filterSelected}
        onChange={handleFilterChange}
      />
      <label
        htmlFor="kategorije-select"
        style={{
          fontSize: '18px',
          color: 'white',
        }}
      >
        kategorije
      </label>
    </div>
  );
}

export default KategorijeSelekt;

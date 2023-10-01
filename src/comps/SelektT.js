// import React, { useState } from 'react';
// import Select from 'react-select';
// import { useDispatch } from 'react-redux';
// import { setFilters } from '../redux/rtk/gallerySlice';

// function TagoviSelekt({ tagoviOptions }) {
//   const dispatch = useDispatch();
//   const [filterSelected, setFilterSelected] = useState([]);

//   const handleFilterChange = selectedFilters => {
//     setFilterSelected(selectedFilters);

//     const selectedFilterValues = selectedFilters.map(
//       filter => filter.value
//     );
//     dispatch(setFilters(selectedFilterValues));
//   };
// TagoviSelekt.js

import React, { useState, useEffect } from 'react';
import Select from 'react-select';
import { useDispatch } from 'react-redux';
import { setFilters } from '../redux/rtk/gallerySlice';

function TagoviSelekt({ photos }) {
  const dispatch = useDispatch();
  const [filterSelected, setFilterSelected] = useState([]);
  const [tagoviOptions, setTagoviOptions] = useState([]);

  useEffect(() => {
    // Extract unique tagovi values from photos
    const tagoviSet = new Set();
    photos.forEach(photo => {
      const tagoviArray = photo.tagovi.split(',');
      tagoviArray.forEach(tag => tagoviSet.add(tag.trim()));
    });

    // Convert set to an array of options
    const tagoviOptionsArray = Array.from(tagoviSet).map(tag => ({
      value: tag,
      label: tag,
    }));

    setTagoviOptions(tagoviOptionsArray);
  }, [photos]);

  const handleFilterChange = selectedFilters => {
    setFilterSelected(selectedFilters);

    const selectedFilterValues = selectedFilters.map(
      filter => filter.value
    );
    dispatch(setFilters(selectedFilterValues));
  };

  const customStyles = {
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
    menu: styles => ({ ...styles, zIndex: '999', cursor: 'pointer' }),
  };

  return (
    <div>
      <Select
        styles={customStyles}
        placeholder="Unesi/Odaberi"
        isSearchable
        isMulti
        options={tagoviOptions}
        value={filterSelected}
        onChange={handleFilterChange}
      />
      <label
        htmlFor="tagovi-select"
        style={{
          fontSize: '22px',
          color: '#545550',
        }}
      >
        Tagovi
      </label>
    </div>
  );
}

export default TagoviSelekt;

//

//   return (
//     <div>
//       <Select
//         styles={cusTom}
//         placeholder="unesi/odaberi"
//         isSearchable
//         isMulti
//         options={tagoviOptions}
//         value={filterSelected}
//         onChange={handleFilterChange}
//       />
//       <label
//         htmlFor="keyword-select"
//         style={{ color: '#545550', fontSize: '22px' }}
//       >
//         ključne riječi
//       </label>
//     </div>
//   );
// }

// export default TagoviSelekt;

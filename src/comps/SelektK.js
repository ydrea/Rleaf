// // KategorijeSelekt.js

// import React, { useState } from 'react';
// import Select from 'react-select';
// import { useDispatch } from 'react-redux';
// import { setFilters } from '../redux/rtk/gallerySlice';

// function KategorijeSelekt({ kategorijeOptions, allPhotos }) {
//   const dispatch = useDispatch();
//   const [filterSelected, setFilterSelected] = useState([]);

//   const handleFilterChange = selectedFilters => {
//     setFilterSelected(selectedFilters);

//     const selectedFilterValues = selectedFilters.map(
//       filter => filter.value
//     );

//     // Filter photos based on selected filter values
//     const filteredPhotos = allPhotos.filter(photo => {
//       // Check if any of the selected filter values are in the photo's kategorija property
//       return selectedFilterValues.some(value =>
//         photo.kategorija.includes(value)
//       );
//     });

//     // Dispatch the filtered photos to Redux store
//     dispatch(setFilters(selectedFilterValues));
//     // You can also dispatch the filteredPhotos array to store if needed
//   };

//   const customStyles = {
//     control: styles => ({
//       ...styles,
//       backgroundColor: 'transparent',
//       border: 'none',
//       borderTop: '1px solid black',
//       borderRadius: '0',
//       cursor: 'pointer',
//     }),
//     option: (styles, { data, isDisabled, isFocused, isSelected }) => {
//       console.log('selekt', data, isDisabled, isFocused, isSelected);
//       return { ...styles, color: 'black', cursor: 'pointer' };
//     },
//     placeholder: styles => ({
//       ...styles,
//       color: 'black',
//       marginTop: '-13px',
//       marginLeft: '-8px',
//       fontSize: '22px',
//     }),
//     dropdownIndicator: provided => ({ ...provided, display: 'none' }),
//     indicatorSeparator: provided => ({
//       ...provided,
//       display: 'none',
//     }),
//     menu: styles => ({
//       ...styles,
//       zIndex: '999',
//       cursor: 'pointer',
//       width: '16vw',
//       height: 'auto',
//     }),
//   };

//   return (
//     <div>
//       <Select
//         styles={customStyles}
//         placeholder="Unesi/Odaberi"
//         isSearchable
//         isMulti
//         options={kategorijeOptions}
//         value={filterSelected}
//         onChange={handleFilterChange}
//       />
//       <label
//         htmlFor="kategorije-select"
//         style={{
//           fontSize: '22px',
//           color: '#545550',
//         }}
//       >
//         Kategorije
//       </label>
//     </div>
//   );
// }

// export default KategorijeSelekt;

import React, { useState, useEffect } from 'react';
import Select from 'react-select';
import { useDispatch } from 'react-redux';
import { setFilters } from '../redux/rtk/gallerySlice';

function KategorijeSelekt({ photos }) {
  const dispatch = useDispatch();
  const [filterSelected, setFilterSelected] = useState([]);
  const [kategorijeOptions, setKategorijeOptions] = useState([]);

  useEffect(() => {
    // Extract unique kategorija values from photos
    const kategorijeSet = new Set();
    photos.forEach(photo => {
      const kategorija = photo.kategorija.trim();
      if (kategorija !== '') {
        kategorijeSet.add(kategorija);
      }
    });

    // Convert set to an array of options
    const kategorijeOptionsArray = Array.from(kategorijeSet).map(
      kategorija => ({
        value: kategorija,
        label: kategorija,
      })
    );

    setKategorijeOptions(kategorijeOptionsArray);
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
        styles={customStyles}
        placeholder="Unesi/Odaberi"
        isSearchable
        isMulti
        options={kategorijeOptions}
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

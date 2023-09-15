// import React, { useState } from 'react';
// import Select from 'react-select';
// import { useSelector, useDispatch } from 'react-redux';
// import { selectPhotos, setFilters } from '../redux/rtk/gallerySlice';

// // const filters = [
// //   { value: 'tag1', label: 'Tag 1' },
// //   { value: 'tag2', label: 'Tag 2' },
// //   { value: 'tag3', label: 'Tag 3' },
// // ];

// function Selekt() {
//   const dispatch = useDispatch();
//   const photos = useSelector(selectPhotos);
//   const [filterSelected, setFilterSelected] = useState([]);
//   const handleFilterChange = selectedFilters => {
//     setFilterSelected(selectedFilters);

//     const selectedFilterValues = selectedFilters.map(
//       filter => filter.value
//     );

//     dispatch(setFilters(selectedFilterValues));
//   };
//   return (
//     <Select
//       // theme={cusTom}
//       placeholder="Select Filters"
//       isSearchable
//       isMulti
//       options={filters}
//       value={filterSelected}
//       onChange={handleFilterChange}
//     />
//   );
// }

// export default Selekt;
import React, { useState } from 'react';
import AsyncSelect from 'react-select/async';
import { useSelector, useDispatch } from 'react-redux';
import { selectPhotos, setFilters } from '../redux/rtk/gallerySlice';
import Select from 'react-select';

//
function Selekt({ filters }) {
  const dispatch = useDispatch();
  const photos = useSelector(selectPhotos);
  const [filterSelected, setFilterSelected] = useState([]);

  const handleFilterChange = selectedFilters => {
    setFilterSelected(selectedFilters);

    const selectedFilterValues = selectedFilters.map(
      filter => filter.value
    );
    console.log('AKTIVNI filter', filters, selectedFilterValues);
    dispatch(setFilters(selectedFilterValues));
  };
  //
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
  //
  return (
    <Select
      styles={cusTom}
      placeholder="projekt"
      isSearchable
      isMulti
      options={[
        { value: 'Banija', label: 'Banija' },
        { value: 'EWAP', label: 'EWAP' },
        // Add more options as needed
      ]}
      // value={[
      //   { value: 'Banija', label: 'Banija' },
      //   { value: 'EWAP', label: 'EWAP' },
      //   // Add more selected options if needed
      // ]}
      // onChange={handleFilterChange}
    />
  );
}

export default Selekt;

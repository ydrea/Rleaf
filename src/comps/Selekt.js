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
    control: styles => ({ ...styles, backgroundColor: '#8c8d85' }),
    option: (styles, { data, isDisabled, isFocused, isSelected }) => {
      console.log('selekt', data, isDisabled, isFocused, isSelected);
      return { ...styles, color: 'black' };
    },
    placeholder: styles => ({ ...styles, color: 'white' }), // Change 'red' to your desired color
  };
  //
  return (
    <Select
      styles={cusTom}
      placeholder="unesi/odaberi kriterije za filtriranje"
      isSearchable
      isMulti
      options={filters}
      value={filterSelected}
      onChange={handleFilterChange}
    />
  );
}

export default Selekt;

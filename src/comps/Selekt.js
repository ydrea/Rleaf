import React, { useState } from 'react';
import Select from 'react-select';
import { useSelector, useDispatch } from 'react-redux';
import {
  selectPhotos, // Replace with the actual selector for your photos
  setFilters, // Define a Redux action to set the filters
} from '../redux/rtk/gallerySlice'; // Replace with your Redux slice import

const filters = [
  { value: 'tag1', label: 'Tag 1' },
  { value: 'tag2', label: 'Tag 2' },
  { value: 'tag3', label: 'Tag 3' },
  // Add more filter options as needed
];

function Selekt() {
  const dispatch = useDispatch();
  const photos = useSelector(selectPhotos); // Replace with the actual selector for your photos
  const [filterSelected, setFilterSelected] = useState([]);
  // Handle filter selection changes
  const handleFilterChange = selectedFilters => {
    setFilterSelected(selectedFilters);

    // Extract the selected filter values from the selected filters array
    const selectedFilterValues = selectedFilters.map(
      filter => filter.value
    );

    // Dispatch an action to update the filters in Redux state
    dispatch(setFilters(selectedFilterValues)); // Replace with your Redux action
  };
  return (
    <Select
      // theme={cusTom}
      placeholder="Select Filters"
      isSearchable
      isMulti
      options={filters}
      value={filterSelected}
      onChange={handleFilterChange}
    />
  );
}

export default Selekt;

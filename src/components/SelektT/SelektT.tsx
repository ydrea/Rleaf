import { useState, useEffect } from 'react';
import Select from 'react-select';
import { useDispatch, useSelector } from 'react-redux';
import { setFilters } from '../../redux/rtk/gallerySlice';
import type { CSSObjectWithLabel, MultiValue } from 'react-select';
import type { Filters, Option } from '../../types/types';
import type { RootState } from '../../redux/store';

export const TagoviSelekt = ({
  tagoviOptions,
}: {
  tagoviOptions: Option[];
}) => {
  const dispatch = useDispatch();
  const selectedFilters = useSelector<RootState, Filters>(
    (state) => state.gallery.selectedFilters
  );
  const [, setFilterSelected] = useState<Option[]>([]);

  useEffect(() => {
    // Initialize the state with selected filters when the component mounts
    const initialSelectedFilters = selectedFilters?.tagovi || [];
    setFilterSelected(
      initialSelectedFilters.map((option) => ({
        label: option,
        value: option,
      }))
    );
  }, [selectedFilters]);

  const handleTagoviFilterChange = (selectedFilters: MultiValue<Option>) => {
    const selectedFilterValues = selectedFilters.map((filter) => filter.value);
    dispatch(setFilters({ tagovi: selectedFilterValues }));
    // Update the local state when filters change
    setFilterSelected(
      selectedFilters.map((option) => ({
        label: option.label,
        value: option.value,
      }))
    );
  };

  const cusTom = {
    control: (styles: CSSObjectWithLabel) => ({
      ...styles,
      backgroundColor: 'transparent',
      border: 'none',
      borderTop: '1px solid black',
      borderRadius: '0',
      cursor: 'pointer',
    }),
    option: (styles: CSSObjectWithLabel) => {
      return { ...styles, color: 'black', cursor: 'pointer' };
    },
    placeholder: (styles: CSSObjectWithLabel) => ({
      ...styles,
      color: '#18aa00',
      marginTop: '-13px',
      marginLeft: '-8px',
      fontSize: '22px',
    }),
    dropdownIndicator: (provided: CSSObjectWithLabel) => ({
      ...provided,
      display: 'none',
    }),
    indicatorSeparator: (provided: CSSObjectWithLabel) => ({
      ...provided,
      display: 'none',
    }),
    menu: (styles: CSSObjectWithLabel) => ({
      ...styles,
      zIndex: '999',
      cursor: 'pointer',
    }),
  };

  return (
    <div>
      <Select
        styles={cusTom}
        placeholder='unesi/odaberi'
        isSearchable
        isMulti
        options={tagoviOptions}
        value={
          selectedFilters?.tagovi
            ? selectedFilters?.tagovi.map((option) => ({
                label: option,
                value: option,
              }))
            : []
        }
        onChange={(newValue: MultiValue<Option>) => {
          handleTagoviFilterChange(newValue);
        }}
        getOptionValue={(option) => option.value}
        getOptionLabel={(option) => option.label}
      />
      <label
        htmlFor='keyword-select'
        style={{ color: '#7e7e77', fontSize: '22px' }}
      >
        ključne riječi
      </label>
    </div>
  );
};

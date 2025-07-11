import { useState, useEffect } from 'react';
import Select from 'react-select';
import { useDispatch, useSelector } from 'react-redux';
import { setFilters } from '../../redux/rtk/gallerySlice';
import type { CSSObjectWithLabel } from 'react-select';

export const KategorijeSelekt = () => {
  const dispatch = useDispatch();
  const selectedFilters = useSelector(
    (state: any) => state.gallery.selectedFilters
  );
  const [, setFilterSelected] = useState([]);

  useEffect(() => {
    setFilterSelected(selectedFilters?.kategorije || []);
  }, [selectedFilters]);

  const handleKategorijeFilterChange = (selectedFilters: any) => {
    const selectedFilterValues = selectedFilters.map(
      (filter: any) => filter.label
    );
    dispatch(setFilters({ kategorije: selectedFilterValues }));
    setFilterSelected(selectedFilterValues);
  };

  const customKategorijeOptions = [
    { value: 'gospodarski_objekti', label: 'gospodarski objekti' },
    { value: 'vazni_objekti', label: 'važni objekti' },
    { value: 'vjerski_objekti', label: 'vjerski objekti' },
    { value: 'arhitektura', label: 'arhitektura' },
    { value: 'ekologija', label: 'ekologija' },
    { value: 'tradicijska_gradnja', label: 'tradicijska gradnja' },
    { value: 'spomenici', label: 'spomenici' },
    { value: 'prirodni_resursi', label: 'prirodni resursi' },
    { value: 'stanovnistvo', label: 'stanovništvo' },
    { value: 'poljoprivreda', label: 'poljoprivreda' },
    { value: 'stocarstvo', label: 'stočarstvo' },
    { value: 'infrastruktura', label: 'infrastruktura' },
  ];

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
      zIndex: '9999',
      cursor: 'pointer',
      width: '46vw',
      height: 'auto',
    }),
  };

  return (
    <div>
      <Select
        id='kategorije-select'
        styles={cusTom}
        placeholder='unesi/odaberi'
        isSearchable
        isMulti
        options={customKategorijeOptions}
        value={
          selectedFilters?.kategorije
            ? selectedFilters?.kategorije.map((option: string) => ({
                label: option,
                value: option,
              }))
            : []
        }
        onChange={handleKategorijeFilterChange}
        getOptionValue={(option) => option.value}
        getOptionLabel={(option) => option.label}
      />{' '}
      <label
        htmlFor='kategorije-select'
        style={{
          fontSize: '22px',
          color: '#7e7e77',
        }}
      >
        kategorije
      </label>
    </div>
  );
};

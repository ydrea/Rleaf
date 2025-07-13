import { useState, useEffect } from 'react'
import Select from 'react-select'
import { useDispatch, useSelector } from 'react-redux'
import type { CSSObjectWithLabel } from 'react-select'

import { setFilters } from '../../redux/rtk/gallerySlice'

export const KategorijeSelekt = () => {
  const dispatch = useDispatch()
  const selectedFilters = useSelector(
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    (state: any) => state.gallery.selectedFilters
  )
  const [, setFilterSelected] = useState([])

  useEffect(() => {
    setFilterSelected(selectedFilters?.kategorije || [])
  }, [selectedFilters])

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const handleKategorijeFilterChange = (selectedFilters: any) => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const selectedFilterValues = selectedFilters.map((filter: any) => filter.label)
    dispatch(setFilters({ kategorije: selectedFilterValues }))
    setFilterSelected(selectedFilterValues)
  }

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
    { value: 'infrastruktura', label: 'infrastruktura' }
  ]

  const cusTom = {
    option: (styles: CSSObjectWithLabel) => ({
      ...styles,
      color: 'black',
      cursor: 'pointer'
    }),
    control: (styles: CSSObjectWithLabel) => ({
      ...styles
    }),
    placeholder: (styles: CSSObjectWithLabel) => ({
      ...styles,
      fontSize: '22px'
    }),
    dropdownIndicator: (provided: CSSObjectWithLabel) => ({
      ...provided,
      display: 'none'
    }),
    indicatorSeparator: (provided: CSSObjectWithLabel) => ({
      ...provided,
      display: 'none'
    }),
    menu: (styles: CSSObjectWithLabel) => ({
      ...styles,
      zIndex: '9999',
      cursor: 'pointer',
      minWidth: '300px',
      height: 'auto'
    })
  }

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
                value: option
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
          color: '#7e7e77'
        }}
      >
        kategorije
      </label>
    </div>
  )
}

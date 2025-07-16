/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState, useEffect } from 'react'
import Select from 'react-select'
import { useDispatch, useSelector } from 'react-redux'
import type { CSSObjectWithLabel } from 'react-select'

import { setFilters } from '../../redux/rtk/gallerySlice'

export const KategorijeSelekt = () => {
  const dispatch = useDispatch()
  const selectedFilters = useSelector((state: any) => state.gallery.selectedFilters)
  const [, setFilterSelected] = useState([])

  useEffect(() => {
    setFilterSelected(selectedFilters?.kategorije || [])
  }, [selectedFilters])

  const handleKategorijeFilterChange = (selectedFilters: any) => {
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
      cursor: 'pointer'
    }),
    container: (styles: CSSObjectWithLabel) => ({
      ...styles,
      width: '300px'
    }),
    menu: (styles: CSSObjectWithLabel) => ({
      ...styles,
      zIndex: '9999',
      cursor: 'pointer'
    }),
    indicatorSeparator: () => ({ display: 'none' }),
    dropdownIndicator: () => ({ display: 'none' })
  }

  return (
    <label>
      kategorije
      <Select
        inputId='kategorije-select'
        styles={cusTom}
        placeholder='unesi/odaberi'
        isSearchable
        isMulti
        options={customKategorijeOptions}
        onChange={handleKategorijeFilterChange}
        getOptionValue={(option: any) => option.value}
        getOptionLabel={(option: any) => option.label}
        value={
          selectedFilters?.kategorije
            ? selectedFilters?.kategorije.map((option: string) => ({
                label: option,
                value: option
              }))
            : []
        }
      />
    </label>
  )
}

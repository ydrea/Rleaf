/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState, useEffect } from 'react'
import Select from 'react-select'
import { useDispatch, useSelector } from 'react-redux'
import type { CSSObjectWithLabel, MultiValue } from 'react-select'

import { setFilters } from '../../redux/rtk/gallerySlice'
import type { Filters, Option } from '../../types/types'
import type { RootState } from '../../redux/store'

type Props = {
  tagoviOptions: Option[]
}

export const TagoviSelekt = ({ tagoviOptions }: Props) => {
  const dispatch = useDispatch()
  const selectedFilters = useSelector<RootState, Filters>((state) => state.gallery.selectedFilters)
  const [, setFilterSelected] = useState<Option[]>([])

  useEffect(() => {
    // Initialize the state with selected filters when the component mounts
    const initialSelectedFilters = selectedFilters?.tagovi || []
    setFilterSelected(
      initialSelectedFilters.map((option) => ({
        label: option,
        value: option
      }))
    )
  }, [selectedFilters])

  const handleTagoviFilterChange = (selectedFilters: MultiValue<Option>) => {
    const selectedFilterValues = selectedFilters.map((filter: any) => filter.value)
    dispatch(setFilters({ tagovi: selectedFilterValues }))
    // Update the local state when filters change
    setFilterSelected(
      selectedFilters.map((option: any) => ({
        label: option.label,
        value: option.value
      }))
    )
  }

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
      ključne riječi
      <Select
        inputId='keyword-select'
        styles={cusTom}
        placeholder='unesi/odaberi'
        isSearchable
        isMulti
        onChange={handleTagoviFilterChange}
        getOptionValue={(option: any) => option.value}
        getOptionLabel={(option: any) => option.label}
        options={tagoviOptions}
        value={
          selectedFilters?.tagovi
            ? selectedFilters?.tagovi.map((option) => ({
                label: option,
                value: option
              }))
            : []
        }
      />
    </label>
  )
}

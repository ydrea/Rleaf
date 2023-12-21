import React, { useState, useEffect } from 'react';
import Select from 'react-select';
import { useDispatch, useSelector } from 'react-redux';
import { setFilters } from '../redux/rtk/gallerySlice';

function TagoviSelekt({ tagoviOptions }) {
	const dispatch = useDispatch();
	const selectedFilters = useSelector(
		state => state.gallery.selectedFilters
	);
	const [filterSelected, setFilterSelected] = useState([]);

	useEffect(() => {
		// Initialize the state with selected filters when the component mounts
		const initialSelectedFilters = selectedFilters?.tagovi || [];
		setFilterSelected(
			initialSelectedFilters.map(option => ({
				label: option,
				value: option,
			}))
		);
	}, [selectedFilters]);

	const handleTagoviFilterChange = selectedFilters => {
		const selectedFilterValues = selectedFilters.map(
			filter => filter.value
		);
		dispatch(setFilters({ tagovi: selectedFilterValues }));
		// Update the local state when filters change
		setFilterSelected(
			selectedFilters.map(option => ({
				label: option.label,
				value: option.value,
			}))
		);
	};

	const cusTom = {
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
			color: '#18aa00',
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
				styles={cusTom}
				placeholder='unesi/odaberi'
				isSearchable
				isMulti
				options={tagoviOptions}
				value={filterSelected.tagovi}
				onChange={handleTagoviFilterChange}
				getOptionValue={option => option.value}
				getOptionLabel={option => option.label}
			/>
			<label
				htmlFor='keyword-select'
				style={{ color: '#7e7e77', fontSize: '22px' }}
			>
				ključne riječi
			</label>
		</div>
	);
}

export default TagoviSelekt;
// import React, { useState, useEffect } from 'react';
// import Select from 'react-select';
// import { useDispatch, useSelector } from 'react-redux';
// import { setFilters } from '../redux/rtk/gallerySlice';

// const TagoviSelekt = ({ tagoviOptions }) => {
// 	const dispatch = useDispatch();
// 	const [filterSelected, setFilterSelected] = useState([]);

// 	const selectedFilters = useSelector(
// 		state => state.gallery.selectedFilters
// 	);
// 	const handleTagoviFilterChange = selectedFilters => {
// 		const selectedFilterValues = selectedFilters.map(
// 			filter => filter.value
// 		);
// 		dispatch(setFilters({ tagovi: selectedFilterValues }));
// 	};
// 	useEffect(() => {
// 		// Update the local state when selectedFilters change in Redux
// 		setFilterSelected(prevState => ({
// 			...prevState,
// 			tagovi:
// 				selectedFilters?.tagovi.map(value => ({
// 					value,
// 					label: value,
// 				})) || [],
// 		}));
// 	}, [selectedFilters]);

// 	useEffect(() => {
// 		console.log(tagoviOptions, selectedFilters);
// 	}, [tagoviOptions]);
// 	//
// 	// const handleTagoviFilterChange = selectedFilters => {
// 	// 	const selectedFilterValues = selectedFilters.map(
// 	// 		filter => filter.value
// 	// 	);
// 	// 	dispatch(setFilters({ tagovi: selectedFilterValues }));
// 	// };
// 	//
// 	const cusTom = {
// 		control: styles => ({
// 			...styles,
// 			backgroundColor: 'transparent',
// 			border: 'none',
// 			borderTop: '1px solid black',
// 			borderRadius: '0',
// 			cursor: 'pointer',
// 		}),
// 		option: (styles, { data, isDisabled, isFocused, isSelected }) => {
// 			console.log('selekt', data, isDisabled, isFocused, isSelected);
// 			return { ...styles, color: 'black', cursor: 'pointer' };
// 		},
// 		placeholder: styles => ({
// 			...styles,
// 			color: '#18aa00',
// 			marginTop: '-13px',
// 			marginLeft: '-8px',
// 			fontSize: '22px',
// 		}),
// 		dropdownIndicator: provided => ({ ...provided, display: 'none' }),
// 		indicatorSeparator: provided => ({
// 			...provided,
// 			display: 'none',
// 		}),
// 		menu: styles => ({ ...styles, zIndex: '999', cursor: 'pointer' }),
// 	};

// 	return (
// 		<div>
// 			<Select
// 				styles={cusTom}
// 				placeholder='unesi/odaberi'
// 				isSearchable
// 				isMulti
// 				options={tagoviOptions}
// 				value={filterSelected.tagovi}
// 				onChange={handleTagoviFilterChange}
// 			/>
// 			<label
// 				htmlFor='keyword-select'
// 				style={{ color: '#7e7e77', fontSize: '22px' }}
// 			>
// 				ključne riječi
// 			</label>
// 		</div>
// 	);
// }

// export default TagoviSelekt;

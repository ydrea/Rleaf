import React, { useState } from 'react';
import Select from 'react-select';
import { useDispatch, useSelector } from 'react-redux';
import {
	setFilters,
	selectPhotos,
	selectFilteredPhotos,
} from '../redux/rtk/gallerySlice';

function KategorijeSelekt() {
	const dispatch = useDispatch();
	const [filterSelected, setFilterSelected] = useState([]);

	// const handleFilterChange = selectedFilters => {
	//   setFilterSelected(selectedFilters);

	//   const selectedFilterValues = selectedFilters.map(
	//     filter => filter.value
	//   );
	//   dispatch(setFilters(selectedFilterValues));
	// };

	const photos = useSelector(selectPhotos);

	const filteredPhotos = useSelector(selectFilteredPhotos);

	// const handleFilterChange = selectedFilters => {
	// 	setFilterSelected(selectedFilters);

	// 	const selectedFilterValues = selectedFilters.map(
	// 		filter => filter.value
	// 	);

	// 	// Filter photos based on selected Kategorije
	// 	const filteredPhotos = photos.filter(photo => {
	// 		return selectedFilterValues.includes(photo.kategorija);
	// 	});

	// 	// Dispatch the filtered photos to the store
	// 	dispatch(setFilters(selectedFilterValues));
	// 	// Optionally, you can dispatch the filtered photos to the store
	// 	// dispatch(selectFilteredPhotos(filteredPhotos));
	// };
	// const handleFilterChange = selectedFilters => {
	// 	console.log('Selected Filters:', selectedFilters); // Add this line

	// 	setFilterSelected(selectedFilters);

	// 	const selectedFilterValues = selectedFilters.map(
	// 		filter => filter.value
	// 	);

	// 	// Filter photos based on selected Kategorije
	// 	const filteredPhotos = photos.filter(photo => {
	// 		return selectedFilterValues.includes(photo.kategorija);
	// 	});

	// 	// Dispatch the filtered photos to the store
	// 	dispatch(setFilters(selectedFilterValues));
	// };
	const handleFilterChange = selectedFilters => {
		setFilterSelected(selectedFilters);

		const selectedFilterValues = selectedFilters.map(
			filter => filter.label
		);

		const filteredPhotos = photos.filter(photo => {
			return selectedFilterValues.includes(photo.kategorija);
		});

		dispatch(setFilters(selectedFilterValues));
	};

	//
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
	// const handleFilterChange = selectedFilters => {
	//   setFilterSelected(selectedFilters);

	//   const selectedFilterValues = selectedFilters.map(
	//     filter => filter.value
	//   );

	//   // Filter photos based on selected Kategorije
	//   const filteredPhotos = photos.filter(photo => {
	//     return selectedFilterValues.includes(photo.kategorija);
	//   });

	//   // Dispatch the filtered photos to the store
	//   dispatch(setFilters(selectedFilterValues));
	//   // Optionally, you can dispatch the filtered photos to the store
	//   dispatch(selectFilteredPhotos(filteredPhotos));
	// };

	//
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
			// console.log('selekt', data, isDisabled, isFocused, isSelected);
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
		menu: styles => ({
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
				value={filterSelected}
				onChange={handleFilterChange}
				getOptionValue={option => option.value}
				getOptionLabel={option => option.label}
			/>
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
}

export default KategorijeSelekt;

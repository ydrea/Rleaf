import React, { useState, useEffect } from 'react';
import Select from 'react-select';
import { useDispatch, useSelector } from 'react-redux';
import { setFilters } from '../redux/rtk/gallerySlice';

function KategorijeSelekt() {
	const dispatch = useDispatch();
	const selectedFilters = useSelector(
		state => state.gallery.selectedFilters
	);
	const [filterSelected, setFilterSelected] = useState([]);

	useEffect(() => {
		setFilterSelected(selectedFilters?.kategorije || []);
	}, [selectedFilters]);

	const handleKategorijeFilterChange = selectedFilters => {
		const selectedFilterValues = selectedFilters.map(
			filter => filter.label
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
		control: styles => ({
			...styles,
			backgroundColor: 'transparent',
			border: 'none',
			borderTop: '1px solid black',
			borderRadius: '0',
			cursor: 'pointer',
		}),
		option: (styles, { data, isDisabled, isFocused, isSelected }) => {
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
				value={filterSelected.kategorije}
				onChange={handleKategorijeFilterChange}
				getOptionValue={option => option.value}
				getOptionLabel={option => option.label}
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
}

export default KategorijeSelekt;

// import React, { useState, useEffect } from 'react';
// import Select from 'react-select';
// import { useDispatch, useSelector } from 'react-redux';
// import { setFilters } from '../redux/rtk/gallerySlice';

// function KategorijeSelekt({ kategorijeOptions }) {
// 	const dispatch = useDispatch();
// 	const [filterSelected, setFilterSelected] = useState([]);

// 	const selectedFilters = useSelector(
// 		state => state.gallery.selectedFilters
// 	);

// 	const handleKategorijeFilterChange = selectedFilters => {
// 		const selectedFilterValues = selectedFilters.map(
// 			filter => filter.label
// 		);
// 		dispatch(setFilters({ kategorije: selectedFilterValues }));
// 	};

// 	useEffect(() => {
// 		// Update the local state when selectedFilters change in Redux
// 		setFilterSelected(selectedFilters?.kategorije || []);
// 	}, [selectedFilters]);

// 	const customKategorijeOptions = [
// 		{ value: 'gospodarski_objekti', label: 'gospodarski objekti' },
// 		{ value: 'vazni_objekti', label: 'važni objekti' },
// 		{ value: 'vjerski_objekti', label: 'vjerski objekti' },
// 		{ value: 'arhitektura', label: 'arhitektura' },
// 		{ value: 'ekologija', label: 'ekologija' },
// 		{ value: 'tradicijska_gradnja', label: 'tradicijska gradnja' },
// 		{ value: 'spomenici', label: 'spomenici' },
// 		{ value: 'prirodni_resursi', label: 'prirodni resursi' },
// 		{ value: 'stanovnistvo', label: 'stanovništvo' },
// 		{ value: 'poljoprivreda', label: 'poljoprivreda' },
// 		{ value: 'stocarstvo', label: 'stočarstvo' },
// 		{ value: 'infrastruktura', label: 'infrastruktura' },
// 		// Add other options as needed
// 	];

// 	const customStyles = {
// 		control: styles => ({
// 			...styles,
// 			backgroundColor: 'transparent',
// 			border: 'none',
// 			borderTop: '1px solid black',
// 			borderRadius: '0',
// 			cursor: 'pointer',
// 		}),
// 		option: (styles, { data, isDisabled, isFocused, isSelected }) => {
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
// 		menu: styles => ({
// 			...styles,
// 			zIndex: '9999',
// 			cursor: 'pointer',
// 			width: '46vw',
// 			height: 'auto',
// 		}),
// 	};

// 	return (
// 		<div>
// 			<Select
// 				id='kategorije-select'
// 				styles={customStyles}
// 				placeholder='unesi/odaberi'
// 				isSearchable
// 				isMulti
// 				options={customKategorijeOptions}
// 				value={filterSelected.kategorije}
// 				onChange={handleKategorijeFilterChange}
// 				getOptionValue={option => option.value}
// 				getOptionLabel={option => option.label}
// 			/>
// 			<label
// 				htmlFor='kategorije-select'
// 				style={{
// 					fontSize: '22px',
// 					color: '#7e7e77',
// 				}}
// 			>
// 				kategorije
// 			</label>
// 		</div>
// 	);
// }

// export default KategorijeSelekt;

// // import React, { useState } from 'react';
// // import Select from 'react-select';
// // import { useDispatch, useSelector } from 'react-redux';
// // import {
// // 	setFilters,
// // 	selectPhotos,
// // 	selectFilteredPhotos,
// // } from '../redux/rtk/gallerySlice';

// // function KategorijeSelekt() {
// // 	const dispatch = useDispatch();
// // 	const [filterSelected, setFilterSelected] = useState([]);

// // 	const photos = useSelector(selectPhotos);

// // 	const filteredPhotos = useSelector(selectFilteredPhotos);

// // 	const handleFilterChange = selectedFilters => {
// // 		setFilterSelected(selectedFilters);

// // 		const selectedFilterValues = selectedFilters.map(
// // 			filter => filter.label
// // 		);

// // 		const filteredPhotos = photos.filter(photo => {
// // 			return selectedFilterValues.includes(photo.kategorija);
// // 		});
// // 		console.log(filteredPhotos.length);

// // 		dispatch(setFilters(selectedFilterValues));
// // 	};
// // 	//
// // 	const handleKategorijeFilterChange = selectedFilters => {
// // 		const selectedFilterValues = selectedFilters.map(
// // 			filter => filter.label
// // 		);
// // 		dispatch(setFilters({ kategorije: selectedFilterValues }));
// // 	};
// // 	//
// // 	const customKategorijeOptions = [
// // 		{ value: 'gospodarski_objekti', label: 'gospodarski objekti' },
// // 		{ value: 'vazni_objekti', label: 'važni objekti' },
// // 		{ value: 'vjerski_objekti', label: 'vjerski objekti' },
// // 		{ value: 'arhitektura', label: 'arhitektura' },
// // 		{ value: 'ekologija', label: 'ekologija' },
// // 		{ value: 'tradicijska_gradnja', label: 'tradicijska gradnja' },
// // 		{ value: 'spomenici', label: 'spomenici' },
// // 		{ value: 'prirodni_resursi', label: 'prirodni resursi' },
// // 		{ value: 'stanovnistvo', label: 'stanovništvo' },
// // 		{ value: 'poljoprivreda', label: 'poljoprivreda' },
// // 		{ value: 'stocarstvo', label: 'stočarstvo' },
// // 		{ value: 'infrastruktura', label: 'infrastruktura' },
// // 	];

// // 	//
// // 	const cusTom = {
// // 		control: styles => ({
// // 			...styles,
// // 			backgroundColor: 'transparent',
// // 			border: 'none',
// // 			borderTop: '1px solid black',
// // 			borderRadius: '0',
// // 			cursor: 'pointer',
// // 		}),
// // 		option: (styles, { data, isDisabled, isFocused, isSelected }) => {
// // 			console.log('selekt', data, isDisabled, isFocused, isSelected);
// // 			return { ...styles, color: 'black', cursor: 'pointer' };
// // 		},
// // 		placeholder: styles => ({
// // 			...styles,
// // 			color: '#18aa00',
// // 			marginTop: '-13px',
// // 			marginLeft: '-8px',
// // 			fontSize: '22px',
// // 		}),
// // 		dropdownIndicator: provided => ({ ...provided, display: 'none' }),
// // 		indicatorSeparator: provided => ({
// // 			...provided,
// // 			display: 'none',
// // 		}),
// // 		menu: styles => ({
// // 			...styles,
// // 			zIndex: '9999',
// // 			cursor: 'pointer',
// // 			width: '46vw',
// // 			height: 'auto',
// // 		}),
// // 	};
// // 	return (
// // 		<div>
// // 			<Select
// // 				id='kategorije-select'
// // 				styles={cusTom}
// // 				placeholder='unesi/odaberi'
// // 				isSearchable
// // 				isMulti
// // 				options={customKategorijeOptions}
// // 				value={filterSelected.kategorije}
// // 				onChange={handleKategorijeFilterChange}
// // 				getOptionValue={option => option.value}
// // 				getOptionLabel={option => option.label}
// // 			/>
// // 			<label
// // 				htmlFor='kategorije-select'
// // 				style={{
// // 					fontSize: '22px',
// // 					color: '#7e7e77',
// // 				}}
// // 			>
// // 				kategorije
// // 			</label>
// // 		</div>
// // 	);
// // }

// // export default KategorijeSelekt;

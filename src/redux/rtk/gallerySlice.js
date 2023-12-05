import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { createSelector } from 'reselect';
const url = `${process.env.REACT_APP_SERVER}/photosrl`;

export const getPhotos = createAsyncThunk(
	'gallery/getPhotos',
	async () => {
		const rez = await fetch(url);
		const rezult = await rez.json();
		// console.log(rezult);
		return rezult;
	}
);

export const getAPhoto = createAsyncThunk(
	'gallery/getAPhoto',
	async id => {
		const rez = await fetch(
			`${process.env.REACT_APP_SERVER}/photosr/${id}`
		);
		const rezult = await rez.json();
		return rezult;
	}
);

const initialState = {
	selectedPhotoIndex: 0,
	idX: 0,
	photos: [],
	loading: false,
	error: null,
	selectedFilters: [],
};

export const gallerySlice = createSlice({
	name: 'gallery',
	initialState,
	reducers: {
		increment: state => {
			state.selectedPhotoIndex = Math.min(
				state.selectedPhotoIndex + 1
				// state.photos.length - 1
			);
		},
		decrement: state => {
			state.selectedPhotoIndex = Math.max(
				state.selectedPhotoIndex - 1
				// 0
			);
		},
		// ... other reducers

		setSelectedPhotoIndex: (state, action) => {
			state.selectedPhotoIndex = action.payload;
		},
		setSelectedPhoto: (state, action) => {
			state.selectedPhoto = action.payload;
		},
		setFilters: (state, action) => {
			// state.selectedFilters = action.payload;
			const { kategorije, tagovi } = action.payload;
			state.selectedFilters = {
				kategorije: kategorije || state.selectedFilters.kategorije,
				tagovi: tagovi || state.selectedFilters.tagovi,
			};
		},
	},
	extraReducers: {
		[getPhotos.pending]: state => {
			state.loading = true;
			state.error = null;
		},
		[getPhotos.fulfilled]: (state, action) => {
			state.photos = action.payload;
			state.loading = false;
			state.error = null;
		},
		[getPhotos.rejected]: (state, action) => {
			state.loading = false;
			state.error = action.error.message;
		},
		[getAPhoto.fulfilled]: (state, action) => {
			state.selectedPhoto = action.payload;
		},
	},
});

export const {
	increment,
	decrement,
	// selectPhotoIndex,
	setSelectedPhoto,
	setSelectedPhotoIndex,
	setFilters,
} = gallerySlice.actions;

export const selectPhotos = state => state.gallery.photos;
export const selectSelectedPhotoIndex = state =>
	state.gallery.selectedPhotoIndex;
// ...
export const selectAPhoto = state => {
	const selectedIdX = state.gallery.idX;
	const selectedPhoto = state.gallery.photos.find(photo => {
		const rank = parseInt(photo.rank_number);
		return rank === selectedIdX;
	});
	return selectedPhoto;
};
//
export const selectSelectedPhoto = state => {
	const selectedPhotoIndex = state.gallery.selectedPhotoIndex;
	const photos = state.gallery.photos;

	if (selectedPhotoIndex >= 0 && selectedPhotoIndex < photos.length) {
		return photos[selectedPhotoIndex];
	}

	return null; //
};

// const selectPhotos = state => state.gallery.photos;
// const selectSelectedFilters = state => state.gallery.selectedFilters;

// Filteri
// Filteri
export const selectFilteredPhotos = state => {
	const { kategorije, tagovi } = state.gallery.selectedFilters || {};
	const allPhotos = state.gallery.photos;

	if (!kategorije && !tagovi) {
		return allPhotos;
	}

	return allPhotos.filter(photo => {
		const kategorijaMatches =
			!kategorije ||
			kategorije.some(filter => {
				const categories = photo.kategorija
					? photo.kategorija
							.split(',')
							.map(category => category.trim())
					: [];
				return categories.includes(filter);
			});

		const tagoviIncluded =
			!tagovi ||
			tagovi.every(
				filter => photo.tagovi && photo.tagovi.includes(filter)
			);

		return kategorijaMatches && tagoviIncluded;
	});
};
export default gallerySlice.reducer;

// export const selectFilteredPhotos = state => {
// 	const selectedFilters = state.gallery.selectedFilters || [];
// 	const allPhotos = state.gallery.photos;

// 	if (selectedFilters.length === 0) {
// 		return allPhotos;
// 	}

// 	return allPhotos.filter(photo => {
// 		const kategorijaMatches = selectedFilters.some(filter => {
// 			const categories = photo.kategorija
// 				? photo.kategorija.split(',').map(category => category.trim())
// 				: [];
// 			return categories.includes(filter);
// 		});

// 		const tagoviIncluded = selectedFilters.every(filter => {
// 			return photo.tagovi && photo.tagovi.includes(filter);
// 		});

// 		// Change the logical operator from || (OR) to && (AND)
// 		return kategorijaMatches && tagoviIncluded;
// 	});
// };

// export const selectFilteredPhotos = state => {
// 	const selectedFilters = state.gallery.selectedFilters || [];
// 	const allPhotos = state.gallery.photos;

// 	if (selectedFilters.length === 0) {
// 		return allPhotos;
// 	}

// 	const filteredPhotos = allPhotos.filter(photo => {
// 		const kategorijaMatches = selectedFilters.some(filter => {
// 			const categories = photo.kategorija
// 				? photo.kategorija.split(',').map(category => category.trim())
// 				: [];
// 			return categories.includes(filter);
// 		});

// 		const tagoviIncluded = selectedFilters.every(filter => {
// 			return photo.tagovi && photo.tagovi.includes(filter);
// 		});

// 		return kategorijaMatches || tagoviIncluded;
// 	});

// 	console.log(filteredPhotos.length); // Log the number of filtered photos
// 	console.log(filteredPhotos); // Log the array of filtered photos

// 	return filteredPhotos;
// };

// export const selectFilteredPhotos = state => {
// 	const selectedFilters = state.gallery.selectedFilters || [];
// 	const allPhotos = state.gallery.photos;

// 	if (selectedFilters.length === 0) {
// 		return allPhotos;
// 	}

// 	return allPhotos.filter(photo => {
// 		return selectedFilters.some(filter => {
// 			const tagoviIncluded =
// 				photo.tagovi && photo.tagovi.includes(filter);
// 			const kategorijaMatches =
// 				photo.kategorija &&
// 				(photo.kategorija === filter ||
// 					photo.kategorija
// 						.split(',')
// 						.map(category => category.trim())
// 						.includes(filter));

// 			// console.log('Photo:', photo);
// 			console.log('Filter:', filter);
// 			console.log('tagoviIncluded:', tagoviIncluded);
// 			console.log('kategorijaMatches:', kategorijaMatches);
// 			// console.log('Filter Value:', filter.value);
// 			// console.log('Filter Label:', filter.label);
// 			// console.log('Photo Kategorija:', photo.kategorija);

// 			return tagoviIncluded || kategorijaMatches;
// 		});
// 	});
// };

// export const selectFilteredPhotos = state => {
// 	const selectedFilters = state.gallery.selectedFilters || [];
// 	const allPhotos = state.gallery.photos;

// 	if (selectedFilters.length === 0) {
// 		return allPhotos;
// 	}

// 	return allPhotos.filter(photo => {
// 		return selectedFilters.some(filter => {
// 			// Check both photo.tagovi and photo.kategorija
// 			const tagoviIncluded =
// 				photo.tagovi && photo.tagovi.includes(filter);
// 			const kategorijaMatches =
// 				photo.kategorija && photo.kategorija.includes(filter);

// 			console.log('Photo:', photo);
// 			console.log('Filter:', filter);
// 			console.log('tagoviIncluded:', tagoviIncluded);
// 			console.log('kategorijaMatches:', kategorijaMatches);

// 			return tagoviIncluded || kategorijaMatches;
// 		});
// 	});
// };

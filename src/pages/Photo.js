import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
	setSelectedPhoto,
	selectPhotos,
	getPhotos,
	setSelectedPhotoIndex,
	selectSelectedPhotoIndex,
	increment,
	decrement,
} from '../redux/rtk/gallerySlice';
import { useParams, useNavigate } from 'react-router-dom';
import './photo.css';
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa';
import Hline from '../comps/Line';

//
export default function Photo() {
	const dispatch = useDispatch();
	const navigate = useNavigate();
	const { signatura } = useParams();

	// const selectedImg = useSelector(selectSelectedPhoto);
	// Use useSelector to access selectedPhotoIndex from the Redux store
	const selectedPhotoIndex = useSelector(selectSelectedPhotoIndex);

	useEffect(() => {
		// Fetch photos if not already loaded
		dispatch(getPhotos());

		// No need to set selectedPhotoIndex here; it's managed in the Redux store
	}, [dispatch]);

	// Retrieve the selected photo
	const photos = useSelector(selectPhotos);
	const selectedPhoto = photos[selectedPhotoIndex];

	if (!selectedPhoto) {
		// Handle the case where the photo with the specified signatura is not found
		return <div>Photo not found</div>;
	}

	const handleBackToGallery = () => {
		navigate('/photos');
	};

	//
	const handleShowOnMap = () => {
		// Dispatch an action to set the selected marker in Redux
		dispatch(setSelectedPhoto(selectedPhoto));
		console.log(selectedPhoto);
		// Navigate back to the map view
		navigate(`/maps/${signatura}`);
	};

	//

	const removeFileExtension = fileName => {
		const lastDotIndex = fileName.lastIndexOf('.');
		if (lastDotIndex === -1) {
			return fileName; //
		}
		return fileName.substring(0, lastDotIndex);
	};
	//

	return (
		<div className='cont'>
			<div id='imgcnt' className='comands-container'>
				<div onClick={handleBackToGallery} className='cc-link'>
					natrag u galeriju
				</div>
				<div onClick={handleShowOnMap} className='cc-link'>
					pokaži na karti
				</div>
			</div>
			<div className='image-wrapper'>
				<FaChevronLeft
					className='prev'
					onClick={() => {
						if (selectedPhotoIndex > 0) {
							dispatch(decrement());
						}
					}}
					disabled={selectedPhotoIndex === 0}
				/>
				<div className='img-cnt'>
					<img
						src={
							selectedPhoto
								? `${process.env.REACT_APP_SERVER_PUB}/${selectedPhoto.signatura}`
								: ''
						}
						alt={selectedPhoto.naziv}
					/>
				</div>

				<FaChevronRight
					className='next'
					onClick={() => {
						if (selectedPhotoIndex < photos.length - 1) {
							dispatch(increment());
						}
					}}
					disabled={selectedPhotoIndex === photos.length - 1}
				/>
			</div>{' '}
			<div className='selected-div1'>
				{selectedPhoto.signatura && (
					<>
						<div className='t'>signatura:</div>
						<div className='d'>
							{removeFileExtension(selectedPhoto.signatura)}
						</div>
					</>
				)}
				{selectedPhoto.kategorija && (
					<>
						<div className='t'>kategorija:</div>
						<div className='d'>{selectedPhoto.kategorija}</div>
					</>
				)}{' '}
				{selectedPhoto.lokacija && (
					<>
						<div className='t'>lokacija:</div>
						<div className='d'>{selectedPhoto.lokacija}</div>
					</>
				)}
				{selectedPhoto.opis && (
					<>
						<div className='t'>opis:</div>
						<div className='d'>{selectedPhoto.opis}</div>
					</>
				)}
				{selectedPhoto.autor && (
					<>
						<div className='t'>autor:</div>
						<div className='d'>{selectedPhoto.autor}</div>
					</>
				)}
				{selectedPhoto.tagovi && (
					<div className='tag'>
						{/* <div className="rep"> */}
						ključne riječi | {selectedPhoto.tagovi}
						{/* </div> */}
					</div>
				)}
			</div>
			<Hline color='#7e7e77' height='2px' width='100%' />{' '}
		</div>
	);
}

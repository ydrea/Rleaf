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
	selectFilteredPhotos,
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

	const selectedPhotoIndex = useSelector(selectSelectedPhotoIndex);
	console.log(selectedPhotoIndex);
	const fphotos = useSelector(selectFilteredPhotos);
	const photos = useSelector(selectPhotos);
	//
	useEffect(() => {
		console.log(fphotos);
		dispatch(getPhotos());
	}, [dispatch]);

	useEffect(() => {
		// console.log(photos);
		const photoIndex = fphotos.findIndex((photo, index) => {
			dispatch(setSelectedPhoto(photo.signatura));
			return photo.signatura === signatura;
		});

		// console.log(photoIndex, photos, signatura);
		dispatch(setSelectedPhotoIndex(photoIndex));
	}, [dispatch, photos, signatura]);

	const selectedPhoto = fphotos[selectedPhotoIndex];
	console.log(selectedPhoto);
	if (!selectedPhoto) {
		return <div>Photo not found</div>;
	}

	//to gallery
	const handleBackToGallery = () => {
		navigate('/photos');
	};

	//show on map
	const handleShowOnMap = () => {
		dispatch(setSelectedPhoto(signatura));
		navigate(`/maps/${signatura}#mapcnt`);
	};

	//remove .ext
	const removeFileExtension = fileName => {
		const lastDotIndex = fileName.lastIndexOf('.');
		if (lastDotIndex === -1) {
			return fileName; //
		}
		return fileName.substring(0, lastDotIndex);
	};
	//

	return (
		<div id='imgcnt' className='cont'>
			<div className='comands-container'>
				<div onClick={handleBackToGallery} className='cc-link'>
					natrag u galeriju
				</div>
				<div className='cc'>
					{selectedPhotoIndex + 1} / {fphotos.length}
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
						if (selectedPhotoIndex < fphotos.length - 1) {
							dispatch(increment());
						}
					}}
					disabled={selectedPhotoIndex === fphotos.length - 1}
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

// import React from 'react';
import { Outlet } from 'react-router-dom';
import Selekt from './comps/Selekt';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useParams, useNavigate } from 'react-router-dom';
import {
	getPhotos,
	setSelectedPhotoIndex,
	selectPhotos,
	selectSelectedPhotoIndex,
	setFilters,
	selectFilteredPhotos,
	increment,
	decrement,
} from './redux/rtk/gallerySlice';
import './pages/photos.css';
import Photo from './pages/Photo';
import Footer from './comps/Footer';
import Hline from './comps/Line';
//
const PhotosLayout = () => {
	const navigate = useNavigate();
	const dispatch = useDispatch();
	const photos = useSelector(selectPhotos);
	const { signatura } = useParams();
	const selectedPhotoIndex = useSelector(selectSelectedPhotoIndex);
	const [selectedFilters, setSelectedFilters] = useState([]);
	const [showPhoto, showPhotoSet] = useState(false);
	//
	const filteredPhotos = useSelector(state =>
		selectFilteredPhotos(state, selectedFilters)
	);
	//
	return (
		<div className='gallery'>
			<section>
				<div className='naslov-container'>
					<h1>opservatorij</h1>
					<div className='line-div0' />
				</div>{' '}
				<div className='teka'>
					<div className='tekast'>
						{' '}
						Dobrodošli u fototeku, odabrani fotografski arhiv koji
						kroz pretraživanje i klasifikaciju sadržaja omogućava
						različite vrste stručnih i znanstvenih usporedbi. Kroz
						različite kategorije poput arhitekture, ekologije,
						gospodarstva, infrastrukture, poljoprivrede, prirodnih
						resursa, spomenika, stanovništva, stočarstva, a pogotovo
						kroz ključne riječi omogućeno je pretraživanje obimne
						fotografske građe kojom se mogu analizirati grupni i
						pojedinačni elementi unutar krajobraza, ali i sve
						društvene kontradikcije koje iz njega proizlaze.{' '}
					</div>
					{/* <div className="line-div1" />{' '} */}
				</div>
			</section>{' '}
			<Hline color='#18aa00' height='1px' width='100%' />{' '}
			<section>
				<Outlet filteredPhotos={filteredPhotos} />{' '}
				{/* This will render child routes */}
			</section>
			{/* <Footer /> */}
		</div>
	);
};

export default PhotosLayout;

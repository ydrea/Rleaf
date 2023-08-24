import React, { useEffect, useState } from 'react';
// import { useDispatch, useSelector } from 'react-redux';
import { Link, useParams, useNavigate } from 'react-router-dom';
import {
  getPhotos,
  increment,
  decrement,
  selectPhotoIndex,
  selectPhotos,
  selectSelectedPhotoIndex,
} from '../redux/rtk/gallerySlice';
import { Card } from '../comps/Card';
import './photos.scss';

import { useDispatch, useSelector } from 'react-redux';
// import { selectPhotoIndex, selectPhotos } from './gallerySlice';
import {
  setSelectedMarker,
  clearSelectedMarker,
  selectSelectedMarkerCoords,
  selectSelectedMarkerPopUp,
} from '../redux/rtk/mapSlice';

// ...
// ...

export default function Photos() {
  const dispatch = useDispatch();
  const photos = useSelector(selectPhotos);
  const selectedPhotoIndex = useSelector(selectSelectedPhotoIndex);
  const selectedPhoto = photos[selectedPhotoIndex];
  const { signatura } = useParams();

  const selectedMarkerCoords = useSelector(
    selectSelectedMarkerCoords
  );
  const selectedMarkerPopUp = useSelector(selectSelectedMarkerPopUp);

  // Get the markers array from Redux state
  const markers = useSelector(selectMarkers);

  useEffect(() => {
    const selectedPhoto = photos.find(
      photo => photo.signatura === signatura
    );
    if (selectedPhoto) {
      dispatch(selectPhotoIndex(photos.indexOf(selectedPhoto)));

      // Dispatch the action to set the selected marker coordinates
      dispatch(
        setSelectedMarker({
          coords: selectedPhoto.geocode,
          popUp: selectedPhoto.popUp,
        })
      );
    }
  }, [signatura, photos, dispatch]);
  //
  // useEffect(() => {
  //   dispatch(getPhotos());
  // }, [dispatch]);

  const handleShowOnMap = () => {
    if (selectedMarkerCoords && selectedMarkerPopUp) {
      const markerToClick = markers.find(
        marker => marker.popUp === selectedMarkerPopUp
      );

      if (markerToClick) {
        const markerIndex = markers.indexOf(markerToClick);
        const markerCluster = markerClusterRef.current.leafletElement; // Now you can use markerClusterRef directly
        const markerLayer =
          markerCluster.getVisibleParent(markerIndex);

        if (markerLayer) {
          markerLayer.fireEvent('click');
          const mapInstance = mapRef.current.leafletElement;
          mapInstance.setView(selectedMarkerCoords, mapZoom);

          // Wait for the zoom animation to complete before navigating
          setTimeout(() => {
            navigate(`/mapa/${selectedMarkerPopUp}`);
          }, 500);
        }
      }
    }
  };
  useEffect(() => {
    dispatch(getPhotos());
  }, [dispatch]);

  const handleNextPhoto = () => {
    dispatch(increment());
  };

  const handlePreviousPhoto = () => {
    dispatch(decrement());
  };

  return (
    <div className="gallery">
      <div>
        <button onClick={handlePreviousPhoto}>Previous Photo</button>
        <button onClick={handleNextPhoto}>Next Photo</button>
      </div>
      {selectedPhoto && <Card photo={selectedPhoto} />}
      {selectedPhoto && (
        <div>
          <button onClick={handleShowOnMap}>Show on Map</button>
        </div>
      )}
      <div className="photo-container">
        {photos.map(photo => (
          <Link to={`/photos/${photo.signatura}`} key={photo.id}>
            <img
              src={`${process.env.REACT_APP_SERVER_PUB}/${photo.signatura}`}
              alt={photo.naziv}
              style={{ width: '400px' }}
              onClick={
                () =>
                  dispatch(selectPhotoIndex(photos.indexOf(photo))) // Dispatch the action directly
              }
            />
          </Link>
        ))}
      </div>
    </div>
  );
}

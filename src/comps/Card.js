export function Card({ photo, popUp, signatura }) {
  return (
    <div>
      <img
        src={process.env.REACT_APP_SERVER_PUB + `/${photo.signatura}`} //
        alt={photo.naziv}
        width="100%"
      />
      <div>
        {photo.naziv}, {photo.opis}, {photo.lokacija},{' '}
        {photo.latitude}, {photo.longitude}
      </div>
    </div>
  );
}

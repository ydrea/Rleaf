export function Card({ photo }) {
  return (
    <div>
      <img
        src={process.env.REACT_APP_SERVER_PUB + `/${photo.signatura}`} //
        alt={photo.naziv}
        width="60%"
      />
      <div>
        {photo.naziv}, {photo.opis}, {photo.lokacija},{' '}
        {photo.latitude}, {photo.longitude}
      </div>
    </div>
  );
}

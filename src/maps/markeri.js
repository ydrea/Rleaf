import axios from 'axios';
const raw = axios.get('http://localhost:3500/json_photos');
console.log(raw);

export const markeri = () => {
  return <>{raw}</>;
};

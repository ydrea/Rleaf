export default function extractLatLongFromJSON(data) {
  try {
    if (
      data.type === 'Point' &&
      Array.isArray(data.coordinates) &&
      data.coordinates.length === 2
    ) {
      const latitude = data.coordinates[1];
      const longitude = data.coordinates[0];
      return { latitude, longitude };
    } else {
      throw new Error('Invalid JSON format or missing coordinates');
    }
  } catch (error) {
    console.error('Error parsing JSON:', error);
    return null;
  }
}

// //tipofthespear
// useEffect(() => {
//   const fetchData = async () => {
//     try {
//       const response = await axios.get(
//         `${process.env.REACT_APP_SERVER}/json_photos`
//       );
//       console.log(response.data);
//       const parsedData = response.data.map(item => {
//         const geo = JSON.parse(item.geometry);

//         const coordinates = extractLatLongFromJSON(geo);

//         if (
//           coordinates &&
//           coordinates.latitude &&
//           coordinates.longitude
//         ) {
//           console.log('Latitude:', coordinates.latitude);
//           console.log('Longitude:', coordinates.longitude);

//           return {
//             popUp: item.signatura,
//             geocode: [coordinates.latitude, coordinates.longitude],
//           };
//         } else {
//           console.error('Invalid JSON or missing coordinates:', geo);
//           return null;
//         }
//       });

//       const filteredData = parsedData.filter(item => item !== null);

//       markeriSet(filteredData);
//       return filteredData;
//     } catch (error) {
//       console.error('Error fetching data:', error);
//     }
//   };
//   fetchData();
// }, []);

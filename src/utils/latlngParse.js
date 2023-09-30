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

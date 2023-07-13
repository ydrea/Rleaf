
//vAstev
const map = L.map('map').fitBounds([[45.49310,13.49483],[45.50475,13.51427]]);
        
// setView([45.5, 13.50001], 17);

const raster = L.tileLayer('	https://mjestopodsuncem.synology.me/qgis2web/savudrija_dof2cm_xyz/{z}/{x}/{y}.jpg'
, {
  attribution: 'grgoje',
  // subdomains: 'abcd',
  minZoom: 17,
  maxZoom: 23
});
raster.addTo(map);

//uEctor 
// //geoJson
// const uector =
L.geoJSON(ks, {style:  {
  fillColor: 'red',
  fillOpacity: .5,
  color: '#c0c0c0',
}} ).addTo(map)
L.geoJSON(oz, {style:  {
  fillColor: 'blue',
  fillOpacity: 1,
  color: '#c0c0c0',
}}).addTo(map)
L.geoJSON(rk, {style:  {
  fillColor: 'yellow',
  fillOpacity: .3,
  color: '#c0c0c0',
}}).addTo(map)

// //wsf
// var wfs_url =
// 'https://starigrad.agr.unizg.hr/geoserver/wfs?SERVICE=WFS&VERSION=1.0.0&REQUEST=GetFeature&TYPENAME=qgis2webtest:kopnena_stanista_2016&SRSNAME=EPSG:4326'
// // &outputFormat=text%2Fjavascript&format_options=callback%3Agetkopnena_stanista_2016_0Json'




// //wfst
// var Vlayer = new L.WFST({
//   url: wfs_url,
//   type: 'FeatureCollection',
//   typeName: 'obuhvat_zahvat',
//   crs:   L.CRS.EPSG4326,
//   	  style: {
//       color: 'blue',
//       weight: 2
//   }
// })
// Vlayer.addTo(map)



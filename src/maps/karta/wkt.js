//Init BaseMaps
var basemaps = {
	OpenStreetMaps: L.tileLayer(
		'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
		{
			minZoom: 2,
			maxZoom: 19,
			id: 'osm.streets',
		}
	),
	'Google-Map': L.tileLayer(
		'https://mt1.google.com/vt/lyrs=r&x={x}&y={y}&z={z}',
		{
			minZoom: 2,
			maxZoom: 19,
			id: 'google.street',
		}
	),
	'Google-Satellite': L.tileLayer(
		'https://mt1.google.com/vt/lyrs=s&x={x}&y={y}&z={z}',
		{
			minZoom: 2,
			maxZoom: 19,
			id: 'google.satellite',
		}
	),
	'Google-Hybrid': L.tileLayer(
		'https://mt1.google.com/vt/lyrs=y&x={x}&y={y}&z={z}',
		{
			minZoom: 2,
			maxZoom: 19,
			id: 'google.hybrid',
		}
	),
	'Six-Aerial': L.tileLayer(
		'http://maps.six.nsw.gov.au/arcgis/rest/services/public/NSW_Imagery/MapServer/tile/{z}/{y}/{x}',
		{
			minZoom: 2,
			maxZoom: 20,
			id: 'six.aerial',
		}
	),
};

//Init Overlays
var overlays = {};

//Render Main Map
var map = L.map('map', {
	center: [-29.0529434318608, 152.01910972595218],
	zoom: 10,
	attributionControl: false,
	layers: [basemaps.OpenStreetMaps],
});

//Init Layer Control
var layerControl = L.control.layers(basemaps, overlays).addTo(map);

var editableLayers = new L.FeatureGroup();
map.addLayer(editableLayers);

var drawControl = new L.Control.Draw({
	position: 'topright',
	draw: {
		polyline: true,
		polygon: {
			allowIntersection: false, // Restricts shapes to simple polygons
			drawError: {
				color: '#e1e100', // Color the shape will turn when intersects
				message: "<strong>Oh snap!<strong> you can't draw that!", // Message that will show when intersect
			},
		},
		circle: true, // Turns off this drawing tool
		rectangle: true,
		marker: true,
	},
	edit: {
		featureGroup: editableLayers, //REQUIRED!!
		remove: true,
	},
});

map.addControl(drawControl);

map.on(L.Draw.Event.CREATED, function (e) {
	var type = e.layerType,
		layer = e.layer;

	if (type === 'marker') {
		layer
			.bindPopup(
				'LatLng: ' +
					layer.getLatLng().lat +
					',' +
					layer.getLatLng().lng
			)
			.openPopup();
	}

	editableLayers.addLayer(layer);
	layerGeoJSON = editableLayers.toGeoJSON();
	alert('GEOJSON FORMAT\r\n' + JSON.stringify(layerGeoJSON));

	var wkt_options = {};
	var geojson_format = new OpenLayers.Format.GeoJSON();
	var testFeature = geojson_format.read(layerGeoJSON);
	var wkt = new OpenLayers.Format.WKT(wkt_options);
	var out = wkt.write(testFeature);

	alert('WKT FORMAT\r\n' + out);
});

//On Draw Edit Event
map.on(L.Draw.Event.EDITED, function (e) {
	var type = e.layerType,
		layer = e.layer;

	layerGeoJSON = editableLayers.toGeoJSON();
	alert('GEOJSON FORMAT\r\n' + JSON.stringify(layerGeoJSON));

	var wkt_options = {};
	var geojson_format = new OpenLayers.Format.GeoJSON();
	var testFeature = geojson_format.read(layerGeoJSON);
	var wkt = new OpenLayers.Format.WKT(wkt_options);
	var out = wkt.write(testFeature);

	alert('WKT FORMAT\r\n' + out);
});

//On Draw Delete Event
map.on(L.Draw.Event.DELETED, function (e) {
	var type = e.layerType,
		layer = e.layer;

	layerGeoJSON = editableLayers.toGeoJSON();
	alert('GEOJSON FORMAT\r\n' + JSON.stringify(layerGeoJSON));

	var wkt_options = {};
	var geojson_format = new OpenLayers.Format.GeoJSON();
	var testFeature = geojson_format.read(layerGeoJSON);
	var wkt = new OpenLayers.Format.WKT(wkt_options);
	var out = wkt.write(testFeature);

	alert('WKT FORMAT\r\n' + out);
});

import L from 'leaflet';
import axios from 'axios';
import isValidURL from '../../utils/isvalidUrl';
import getParameterByName from '../../utils/getUrlParams';
//
// Add this function outside of your L.TileLayer.BetterWMS definition
function flyToLocation(map, latlng) {
	map.flyTo(latlng, 15);
}

//
L.TileLayer.BetterWMS = L.TileLayer.WMS.extend({
	onAdd: function (map) {
		// Triggered when the layer is added to a map.
		// Register a click listener, then do all the upstream WMS things
		L.TileLayer.WMS.prototype.onAdd.call(this, map);
		map.on('click', this.getFeatureInfo, this); // Bind the function to the correct context
	},

	onRemove: function (map) {
		// Triggered when the layer is removed from a map.
		//   Unregister a click listener, then do all the upstream WMS things
		L.TileLayer.WMS.prototype.onRemove.call(this, map);
		map.off('click', this.getFeatureInfo, this);
	},

	//get em
	getFeatureInfo: function (evt) {
		// Make an Axios request to the server
		var url = this.getFeatureInfoUrl(evt.latlng);
		var showResults = L.Util.bind(this.showGetFeatureInfo, this);

		axios
			.get(url)
			.then(function (response) {
				var err =
					typeof response.data === 'string' ? null : response.data;
				showResults(err, evt.latlng, response.data);
			})
			.catch(function (error) {
				showResults(error);
			});
	},

	getFeatureInfoUrl: function (latlng) {
		// Convert latlng to integers
		const point = this._map.latLngToContainerPoint(latlng);
		const size = this._map.getSize();

		// Ensure that X and Y coordinates are integers
		const x = Math.round(point.x);
		const y = Math.round(point.y);

		// Other request parameters
		const params = {
			request: 'GetFeatureInfo',
			service: 'WMS',
			crs: 'EPSG:4326',
			styles: this.wmsParams.styles,
			transparent: this.wmsParams.transparent,
			version: this.wmsParams.version,
			format: this.wmsParams.format,
			bbox: this._map.getBounds().toBBoxString(),
			height: size.y,
			width: size.x,
			layers: this.wmsParams.layers,
			query_layers: this.wmsParams.layers,
			// info_format: 'text/plain',
			info_format: 'text/html',
			// info_format: 'application/json',
			x: x, // Use the rounded X coordinate
			y: y, // Use the rounded Y coordinate
		};

		return this._url + L.Util.getParamString(params, this._url, true);
	},

	// with imgs
	//with triggers
	showGetFeatureInfo: function (
		err,
		latlng,
		content,
		signaturaFromUrl
	) {
		if (err) {
			console.log(err);
			return;
		}

		var tempDiv = document.createElement('div');
		tempDiv.innerHTML = content;
		var rows = tempDiv.querySelectorAll('tr');

		var shouldFlyTo = false; // Initialize the flag

		for (var i = 0; i < rows.length; i++) {
			var row = rows[i];
			var cells = row.querySelectorAll('th, td');

			// console.log(header);

			if (cells.length >= 2) {
				var header = cells[0].textContent.trim();
				var value = cells[1].textContent.trim();

				if (header === 'signatura') {
					console.log('Header:', header);
					console.log('Value:', value);
				}

				if (
					header === 'signatura'
					// &&
					// signaturaFromUrl &&
					// value === signaturaFromUrl
				) {
					// Set the flag to true if the signatura matches
					shouldFlyTo = true;
					console.log('yea!');
				}

				if (header === 'foto_url') {
					var imgUrl = value.replace(/["']/g, '');
					var thumbUrl;
					var publicIndex = imgUrl.indexOf('/public/');
					if (publicIndex !== -1) {
						thumbUrl =
							imgUrl.slice(0, publicIndex + '/public/'.length) +
							'thumbs/' +
							imgUrl.slice(publicIndex + '/public/'.length);
					}
					console.log(imgUrl, thumbUrl);

					var newRow = document.createElement('tr');
					var newCell = document.createElement('td');
					newCell.style.width = '400px';
					var image = document.createElement('img');
					image.src = thumbUrl;
					image.alt = 'Image';
					image.style.minWidth = '400px';
					// image.style.margin = '10px';
					newCell.appendChild(image);
					newRow.appendChild(newCell);
					//
					row.parentNode.replaceChild(newRow, row);
				} else {
					if (value === 'NULL' || value === '') {
						row.parentNode.removeChild(row);
					}
				}
			}
		}

		var filteredContent = tempDiv.innerHTML;
		// console.log(filteredContent);
		L.popup({ minWidth: '500px', width: '100%' })
			.setLatLng(latlng)
			.setContent(filteredContent)
			.openOn(this._map);

		// if (shouldFlyTo) {
		// 	flyToLocation(this._map, latlng);
		// }
	},

	// ...

	// ...
	////////////////////
	// showGetFeatureInfo: function (err, latlng, content) {
	//   if (err) {
	//     console.log(err);
	//     return;
	//   } // do nothing if there's an error
	//   console.log(content);

	//   // Otherwise show the content in a popup, or something.
	//   L.popup({ maxWidth: 800 })
	//     .setLatLng(latlng)
	//     .setContent(content)
	//     .openOn(this._map);
	// },
	/////////////
});

L.TileLayer.betterWms = function (url, options) {
	return new L.TileLayer.BetterWMS(url, options);
};

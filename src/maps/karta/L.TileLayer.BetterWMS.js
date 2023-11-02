import L from 'leaflet';
import axios from 'axios';

//
L.TileLayer.BetterWMS = L.TileLayer.WMS.extend({
  onAdd: function (map) {
    // Triggered when the layer is added to a map.
    //   Register a click listener, then do all the upstream WMS things
    L.TileLayer.WMS.prototype.onAdd.call(this, map);
    map.on('click', this.getFeatureInfo, this);
  },

  onRemove: function (map) {
    // Triggered when the layer is removed from a map.
    //   Unregister a click listener, then do all the upstream WMS things
    L.TileLayer.WMS.prototype.onRemove.call(this, map);
    map.off('click', this.getFeatureInfo, this);
  },

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
      info_format: 'text/html',
      // info_format: 'application/json',
      x: x, // Use the rounded X coordinate
      y: y, // Use the rounded Y coordinate
    };

    return this._url + L.Util.getParamString(params, this._url, true);
  },
  showGetFeatureInfo: function (err, latlng, content) {
    if (err) {
      console.log(err);
      return;
    }
    var tempDiv = document.createElement('div');
    tempDiv.innerHTML = content;

    var rows = tempDiv.querySelectorAll('tr'); //

    for (var i = 0; i < rows.length; i++) {
      var row = rows[i];
      var cells = row.querySelectorAll('td');

      var isFotoUrl = cells[0].textContent.trim() === 'foto_url';

      if (isFotoUrl) {
        var imgUrl = cells[1].textContent.trim();
        imgUrl = imgUrl.replace(/["']/g, '');
        var link = document.createElement('a');
        link.href = imgUrl;
        link.target = '_blank';
        link.textContent = imgUrl;
        cells[1] = link;
      }

      // Check if any cell has a value that is not 'NULL' or empty
      var hasValue = Array.from(cells).some(function (cell) {
        return (
          cell.textContent.trim() !== '' &&
          cell.textContent.trim() !== 'NULL'
        );
      });

      if (!hasValue) {
        row.parentNode.removeChild(row);
      }
    }

    // Create a new HTML content with filtered rows
    var filteredContent = tempDiv.innerHTML;

    // Display the filtered HTML content in the popup
    L.popup({ maxWidth: 800 })
      .setLatLng(latlng)
      .setContent(filteredContent)
      .openOn(this._map);
  },

  // showGetFeatureInfo: function (err, latlng, content) {
  //   if (err) {
  //     console.log(err);
  //     return;
  //   } // do nothing if there's an error
  //   console.log(content);

  //   // Otherwise show the content in a popup, or something.
  //   L.popup({ maxWidth: 800 })
  //     .setLatLng(latlng)
  //     .setContent(contentString)
  //     .openOn(this._map);
  // },
});

L.TileLayer.betterWms = function (url, options) {
  console.log(url, options);
  return new L.TileLayer.BetterWMS(url, options);
};

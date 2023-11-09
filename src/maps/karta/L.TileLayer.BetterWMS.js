import L from 'leaflet';
import axios from 'axios';
import isValidURL from '../../utils/isvalidUrl';
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
      // info_format: 'text/plain',
      info_format: 'text/html',
      // info_format: 'application/json',
      x: x, // Use the rounded X coordinate
      y: y, // Use the rounded Y coordinate
    };

    return this._url + L.Util.getParamString(params, this._url, true);
  },

  //////////
  // ...

  // with imgs

  showGetFeatureInfo: function (err, latlng, content) {
    if (err) {
      console.log(err);
      return;
    }

    var tempDiv = document.createElement('div');
    tempDiv.innerHTML = content;
    var rows = tempDiv.querySelectorAll('tr');

    for (var i = 0; i < rows.length; i++) {
      var row = rows[i];
      var cells = row.querySelectorAll('th, td');
      if (cells.length >= 2) {
        var header = cells[0].textContent.trim();
        var value = cells[1].textContent.trim();
        if (header === 'foto_url') {
          console.log('yea!');
          var imgUrl = value.replace(/["']/g, '');
          console.log(imgUrl);

          var newRow = document.createElement('tr');
          var newCell = document.createElement('td');
          newCell.style.width = '100%';
          var image = document.createElement('img');
          image.src = imgUrl;
          image.alt = 'Image';
          image.style.width = '200%';

          image.style.margin = '1% 10%';
          newCell.appendChild(image);

          newRow.appendChild(newCell);

          row.parentNode.replaceChild(newRow, row);
        } else {
          if (value === 'NULL' || value === '') {
            row.parentNode.removeChild(row);
          }
        }
      }
    }

    var filteredContent = tempDiv.innerHTML;
    console.log(filteredContent);
    L.popup({ maxWidth: 400 })
      .setLatLng(latlng)
      .setContent(filteredContent)
      .openOn(this._map);
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

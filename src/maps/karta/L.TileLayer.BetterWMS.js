import L from 'leaflet';
import axios from 'axios';

//
L.TileLayer.BetterWMS = L.TileLayer.WMS.extend({
  onAdd: function (map) {
    L.TileLayer.WMS.prototype.onAdd.call(this, map);
    map.on('click', this.getFeatureInfo, this);
  },

  onRemove: function (map) {
    L.TileLayer.WMS.prototype.onRemove.call(this, map);
    map.off('click', this.getFeatureInfo, this);
  },

  getFeatureInfo: function (evt) {
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
    const point = this._map.latLngToContainerPoint(latlng);
    const size = this._map.getSize();

    const x = Math.round(point.x);
    const y = Math.round(point.y);

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
      // info_format: 'text/html',
      info_format: 'text/plain',
      // info_format: 'application/json',
      x: x,
      y: y,
    };

    return this._url + L.Util.getParamString(params, this._url, true);
  },

  ////////////////////

  // showGetFeatureInfo: function (err, latlng, content) {
  //   if (err) {
  //     console.log(err);
  //     return;
  //   }
  //   var tempDiv = document.createElement('div');
  //   tempDiv.innerHTML = content;

  //   var rows = tempDiv.querySelectorAll('tr'); //

  //   for (var i = 0; i < rows.length; i++) {
  //     var row = rows[i];
  //     var cells = row.querySelectorAll('td');

  //     // var isFotoUrl = cells[0].textContent.trim() === 'foto_url';

  //     // if (isFotoUrl) {
  //     //   var imgUrl = cells[1].textContent.trim();
  //     //   imgUrl = imgUrl.replace(/["']/g, '');
  //     //   var link = document.createElement('a');
  //     //   link.href = imgUrl;
  //     //   link.target = '_blank';
  //     //   link.textContent = imgUrl;
  //     //   cells[1] = link;
  //     // }

  //     var hasValue = Array.from(cells).some(function (cell) {
  //       return (
  //         cell.textContent.trim() !== '' &&
  //         cell.textContent.trim() !== 'NULL'
  //       );
  //     });

  //     if (!hasValue) {
  //       row.parentNode.removeChild(row);
  //     }
  //   }

  //   var filteredContent = tempDiv.innerHTML;

  //   L.popup({ maxWidth: 500 })
  //     .setLatLng(latlng)
  //     .setContent(filteredContent)
  //     .openOn(this._map);
  // },
  ////////////////////

  showGetFeatureInfo: function (err, latlng, content) {
    if (err) {
      console.log(err);
      return;
    } // do nothing if there's an error
    // console.log(content);
    //GetFeatureInfo results Layer 'tema_koristenje_zemljista' Feature 77 fid = '77' ogr_fid = '4199' id = 'HR_4786' code_18 = '231' area_ha = '105.903908024' remark = 'NULL' code_opis = 'Pašnjaci' code_i_opi = '231 - Pašnjaci' shape_leng = '6962.63348587' shape_area = '1059039.08024'

    //     //https://landscape.agr.hr/qgis?SERVICE=WMS&VERSION=1.3.0&REQUEST=GetFeatureInfo&BBOX=1811023.36914263293147087,5670857.47401387337595224,1811754.34740473655983806,5672209.11522108595818281&CRS=EPSG:3857&WIDTH=656&HEIGHT=1213&LAYERS=preklop_drvene_zgrade&STYLES=&FORMAT=image/png&QUERY_LAYERS=preklop_drvene_zgrade&INFO_FORMAT=application/json&I=391&J=313&FEATURE_COUNT=10

    // Otherwise show the content in a popup, or something.
    L.popup({ maxWidth: 500 })
      .setLatLng(latlng)
      .setContent(content)
      .openOn(this._map);
  },
});

L.TileLayer.betterWms = function (url, options) {
  // console.log(url, options);
  return new L.TileLayer.BetterWMS(url, options);
};

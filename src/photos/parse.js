// var parser = window.ExifParser.create(arrayBuffer);

var parser = require('exif-parser').create(buffer);
try {
  var result = parser.parse();
} catch (err) {
  console.log(err); // got invalid data, handle error
}

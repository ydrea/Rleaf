import './App.css';
import 'leaflet/dist/leaflet.css'
import {MapContainer, Popup, TileLayer} from 'react-leaflet'
import { Marker } from 'react-leaflet';
import  MarkerClusterGroup from 'react-leaflet-cluster';
import { Icon } from 'leaflet';

const markers =[
  {
    geocode: [45.5, 13.5],
    popUp: 'medo?'
  },
  {
    geocode: [45.502, 13.5],
    popUp: 'zeko!'
  }, {
    geocode: [45.501, 13.504],
    popUp: 'ribicaa!'
  }
]

const lIcon = new Icon({
  iconUrl: require("./ikona.png"),
  iconSize: [28, 28]
})

function App () {

return (<>
Rleaf
  <MapContainer center={[45.501,13.51]} zoom={15}>
<TileLayer attribution='OpenStreetMap' url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"/>
<MarkerClusterGroup>
{markers.map((i)=>(
  <Marker position={i.geocode} icon={lIcon}>
    <Popup>{i.popUp}</Popup>
  </Marker>
))
}
</MarkerClusterGroup>
  </MapContainer>

  </>
)
}
export default App;

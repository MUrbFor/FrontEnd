import L from 'leaflet';
import icon from '../../images/trainIcon.png'

const iconEV = new L.Icon({
    iconUrl: icon,
    iconRetinaUrl: icon,
    iconAnchor: null,
    popupAnchor: [-1, -20],
    shadowUrl: null,
    shadowSize: null,
    shadowAnchor: null,
    iconSize: new L.Point(30, 30),
    className: 'leaflet-div-icon'
});

export { iconEV };
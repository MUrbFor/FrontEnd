import L from 'leaflet';
import icon from '../../images/scooter.svg'

const scooterIcon = new L.Icon({
    iconUrl: icon,
    iconRetinaUrl: icon,
    iconAnchor: null,
    popupAnchor: null,
    shadowUrl: null,
    shadowSize: null,
    shadowAnchor: null,
    iconSize: new L.Point(10, 10),
    className: 'leaflet-div-icon'
});

export { scooterIcon };
import React from 'react';
import { MapContainer, TileLayer, Marker, Popup, LayersControl, FeatureGroup } from 'react-leaflet';
import stops from "../../data/Stops.json";
import {  iconEV  } from '../markers/trainM.js';

function RSELayer() {
    const indexed = stops.map((item, id) => Object.assign(item, {id}));
    const RSE = indexed.filter(stop => stop.StopType === "RSE");

    return(
        <LayersControl.Overlay name="RSE">
        <FeatureGroup name="Marker with popup">
            {RSE.map(stop => (
            <Marker 
                key = {stop.id}
                icon = {iconEV}
                position={[stop.Latitude, stop.Longitude]}> 
            </Marker>
            ))}
        </FeatureGroup>
        </LayersControl.Overlay>
    );
}

export default RSELayer;
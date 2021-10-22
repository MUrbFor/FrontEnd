import React from 'react';
import { MapContainer, TileLayer, Marker, Popup, LayersControl, FeatureGroup } from 'react-leaflet';
import tc1 from "../../data/TCP1.json";
//import tc2 from "../../data/TCP2.json";

import {  iconEV  } from '../markers/Marker.js';

function TrafficCount() {
    const indexed = tc1.map((item, id) => Object.assign(item, {id}));


    return(
        <LayersControl.Overlay name="Traffic COunt">
        <FeatureGroup name="Marker with popup">
            {indexed.map(stop => (
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

export default TrafficCount;
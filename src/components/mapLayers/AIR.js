import React from 'react';
import { MapContainer, TileLayer, Marker, Popup, LayersControl, FeatureGroup } from 'react-leaflet';
import stops from "../../data/Stops.json";
import {  iconEV  } from '../markers/airM.js';

function AIRLayer() {
    const indexed = stops.map((item, id) => Object.assign(item, {id}));
    const AIR = indexed.filter(stop => stop.StopType === "AIR");

    return(
        <LayersControl.Overlay name="AIR">
        <FeatureGroup name="Marker with popup">
            {AIR.map(stop => (
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

export default AIRLayer;
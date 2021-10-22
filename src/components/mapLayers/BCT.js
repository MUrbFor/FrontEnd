import React from 'react';
import { MapContainer, TileLayer, Marker, Popup, LayersControl, FeatureGroup } from 'react-leaflet';
import stops from "../../data/Stops.json";
import {  iconEV  } from '../markers/busM.js';

function BCTLayer() {
    const indexed = stops.map((item, id) => Object.assign(item, {id}));
    const BCT = indexed.filter(stop => stop.StopType === "BCT");
    console.log(indexed);

    return(
        <LayersControl.Overlay name="BCT">
        <FeatureGroup name="Marker with popup">
            {BCT.map(stop => (
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

export default BCTLayer;








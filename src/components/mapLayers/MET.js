import React from 'react';
import { MapContainer, TileLayer, Marker, Popup, LayersControl, FeatureGroup } from 'react-leaflet';
import stops from "../../data/Stops.json";
import {  iconEV  } from '../markers/metroM.js';

function METLayer() {
    const indexed = stops.map((item, id) => Object.assign(item, {id}));
    const MET = indexed.filter(stop => stop.StopType === "MET");
    //const PLT = indexed.filter(stop => stop.StopType === "PLT");

    return(
        <LayersControl.Overlay name="MET">
        <FeatureGroup name="Marker with popup">
            {MET.map(stop => (
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

export default METLayer;
import React from 'react';
import { MapContainer, TileLayer, Marker, Popup, LayersControl, FeatureGroup } from 'react-leaflet';
import stops from "../../data/Stops.json";
import {  iconEV  } from '../markers/ferryM.js';

function FTDLayer() {
    const indexed = stops.map((item, id) => Object.assign(item, {id}));
    const FTD = indexed.filter(stop => stop.StopType === "FTD");

    return(
        <LayersControl.Overlay name="FTD">
        <FeatureGroup name="Marker with popup">
            {FTD.map(stop => (
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

export default FTDLayer;
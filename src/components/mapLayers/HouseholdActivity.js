import React from 'react';
import { MapContainer, TileLayer, Marker, Popup, LayersControl, FeatureGroup } from 'react-leaflet';
import {features} from "../../data/GBLayer.json";
import LAdata from "../../data/Stops/HouseholdActivity.json"
import {  iconEV  } from '../markers/Marker.js';

function HouseholdActivityLayer() {
    const joined = {features}.contact(LAdata);
    console.log()
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

export default HouseholdActivityLayer;








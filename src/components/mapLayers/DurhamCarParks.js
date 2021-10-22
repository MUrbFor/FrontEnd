import React from 'react';
import { MapCDurhamCarParksontainer, TileLayer, Marker, Popup, LayersControl, FeatureGroup } from 'react-leaflet';
import durCarParks from "../../data/durhamCarParks.json";
import {  iconEV  } from '../markers/Marker.js';

function DurhamCarParks() {
    const indexed = durCarParks.map((item, id) => Object.assign(item, {id})); 

    return(
        <LayersControl.Overlay name="Durham Car Parks">
        <FeatureGroup name="Marker with popup">
            {indexed.map(carPark => (
            <Marker 
                key = {carPark.id}
                icon = {iconEV}
                position={[carPark.LAT, carPark.LONG]}> 
            </Marker>
            ))}
        </FeatureGroup>
        </LayersControl.Overlay>
    );
}

export default DurhamCarParks;
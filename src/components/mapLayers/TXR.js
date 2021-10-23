import React,{ useState } from 'react';
import { useMap, Marker, LayersControl, FeatureGroup } from 'react-leaflet';
import stops from "../../data/Stops.json";
import {  iconEV  } from '../markers/Marker.js';
import L from 'leaflet';

function TXRLayer(props) {
    const indexed = stops.map((item, id) => Object.assign(item, {id}));
    const TXR = indexed.filter(stop => stop.StopType === "TXR");

    const map = useMap()


    
    //map.addControl()

    return(
        <LayersControl.Overlay name="TXR">
        <FeatureGroup name="Marker with popup">
            {TXR.map(stop => (
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

export default TXRLayer;
import { getDefaultNormalizer } from '@testing-library/dom';
import React, {useState, useEffect} from 'react';
import { MapContainer, TileLayer, Marker, Popup, LayersControl, FeatureGroup } from 'react-leaflet';
//import stops from "../../data/Stops.json";
import {  iconEV  } from '../markers/airM.js';



function AIRLayer() {
    const [AIRdata,AIRsetData] = useState([]);

    useEffect(()=> {
        loadData();
        //getData();

    }, []);

    const loadData = async () =>{
        await fetch("https://cleanstreetserver.herokuapp.com/v1/Stops")
        .then(response => response.json())
        .then(data => AIRsetData(data))
    }
    var stops = AIRdata;

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
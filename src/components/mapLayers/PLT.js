import React, {useState, useEffect} from 'react';
import { MapContainer, TileLayer, Marker, Popup, LayersControl, FeatureGroup } from 'react-leaflet';
//import stops from "../../data/Stops.json";
import {  iconEV  } from '../markers/metroM.js';

function PLTLayer() {
    const [PLTdata,PLTsetData] = useState([]);

    useEffect(()=> {
        loadData();
        //getData();

    }, []);

    const loadData = async () =>{
        await fetch("https://cleanstreetserver.herokuapp.com/v1/Stops")
        .then(response => response.json())
        .then(data => PLTsetData(data))
    }
    var stops = PLTdata;

    const indexed = stops.map((item, id) => Object.assign(item, {id}));
    const PLT = indexed.filter(stop => stop.StopType === "PLT");

    return(
        <LayersControl.Overlay name="PLT">
        <FeatureGroup name="Marker with popup">
            {PLT.map(stop => (
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

export default PLTLayer;
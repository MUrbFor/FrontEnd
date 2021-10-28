import React, {useState, useEffect} from 'react';
import { MapContainer, TileLayer, Marker, Popup, LayersControl, FeatureGroup } from 'react-leaflet';
//import stops from "../../data/Stops.json";
import {  iconEV  } from '../markers/trainM.js';

function RSELayer() {
    const [RSEdata,RSEsetData] = useState([]);

    useEffect(()=> {
        loadData();
        //getData();

    }, []);

    const loadData = async () =>{
        await fetch("https://cleanstreetserver.herokuapp.com/v1/Stops")
        .then(response => response.json())
        .then(data => RSEsetData(data))
    }
    var stops = RSEdata;

    const indexed = stops.map((item, id) => Object.assign(item, {id}));
    const RSE = indexed.filter(stop => stop.StopType === "RSE");

    return(
        <LayersControl.Overlay name="RSE">
        <FeatureGroup name="Marker with popup">
            {RSE.map(stop => (
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

export default RSELayer;
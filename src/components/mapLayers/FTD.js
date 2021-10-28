import React, {useState, useEffect} from 'react';
import { MapContainer, TileLayer, Marker, Popup, LayersControl, FeatureGroup } from 'react-leaflet';
//import stops from "../../data/Stops.json";
import {  iconEV  } from '../markers/ferryM.js';

function FTDLayer() {

    const [FTDdata,FTDsetData] = useState([]);

    useEffect(()=> {
        loadData();
        //getData();

    }, []);

    const loadData = async () =>{
        await fetch("https://cleanstreetserver.herokuapp.com/v1/Stops")
        .then(response => response.json())
        .then(data => FTDsetData(data))
    }
    var stops = FTDdata;

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
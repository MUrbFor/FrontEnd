import React, {useState, useEffect} from 'react';
import { MapCDurhamCarParksontainer, TileLayer, Marker, Popup, LayersControl, FeatureGroup } from 'react-leaflet';
import durCarParks from "../../data/durhamCarParks.json";
import {  iconEV  } from '../markers/Marker.js';

function DurhamCarParks() {
    const [Durhamdata,DurhamsetData] = useState([]);

    useEffect(()=> {
        loadData();
        //getData();

    }, []);

    const loadData = async () =>{
        await fetch("https://cleanstreetserver.herokuapp.com/v1/durhamCarParks")
        .then(response => response.json())
        .then(data => DurhamsetData(data))
    }

    const indexed = Durhamdata.map((item, id) => Object.assign(item, {id})); 
    
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
import React, {useState, useEffect} from 'react';
import { MapContainer, TileLayer, Marker, Popup, LayersControl, FeatureGroup,GeoJSON } from 'react-leaflet';
import {features} from "../../data/GBLayer.json";
//import VehicleData from "../../data/vehicleTypeJSON.json"
import {  iconEV  } from '../markers/Marker.js';

function mergeJson(json1, json2, primaryKey, foreignKey){
    const merged = [];
    json1.forEach(obj1 =>
        {
            var obj1MergedBool = false;
            json2.some(obj2 => {
                if (obj1.properties[primaryKey] == obj2[foreignKey]){
                    merged.push(Object.assign(obj1, obj2));
                    obj1MergedBool = true;
                }
            })
            if (obj1MergedBool == false){
                merged.push(obj1);
            }
        }
    )
    return merged;
}

function getColour(d) {
    return d > 21000 ? '#800026' :
        d > 19000  ? '#BD0026' :
        d > 15000  ? '#E31A1C' :
        d > 11000 ? '#FC4E2A' :
        d > 7000   ? '#FD8D3C' :
        d > 3000   ? '#FEB24C' :
        d > 1000   ? '#FED976' :
                    '#FFEDA0';
}

function VehicleType() {
    const [VTdata,VTsetData] = useState();

    var VThold;
    const loadData = async () => {
        const data = await fetch ("https://cleanstreetserver.herokuapp.com/v1/VehicleType")
        .then(response => response.json())
        .then(res => {
            VThold = res;
            loadData2();           
        });
    }
    const loadData2 = async () =>{
        const x = await fetch("https://cleanstreetserver.herokuapp.com/v1/GBLayer")
        .then(resp=> resp.json())
        .then(data => {
            var dFeatures = data.features;

            var jsonsMerged = mergeJson(dFeatures, VThold, "LAD13CD", "ONSCode"); 

            const feature = jsonsMerged.map(feature=>{
                return(feature);
            });
            VTsetData(feature);
        })
    }
    

    useEffect(() => {
        loadData();
    }, []);

    //var jsonsMerged = mergeJson(features, VehicleData, "LAD13CD", "ONSCode");

    const style = (feature => {
        return ({
            fillColor: getColour(feature.Motorcycles),
            weight: 1,
            opacity: 1,
            color: 'black',
            dashArray: '2',
            fillOpacity: 0.5
        });
    });

    

    return(
        <LayersControl.Overlay name="Motorcyle Count P/region">
        <FeatureGroup name="Marker with popup">
            {VTdata && (
                <GeoJSON data={VTdata} 
                    style={style} 
                />
            )}
        </FeatureGroup>
        </LayersControl.Overlay>
    );


    // return(
    //     <LayersControl.Overlay name="Blue Badge Data">
        
    //     </LayersControl.Overlay>
    // );
}

export default VehicleType;
import React, {useState, useEffect} from 'react';
import { useMap, MapContainer, TileLayer, Marker, Popup, LayersControl, FeatureGroup, GeoJSON } from 'react-leaflet';
import {features} from "../../data/GBLayer.json";
//import LAdata from "../../data/Stops/HouseholdActivity.json"
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

function HouseholdActivityLayer() {
    const [HHdata,HHsetData] = useState();

    var HHhold;

    const loadData = async () => {
        const data = await fetch ("https://cleanstreetserver.herokuapp.com/v1/HouseholdActivity")
        .then(response => response.json())
        .then(res => {
            HHhold = res;
            loadData2();           
        });
    }
    const loadData2 = async () =>{
        const x = await fetch("https://cleanstreetserver.herokuapp.com/v1/GBLayer")
        .then(resp=> resp.json())
        .then(data => {
            var dFeatures = data.features;

            var jsonsMerged = mergeJson(dFeatures, HHhold, "LAD13NM", "LAD13NM"); 

            const feature = jsonsMerged.map(feature=>{
                return(feature);
            });
            HHsetData(feature);
        })
    }
    
    useEffect(() => {
        loadData();
    }, []);

    const style = (feature => {
        return ({
            fillColor: getColour(feature.Working),
            weight: 1,
            opacity: 1,
            color: 'black',
            dashArray: '2',
            fillOpacity: 0.5
        });
    });

    return(
        <LayersControl.Overlay name="Working House Holds">
        <FeatureGroup name="Marker with popup">
            {HHdata && (
                <GeoJSON data={HHdata} 
                    style={style} 
                />
            )}
        </FeatureGroup>
        </LayersControl.Overlay>
    );
}

export default HouseholdActivityLayer;








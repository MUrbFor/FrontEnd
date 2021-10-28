import React, {useState, useEffect} from 'react';
import { MapContainer, TileLayer, Marker, Popup, LayersControl, FeatureGroup,GeoJSON } from 'react-leaflet';
import {features} from "../../data/GBLayer.json";
import pop from "../../data/cityPopEV.json"
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

function CurBEV() {
    //const [ value, setValue ] = useState([]); 
    const [LAdata,LAsetData] = useState();
    // const [ feat, setfeat ] = useState([]); 
    // const [ merged, setMerged ] = useState([]); 

    var hold;
    const loadData = async () => {
        const data = await fetch ("https://cleanstreetserver.herokuapp.com/v1/cityPop")
        .then(response => response.json())
        .then(res => {
            
            //setValue(res);
            //console.log(value);
            //console.log(res);
            hold = res;
            loadData2();
            
        });
        

        
    }
    const loadData2 = async () =>{
        const x = await fetch("https://cleanstreetserver.herokuapp.com/v1/GBLayer")
        .then(resp=> resp.json())
        .then(data => {
            var dFeatures = data.features;

            var jsonsMerged = mergeJson(dFeatures, hold, "LAD13NM", "CityName"); 
            //console.log(jsonsMerged);
            const feature = jsonsMerged.map(feature=>{
                return(feature);
            });
            LAsetData(feature);
        })
    }
    

    useEffect(() => {
        loadData();
    }, []);

    function getColour(d) {
        return d > 1000 ? '#800026' :
            d > 800  ? '#BD0026' :
            d > 600  ? '#E31A1C' :
            d > 400 ? '#FC4E2A' :
            d > 300   ? '#FD8D3C' :
            d > 200   ? '#FEB24C' :
            d > 100   ? '#FED976' :
                        '#FFEDA0';
    }
    
    const style = (feature => {
        return ({
            fillColor: getColour(feature.CurBEV),
            weight: 1,
            opacity: 1,
            color: 'black',
            dashArray: '2',
            fillOpacity: 0.5
        });
    });
    
    

    
    return(
        <LayersControl.Overlay name="Current BEV">
        <FeatureGroup name="Marker with popup">
            {LAdata && (
                <GeoJSON data={LAdata} 
                    style={style} 
                />
            )}
        </FeatureGroup>
        </LayersControl.Overlay>
    );        
        
            
       
    
}



function CurULEV() {
    const [ value, setValue ] = useState([]); 

    const loadData = async () => {
        const data = await fetch ("https://cleanstreetserver.herokuapp.com/v1/cityPop");
        const json = await data.json();
        
        setValue(json);
    }
    useEffect(() => {
        loadData();
    }, []);
    function getColour(d) {
        return d > 1000 ? '#800026' :
            d > 800  ? '#BD0026' :
            d > 600  ? '#E31A1C' :
            d > 400 ? '#FC4E2A' :
            d > 300   ? '#FD8D3C' :
            d > 200   ? '#FEB24C' :
            d > 100   ? '#FED976' :
                        '#FFEDA0';
    }

    const style = (feature => {
        return ({
            fillColor: getColour(feature.CurULEV),
            weight: 1,
            opacity: 1,
            color: 'black',
            dashArray: '2',
            fillOpacity: 0.5
        });
    });
    //console.log(features);
    //features
    var jsonsMerged = mergeJson(features, value, "LAD13NM", "CityName"); 

    const feature = jsonsMerged.map(feature=>{
        return(feature);
    });

    return(
        <LayersControl.Overlay name="Current ULEV">
        <FeatureGroup name="Marker with popup">
            {feature && (
                <GeoJSON data={feature} 
                    style={style} 
                />
            )}
        </FeatureGroup>
        </LayersControl.Overlay>
    );
}



function Population() {
    const [ value, setValue ] = useState([]); 

    const loadData = async () => {
        const data = await fetch ("https://cleanstreetserver.herokuapp.com/v1/cityPop");
        const json = await data.json();
        
        setValue(json);
    }
    useEffect(() => {
        loadData();
    }, []);

    function getColour(d) {
        return d > 500000 ? '#800026' :
            d > 400000  ? '#BD0026' :
            d > 300000  ? '#E31A1C' :
            d > 200000 ? '#FC4E2A' :
            d > 100000   ? '#FD8D3C' :
            d > 50000   ? '#FEB24C' :
            d > 25000   ? '#FED976' :
                        '#FFEDA0';
    }

    const style = (feature => {
        return ({
            fillColor: getColour(feature.Population),
            weight: 1,
            opacity: 1,
            color: 'black',
            dashArray: '2',
            fillOpacity: 0.5
        });
    });

    var jsonsMerged = mergeJson(features, value, "LAD13NM", "CityName"); 
    const feature = jsonsMerged.map(feature=>{
        return(feature);
    });

    return(
        <LayersControl.Overlay name="Population">
        <FeatureGroup name="Marker with popup">
            {feature && (
                <GeoJSON data={feature} 
                    style={style} 
                />
            )}
        </FeatureGroup>
        </LayersControl.Overlay>
    );
}

function PrivULEV() {
    const [ value, setValue ] = useState([]); 

    const loadData = async () => {
        const data = await fetch ("https://cleanstreetserver.herokuapp.com/v1/cityPop");
        const json = await data.json();
        
        setValue(json);
    }
    useEffect(() => {
        loadData();
    }, []);

    function getColour(d) {
        return d > 1000 ? '#800026' :
            d > 800  ? '#BD0026' :
            d > 600  ? '#E31A1C' :
            d > 400 ? '#FC4E2A' :
            d > 300   ? '#FD8D3C' :
            d > 200   ? '#FEB24C' :
            d > 100   ? '#FED976' :
                        '#FFEDA0';
    }

    const style = (feature => {
        return ({
            fillColor: getColour(feature.PrivULEV),
            weight: 1,
            opacity: 1,
            color: 'black',
            dashArray: '2',
            fillOpacity: 0.5
        });
    });

    var jsonsMerged = mergeJson(features, value, "LAD13NM", "CityName"); 
    const feature = jsonsMerged.map(feature=>{
        return(feature);
    });
    

    return(
        <LayersControl.Overlay name="PrivULEV">
        <FeatureGroup name="Marker with popup">
            {feature && (
                <GeoJSON data={feature} 
                    style={style} 
                />
            )}
        </FeatureGroup>
        </LayersControl.Overlay>
    );
}

function CommercialULEV() {
    const [ value, setValue ] = useState([]); 

    const loadData = async () => {
        const data = await fetch ("https://cleanstreetserver.herokuapp.com/v1/cityPop");
        const json = await data.json();
        
        setValue(json);
    }
    useEffect(() => {
        loadData();
    }, []);

    function getColour(d) {
        return d > 1000 ? '#800026' :
            d > 800  ? '#BD0026' :
            d > 600  ? '#E31A1C' :
            d > 400 ? '#FC4E2A' :
            d > 300   ? '#FD8D3C' :
            d > 200   ? '#FEB24C' :
            d > 100   ? '#FED976' :
                        '#FFEDA0';
    }

    const style = (feature => {
        return ({
            fillColor: getColour(feature.CommercialULEV),
            weight: 1,
            opacity: 1,
            color: 'black',
            dashArray: '2',
            fillOpacity: 0.5
        });
    });

    var jsonsMerged = mergeJson(features, value, "LAD13NM", "CityName"); 
    const feature = jsonsMerged.map(feature=>{
        return(feature);
    });

    return(
        <LayersControl.Overlay name="CommercialULEV">
        <FeatureGroup name="Marker with popup">
            {feature && (
                <GeoJSON data={feature} 
                    style={style} 
                />
            )}
        </FeatureGroup>
        </LayersControl.Overlay>
    );
}

function CurULEVPercent() {
    const [ value, setValue ] = useState([]); 

    const loadData = async () => {
        const data = await fetch ("https://cleanstreetserver.herokuapp.com/v1/cityPop");
        const json = await data.json();
        
        setValue(json);
    }
    useEffect(() => {
        loadData();
    }, []);

    function getColour(d) {
        return d > 1 ? '#800026' :
            d > 0.800  ? '#BD0026' :
            d > 0.600  ? '#E31A1C' :
            d > 0.400 ? '#FC4E2A' :
            d > 0.300   ? '#FD8D3C' :
            d > 0.200   ? '#FEB24C' :
            d > 0.100   ? '#FED976' :
                        '#FFEDA0';
    }

    const style = (feature => {
        return ({
            fillColor: getColour(feature.CurULEVPercent),
            weight: 1,
            opacity: 1,
            color: 'black',
            dashArray: '2',
            fillOpacity: 0.5
        });
    });

    var jsonsMerged = mergeJson(features, value, "LAD13NM", "CityName"); 
    const feature = jsonsMerged.map(feature=>{
        return(feature);
    });

    return(
        <LayersControl.Overlay name="CurULEVPercent">
        <FeatureGroup name="Marker with popup">
            {feature && (
                <GeoJSON data={feature} 
                    style={style} 
                />
            )}
        </FeatureGroup>
        </LayersControl.Overlay>
    );
}

function ResidentialProperties() {
    const [ value, setValue ] = useState([]); 

    const loadData = async () => {
        const data = await fetch ("https://cleanstreetserver.herokuapp.com/v1/cityPop");
        const json = await data.json();
        
        setValue(json);
    }
    useEffect(() => {
        loadData();
    }, []);

    function getColour(d) {
        return d > 100000 ? '#800026' :
            d > 80000  ? '#BD0026' :
            d > 60000  ? '#E31A1C' :
            d > 40000 ? '#FC4E2A' :
            d > 30000   ? '#FD8D3C' :
            d > 20000   ? '#FEB24C' :
            d > 10000   ? '#FED976' :
                        '#FFEDA0';
    }

    const style = (feature => {
        return ({
            fillColor: getColour(feature.ResidentialProperties),
            weight: 1,
            opacity: 1,
            color: 'black',
            dashArray: '2',
            fillOpacity: 0.5
        });
    });

    var jsonsMerged = mergeJson(features, value, "LAD13NM", "CityName"); 
    const feature = jsonsMerged.map(feature=>{
        return(feature);
    });

    return(
        <LayersControl.Overlay name="ResidentialProperties">
        <FeatureGroup name="Marker with popup">
            {feature && (
                <GeoJSON data={feature} 
                    style={style} 
                />
            )}
        </FeatureGroup>
        </LayersControl.Overlay>
    );
}

function PercentPropertiesTenements() {
    const [ value, setValue ] = useState([]); 

    const loadData = async () => {
        const data = await fetch ("https://cleanstreetserver.herokuapp.com/v1/cityPop");
        const json = await data.json();
        
        setValue(json);
    }
    useEffect(() => {
        loadData();
    }, []);

    function getColour(d) {
        return d > 1 ? '#800026' :
            d > 0.800  ? '#BD0026' :
            d > 0.600  ? '#E31A1C' :
            d > 0.400 ? '#FC4E2A' :
            d > 0.300   ? '#FD8D3C' :
            d > 0.200   ? '#FEB24C' :
            d > 0.100   ? '#FED976' :
                        '#FFEDA0';
    }

    const style = (feature => {
        return ({
            fillColor: getColour(feature.percentPropertiesTenements),
            weight: 1,
            opacity: 1,
            color: 'black',
            dashArray: '2',
            fillOpacity: 0.5
        });
    });

    var jsonsMerged = mergeJson(features, value, "LAD13NM", "CityName"); 
    const feature = jsonsMerged.map(feature=>{
        return(feature);
    });

    return(
        <LayersControl.Overlay name="percentPropertiesTenements">
        <FeatureGroup name="Marker with popup">
            {feature && (
                <GeoJSON data={feature} 
                    style={style} 
                />
            )}
        </FeatureGroup>
        </LayersControl.Overlay>
    );
}

function TotalULEVs2045() {
    const [ value, setValue ] = useState([]); 

    const loadData = async () => {
        const data = await fetch ("https://cleanstreetserver.herokuapp.com/v1/cityPop");
        const json = await data.json();
        
        setValue(json);
    }
    useEffect(() => {
        loadData();
    }, []);

    function getColour(d) {
        return d > 100000 ? '#800026' :
            d > 80000  ? '#BD0026' :
            d > 60000  ? '#E31A1C' :
            d > 40000 ? '#FC4E2A' :
            d > 30000   ? '#FD8D3C' :
            d > 20000   ? '#FEB24C' :
            d > 10000   ? '#FED976' :
                        '#FFEDA0';
    }

    const style = (feature => {
        return ({
            fillColor: getColour(feature.TotalULEVs2045),
            weight: 1,
            opacity: 1,
            color: 'black',
            dashArray: '2',
            fillOpacity: 0.5
        });
    });

    var jsonsMerged = mergeJson(features, value, "LAD13NM", "CityName"); 
    const feature = jsonsMerged.map(feature=>{
        return(feature);
    });

    return(
        <LayersControl.Overlay name="TotalULEVs2045">
        <FeatureGroup name="Marker with popup">
            {feature && (
                <GeoJSON data={feature} 
                    style={style} 
                />
            )}
        </FeatureGroup>
        </LayersControl.Overlay>
    );
}

function TotalBEVs2045() {
    const [ value, setValue ] = useState([]); 

    const loadData = async () => {
        const data = await fetch ("https://cleanstreetserver.herokuapp.com/v1/cityPop");
        const json = await data.json();
        
        setValue(json);
    }
    useEffect(() => {
        loadData();
    }, []);

    function getColour(d) {
        return d > 100000 ? '#800026' :
            d > 80000  ? '#BD0026' :
            d > 60000  ? '#E31A1C' :
            d > 40000 ? '#FC4E2A' :
            d > 30000   ? '#FD8D3C' :
            d > 20000   ? '#FEB24C' :
            d > 10000   ? '#FED976' :
                        '#FFEDA0';
    }

    const style = (feature => {
        return ({
            fillColor: getColour(feature.TotalBEVs2045),
            weight: 1,
            opacity: 1,
            color: 'black',
            dashArray: '2',
            fillOpacity: 0.5
        });
    });

    var jsonsMerged = mergeJson(features, value, "LAD13NM", "CityName"); 
    const feature = jsonsMerged.map(feature=>{
        return(feature);
    });

    return(
        <LayersControl.Overlay name="TotalBEVs2045">
        <FeatureGroup name="Marker with popup">
            {feature && (
                <GeoJSON data={feature} 
                    style={style} 
                />
            )}
        </FeatureGroup>
        </LayersControl.Overlay>
    );
}



export {CurULEV, Population,PrivULEV, CommercialULEV ,CurULEVPercent , ResidentialProperties, PercentPropertiesTenements,TotalULEVs2045 ,TotalBEVs2045};
export default CurBEV;
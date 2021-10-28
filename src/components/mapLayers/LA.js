import React, {useState, useEffect} from 'react';
import { LayersControl, GeoJSON, FeatureGroup } from 'react-leaflet';
import {features} from "../../data/GBLayer.json";


function LocalAuthoritiesLayer() {
    const [LAdata,LAsetData] = useState();

    useEffect(()=> {
        loadData();
        //getData();

    }, []);

    const loadData = async () =>{
        await fetch("https://cleanstreetserver.herokuapp.com/v1/GBLayer")
        .then(response => response.json())
        .then(data => {
            var dFeatures = data.features;
            const feature = dFeatures.map(feature=>{
                return(feature);
            });
            
            LAsetData(feature);
            
        })
        
    }

    const style = (feature => {
        return ({
            fillColor: 'white',
            weight: 1,
            opacity: 1,
            color: 'black',
            dashArray: '2',
            fillOpacity: 0.5
        });
    });

    

    // console.log(features);
    // console.log(LAdata);
    // console.log(feature);
    // const feature = features.map(feature=>{
    //     return(feature);
    // });
    return(
        <LayersControl.Overlay name="LA Boundaries">
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

export default LocalAuthoritiesLayer;
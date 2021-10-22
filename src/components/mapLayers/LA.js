import React from 'react';
import { LayersControl, GeoJSON, FeatureGroup } from 'react-leaflet';
import {features} from "../../data/GBLayer.json";


function LocalAuthoritiesLayer() {
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
    const feature = features.map(feature=>{
        return(feature);
    });
    return(
        <LayersControl.Overlay name="LA Boundaries">
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

export default LocalAuthoritiesLayer;
import React from 'react';
import { LayersControl, GeoJSON, FeatureGroup } from 'react-leaflet';
import {features} from "../../data/FILENAME";


function LAYERNAME() {
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
    function onEachFeature(feature, layer) {
        if (feature.properties && feature.properties.PROPERTY) {
            //layer.bindPopup(feature.properties.BU_NAAM);
            layer.bindTooltip(feature.properties.PROPERTY,
            {permanent: true, direction:"center", className: "my-label"}
           ).openTooltip()
        }
    }


    const feature = features.map(feature=>{
        return(feature);
    });
    return(
        <LayersControl.Overlay name="LAYERNAME">
        <FeatureGroup name="LAYERNAME">
            {feature && (
                <GeoJSON 
                    data={feature} 
                    style={style}
                    onEachFeature={onEachFeature}
                />
            )}
        </FeatureGroup>
    </LayersControl.Overlay>
    );
}

export default LAYERNAME;
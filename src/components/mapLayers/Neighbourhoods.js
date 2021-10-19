import React from 'react';
import { LayersControl, GeoJSON, FeatureGroup } from 'react-leaflet';
import {features} from "../../data/Neighbourhoods.json";


function Neighbourhood() {
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
        if (feature.properties && feature.properties.BU_NAAM) {
            //layer.bindPopup(feature.properties.BU_NAAM);
            layer.bindTooltip(feature.properties.BU_NAAM,
            {permanent: true, direction:"center", className: "my-label"}
           ).openTooltip()
        }
    }


    const feature = features.map(feature=>{
        return(feature);
    });
    return(
        <LayersControl.Overlay name="Enschede Neighbourhoods">
        <FeatureGroup name="neighbourhood">
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

export default Neighbourhood;
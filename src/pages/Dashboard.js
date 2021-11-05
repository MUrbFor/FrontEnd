import React, {useState, useContext} from 'react';
import FavoritesContext from '../store/favorites-context';
import { MapContainer, TileLayer, LayersControl, FeatureGroup, LayerGroup} from 'react-leaflet';
import { EditControl} from "react-leaflet-draw";
import 'leaflet/dist/leaflet.css';
import "leaflet-draw/dist/leaflet.draw.css";
import L, { map } from 'leaflet';
import { useEffect } from 'react/cjs/react.development';
import Layout from '../components/layout/Layout';
import { ReactSearchAutocomplete } from 'react-search-autocomplete';


function Dashboard(){
    //Javascript comes here
    return (
      <div>
          <h1>Hi</h1>
      </div>
    );
}
  
export default Dashboard;
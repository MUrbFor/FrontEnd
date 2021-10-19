import { useContext} from 'react';
import react from 'react';
import { Link } from 'react-router-dom';
import FavoritesContext from '../store/favorites-context';
import DatasetList from '../components/meetups/DatasetList';
import axios from 'axios';
import Layout from '../components/layout/Layout';

//import L from 'leaflet';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import './Favourites.css';
import 'leaflet/dist/leaflet.css';
import { assertCompletionStatement } from '@babel/types';
//import rd3 from 'react-d3-library';


function FavoritesPage() {
  const favoritesCtx = useContext(FavoritesContext);
  let content;

  if (favoritesCtx.totalFavorites === 0) {
    content = <p>You got no favorites yet. Start adding some?</p>;
  } else {
    console.log(favoritesCtx.favorites[0]);
    content = <DatasetList meetups={favoritesCtx.favorites} 
    
    
    />;
    const url = favoritesCtx.favorites[0].endpoint;

  }


  
  //loading data from api
  // axios.get(url).then(response => {
  //     var chargers = response.data;
  //     console.log(chargers);
  // })

  // axios.get('/?api_key=45a3b4e678bd63501234f33f8e0a1ee0e87f25f2&noc=SCNS&boundingBox=-1.6387,54.9587,-1.5875,54.9825', {"Content-Type": "application/xml; charset=utf-8"}).then(response => {
  //     console.log(response.data);
  // })

  // axios.get('https://api.wmata.com/TrainPositions/TrainPositions?contentType=xml&api_key=dbd8d249d3dd4a18bfe1c35d3e07a2bf').then(response => {
  // console.log(response.data);
  // })

  //loading
  // axios.get('/lat/51.545581/long/-0.077301/dist/10/').then(response => {
  //   this.setState({result: response.ChargeDevice.ChargeDeviceId[0], loading: false});
  // })


  return (
    <Layout>
    <section>
      <h1 className="infralist">My Resources</h1>
      {content}
      {/* <Link to='/data'>data</Link>
      <Link to='/map'>map</Link> */}
      <br/>
      <Link to='/Catalogue'> <button id="startButton" > Add Resources</button> </Link>
      <Link to='/FavViz'> <button id="startButton" > Start My Mission</button> </Link>

    </section>
    </Layout>

  );
}

export default FavoritesPage;

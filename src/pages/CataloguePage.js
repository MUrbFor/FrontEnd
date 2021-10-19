import { useState, useEffect, useContext} from 'react';
import DatasetList from '../components/meetups/DatasetList';
import { Link } from 'react-router-dom';
import Layout from '../components/layout/Layout';
import {resources} from '../data/resources'
//import FavoritesContext from '../store/favorites-context';
import './main.css';

function CataloguePage() {
  const [isLoading, setIsLoading] = useState(true);
  //const [loadedMeetups, setLoadedMeetups] = useState([]);
  var loadedMeetups = resources;
  console.log(JSON.stringify(resources));

  return (
    <Layout>
      <section className="mainPage">
        <div className="container">
          <div className="title">
              <h1 className="main-title">Data Catalogue</h1>
              <h3 className="sub-title">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. </h3>
          </div>
        </div>
      </section>
      <section>
        <DatasetList meetups={loadedMeetups} />
      </section>
    </Layout>
  );
}

export default CataloguePage;

import React from 'react';
import { Link } from 'react-router-dom';
import './main.css';
import Layout from '../components/layout/Layout';


function MainPage() {
    return (
      <Layout>
      <section className="mainPage">
        <div className="container">
          <div className="title">
              <h1 className="main-title">Place Name Platform</h1>
              <h3 className="sub-title">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. </h3>
          </div>
        </div>
      </section>
      <section className="mainPage">
        <wrapper>
        <div className="container">
          <div className="card">
              <div className="container-row">
                  <div className="row-one">
                      <Link to="catalogue" className="no-underline"><h1 className="card-title">Get data</h1></Link>
                      <h3 className="description">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. </h3>
                      <Link to='/catalogue'><h4 className="learnmore">Learn More </h4></Link>
                  </div>
                  <div className="row-two">
                      <img className="image" src="https://www.1point21gws.com/insights/wp-content/uploads/2019/07/DATAx_Guide_to_Data_Visualization_in_2019_banner.jpg" alt="Logo"></img>
                  </div>
              </div>
          </div>
        </div>
        <div className="container">
          <div className="card">
              <div className="container-row">
                  <div className="row-one">
                      <Link className="no-underline"><h1 className="card-title">View data</h1></Link>
                      <h3 className="description">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. </h3>
                      <Link to='/dashbaord'><h4 className="learnmore">Learn More </h4></Link>
                  </div>
                  <div className="row-two">
                      <img className="image" src="https://cdn.ttgtmedia.com/visuals/ComputerWeekly/Hero%20Images/Big-data-hero-AdobeStock_389870710.jpg" alt="Logo"></img>
                  </div>
              </div>
          </div>
        </div>
        <div className="container">
          <div className="card">
              <div className="container-row">
                  <div className="row-one">
                      <Link className="no-underline" to="tools"><h1 className="card-title">Use data</h1></Link>
                      <h3 className="description">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. </h3>
                      <Link to='tools'><h4 className="learnmore">Learn More </h4></Link>
                  </div>
                  <div className="row-two">
                      <img className="image" src="https://online.jcu.edu.au/sites/default/files/field/image/JCU-Feb18-MDS.jpg" alt="Logo"></img>
                  </div>
              </div>
          </div>
        </div>
        </wrapper>
        </section>
      </Layout>
    );
  }


export default MainPage;

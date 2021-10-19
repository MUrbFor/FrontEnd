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
          <div className="card-two">
              <div className="container-half">
                  <div className="card-half-left">
                      <h1 className="card-title">Site Selector</h1>
                      <ul className="list">
                          <Link to="evselector"><li className="underlined">EV Chargepoint</li></Link>
                      </ul>
                  </div>
                  <div className="card-half-right">
                      <h1 className="card-title">Benchmarking</h1>
                      <ul className="list">
                          <li className="underlined">EV Maturity model</li>
                          <li className="underlined">Compare local data</li>

                      </ul>
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

import { useState, useEffect } from 'react';
import DatasetList from '../components/meetups/DatasetList';
import Layout from '../components/layout/Layout';

function CataloguePage() {
  const [isLoading, setIsLoading] = useState(true);
  const [loadedMeetups, setLoadedMeetups] = useState([]);

  useEffect(() => {
    setIsLoading(true);
    fetch(
      'https://retsi-d918e-default-rtdb.europe-west1.firebasedatabase.app/meetups.json'
    )
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        const meetups = [];

        for (const key in data) {
          const meetup = {
            id: key,
            ...data[key]
          };

          meetups.push(meetup);
        }

        setIsLoading(false);
        setLoadedMeetups(meetups);
      });
  }, []);

  if (isLoading) {
    return (
      <Layout>
      <section>
        <p>Loading...</p>
      </section>
      </Layout>
    );
  }

  return (
    <Layout>
    <section>
      <h1 className="left">Choose Which Data You Want to Include</h1>
      <h3 className="sub-title left">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed ipsum dolor sit amet, consectetur adipiscing elit. Sed mehercule. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed mehercule</h3>
      <DatasetList meetups={loadedMeetups} />
    </section>
    </Layout>
  );
}

export default CataloguePage;

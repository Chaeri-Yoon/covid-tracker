import { useState } from 'react';
import { getCountryCovidData } from './api';
import Loading from './Components/Loading';
import Map from './Components/Map';
import { ICountryCovidData } from './types';

function App() {
  const [isLoading, setLoading] = useState(true);
  const [countryCovidData, setCountryCovidData] = useState<ICountryCovidData[]>([]);

  if (isLoading) {
    getCountryCovidData().then(response => {
      setLoading(false);
      const { data } = response;
      setCountryCovidData(data);
    })
  }
  return (
    <div>
      {
        isLoading
          ? <Loading />
          : <Map countryCovidData={[...countryCovidData]} />
      }
    </div>
  );
}

export default App;

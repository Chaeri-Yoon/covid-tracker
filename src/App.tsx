import { useState } from 'react';
import { getCountryCovidData, getTotalCovidData } from './api';
import { ICountryCovidData, ITotalCovidData } from './types';
import styled from 'styled-components';
import GlobalStyles from './GlobalStyles';

import Loading from './Components/Loading';
import Map from './Components/Map';
import WorldData from './Components/WorldData';

const DataContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;

  & > div{
    width: 80%;
  }
`;
function App() {
  const [isLoading, setLoading] = useState(true);
  const [countryCovidData, setCountryCovidData] = useState<ICountryCovidData[]>([]);
  const [totalCovidData, setTotalCovidData] = useState<ITotalCovidData>({ cases: 0, todayCases: 0, deaths: 0 });

  if (isLoading) {
    Promise.all([getCountryCovidData, getTotalCovidData]).then(
      values => {
        setLoading(false);
        const { data } = values[0];
        const { data: { cases, todayCases, deaths } } = values[1];
        setCountryCovidData(data);
        setTotalCovidData({ cases, todayCases, deaths });
      }
    );
  }
  return (
    <>
      <GlobalStyles />
      <div>
        {
          isLoading
            ? <Loading />
            : (
              <DataContainer>
                <Map countryCovidData={[...countryCovidData]} />
                <WorldData totalCovidData={{ ...totalCovidData }} />
              </DataContainer>
            )
        }
      </div>
    </>
  );
}

export default App;

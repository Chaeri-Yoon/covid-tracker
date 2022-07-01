import { MapContainer, GeoJSON } from 'react-leaflet';
import mapdata from '../data/mapdata.json';
import { ICountryCovidData } from '../types';
import styled from 'styled-components';
import ReactDOMServer from 'react-dom/server';
import 'leaflet/dist/leaflet.css';

const Container = styled.div`
    height: 80vh;
`;
const InfoContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
`;
const Country = styled.div`
    margin-bottom: 10px;
    display: flex;
    flex-direction: column;
    align-items: center;
`;
const Flag = styled.div`
    margin-bottom: 3px;
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    & img{
        width: 90%;
        aspect-ratio: 3 / 2;
    }
`;
const CountryName = styled.span`
    font-size: 0.625em;
`;
const CasesData = styled.span`
    font-size: 1em;
`;
const DataLabel = styled.span`
    font-weight: 600;
`;
const Data = styled.span`
    font-weight: 400;
`;
function Map({ countryCovidData }: { countryCovidData: ICountryCovidData[] }) {
    const onEachCountry = (feature: GeoJSON.Feature, layer: any) => {
        const isoName = feature.properties?.ISO_A3;
        const country = countryCovidData.find(data => {
            if (data.countryInfo.iso3 === isoName) return true;
        });
        if (country !== undefined) {
            const countryName = country.country;
            const population = country.population;
            const cases = country.cases;
            const todayCases = country.todayCases;
            const flag = country.countryInfo.flag;
            const infoPopup = ReactDOMServer.renderToString(
                <InfoContainer>
                    <Country>
                        <Flag><img src={flag} alt={`flag of ${countryName}`} /></Flag>
                        <CountryName>{countryName}</CountryName>
                    </Country>
                    <CasesData>
                        <DataLabel>
                            cases: <Data>{cases.toLocaleString()} </Data>
                        </DataLabel>
                        <DataLabel>
                            (today: <Data>{todayCases.toLocaleString()}</Data>)
                        </DataLabel>
                    </CasesData>
                </InfoContainer>
            );
            layer.options.fillOpacity = cases / population;
            layer.on({
                mouseover: (event: any) => {
                    event.target.setStyle({
                        weight: 3
                    });
                    layer.bindPopup(infoPopup).openPopup(event.latlng);
                },
                mouseout: (event: any) => {
                    event.target.setStyle({
                        weight: 0.3
                    });
                    layer.closePopup(infoPopup);
                }
            });
        }
        else layer.options.fillOpacity = 0;
    }
    return (
        <Container>
            <MapContainer style={{ width: '100%', height: '100%' }} center={[0, 0]} zoom={2} scrollWheelZoom={false} >
                <GeoJSON style={{ fillColor: "red", weight: 0.3 }} data={(mapdata as any).features} onEachFeature={onEachCountry}></GeoJSON>
            </MapContainer>
        </Container>
    );
}
export default Map;
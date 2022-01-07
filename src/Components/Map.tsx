import { MapContainer, GeoJSON } from 'react-leaflet';
import mapdata from '../data/mapdata.json';
import { ICountryCovidData } from '../types';
import styled from 'styled-components';
import 'leaflet/dist/leaflet.css';

const Container = styled.div`
    height: 80vh;
`;

function Map({ countryCovidData }: { countryCovidData: ICountryCovidData[] }) {
    const onEachCountry = (feature: GeoJSON.Feature, layer: any) => {
        const isoName = feature.properties?.ISO_A3;
        let rank: number = 0;
        const country = countryCovidData.find((data, index) => {
            if (data.countryInfo.iso3 === isoName) {
                rank = index;
                return true;
            }
        });

        if (country !== undefined) {
            const countryName = country?.country;
            const cases = country?.cases;
            layer.bindPopup(`${countryName}: ${cases}`);
            layer.options.fillOpacity = 1 - (rank / countryCovidData.length);
        }
        else layer.options.fillOpacity = 0;
    }
    return (
        <Container>
            <MapContainer style={{ width: '100%', height: '100%' }} center={[0, 0]} zoom={2} scrollWheelZoom={false}>
                <GeoJSON style={{ fillColor: "red", weight: 0.3 }} data={(mapdata as any).features} onEachFeature={onEachCountry}></GeoJSON>
            </MapContainer>
        </Container>
    );
}
export default Map;
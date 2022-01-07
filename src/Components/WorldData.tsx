import styled from "styled-components";
import { ITotalCovidData } from "../types";

const Container = styled.div`
    margin-top: 15px;
    display: flex;
    align-items: center;
    & > div{
        width: 33%;
        text-align: center;
    }
`;
const Column = styled.div`
    & > div{
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
    }
`;
const DataLabel = styled.span`
    margin-bottom: 10px;
    font-size: 0.625em;
`;
const Data = styled.span`
    font-size: 2em;
    font-weight: 600;
`;
function WorldData({ totalCovidData }: { totalCovidData: ITotalCovidData }) {
    return (
        <Container>
            <Column>
                <div>
                    <DataLabel>Total Cases</DataLabel>
                    <Data>{totalCovidData.cases}</Data>
                </div>
            </Column>
            <Column>
                <div>
                    <DataLabel>Today Cases</DataLabel>
                    <Data>{totalCovidData.todayCases}</Data>
                </div>
            </Column>
            <Column>
                <div>
                    <DataLabel>Deaths</DataLabel>
                    <Data>{totalCovidData.deaths}</Data>
                </div>
            </Column>
        </Container>
    )
}
export default WorldData;
import axios from "axios";

const BASEURL = "https://disease.sh/v3/covid-19";
const GETTOTALCOVIDURL = "/all";
const GETCOUNTRYCOVIDURL = "/countries?sort=cases"

export const getTotalCovidData = () => {
    axios(`${BASEURL}${GETTOTALCOVIDURL}`).then(response => {
        const { data: { cases, todayCases, deaths, todayDeaths, recovered, todayRecovered } } = response;
        return { cases, todayCases, deaths, todayDeaths, recovered, todayRecovered };
    })
}
export const getCountryCovidData = async () => await axios.get(`${BASEURL}${GETCOUNTRYCOVIDURL}`)
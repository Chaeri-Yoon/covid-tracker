import axios from "axios";

const BASEURL = "https://disease.sh/v3/covid-19";
const GETTOTALCOVIDURL = "/all";
const GETCOUNTRYCOVIDURL = "/countries"

export const getTotalCovidData = axios.get(`${BASEURL}${GETTOTALCOVIDURL}`);
export const getCountryCovidData = axios.get(`${BASEURL}${GETCOUNTRYCOVIDURL}`)
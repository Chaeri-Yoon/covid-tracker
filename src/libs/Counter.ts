import { useEffect, useState } from "react"
import { ITotalCovidData } from "../types"

interface ICounter {
    count_case: number,
    count_todayCase: number,
    count_death: number
}
export default (totalCovidData: ITotalCovidData) => {
    const [count, setCount] = useState<ICounter>({ count_case: 0, count_todayCase: 0, count_death: 0 });
    const [timer, setTimer] = useState<NodeJS.Timer | null>(null);
    useEffect(() => {
        if (totalCovidData.cases === 0) return;
        !timer && setTimer(setInterval(() => {
            if (count.count_case < totalCovidData.cases) setCount(prev => ({ ...prev, count_case: prev.count_case + 5000000 < totalCovidData.cases ? prev.count_case + 5000000 : totalCovidData.cases }));
            if (count.count_todayCase < totalCovidData.todayCases) setCount(prev => ({ ...prev, count_todayCase: prev.count_todayCase + 5000 < totalCovidData.todayCases ? prev.count_todayCase + 5000 : totalCovidData.todayCases }));
            if (count.count_death < totalCovidData.deaths) setCount(prev => ({ ...prev, count_death: prev.count_death + 50000 < totalCovidData.deaths ? prev.count_death + 50000 : totalCovidData.deaths }));
        }, 10));
        return () => {
            timer && clearInterval(timer);
            setTimer(null);
        }
    }, [totalCovidData]);
    useEffect(() => {
        if (!timer) return;
        if (count.count_case === totalCovidData.cases &&
            count.count_todayCase === totalCovidData.todayCases &&
            count.count_death === totalCovidData.deaths) {
            clearInterval(timer);
            setTimer(null);
        }
    }, [count]);
    return count;
}
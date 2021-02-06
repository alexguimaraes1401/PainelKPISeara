
import React from 'react';
import { Chart } from 'primereact/chart';
import api from './api/api'

const lightOptions = {
    legend: {
        labels: {
            fontColor: '#495057'
        }
    },
    scales: {
        xAxes: [{
            ticks: {
                fontColor: '#495057'
            }
        }],
        yAxes: [{
            ticks: {
                fontColor: '#495057'
            }
        }]
    }
};

function App() {

    let [responseDataBarChart, setResponseDataBarChart] = React.useState('')
    let [responseDataLineChart, setResponseDataLineChart] = React.useState('')

    const fetchData = () => {
        setResponseDataBarChart(null);
        setResponseDataLineChart(null);

        api.getSearaBaseRacBar().then((response) => {
            setResponseDataBarChart(response.data)
            console.log(response)
        });

        api.getSearaBaseRacLine().then((response) => {
            setResponseDataLineChart(response.data)
            console.log(response)
        });
    };

    return (
        <div className="card container">
            <legend>Search Stock Market</legend>
            <button onClick={fetchData} type='submit'>Submit</button>
            <Chart type="bar" data={responseDataBarChart} options={lightOptions} />
            <Chart type="Line" data={responseDataLineChart} options={lightOptions} />
        </div>
    )
}

export default App;

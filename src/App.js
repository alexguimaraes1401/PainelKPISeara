
import React from 'react';
import { Chart } from 'primereact/chart';
import api from './api/api'
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Card from 'react-bootstrap/Card';

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
        setResponseDataBarChart({});
        setResponseDataLineChart({});

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
        <Container fluid className="p-3">
            <Row>
                <Col>
                    <Card>
                        <legend>Search Stock Market</legend>
                        <button onClick={fetchData} type='submit'>Submit</button>
                    </Card>
                </Col>
            </Row>
            <Row>
                <Col>
                    <Chart type="bar" data={responseDataBarChart} options={lightOptions} />
                    <Chart type="Line" data={responseDataLineChart} options={lightOptions} />
                </Col>
            </Row>

        </Container>
    )
}

export default App;

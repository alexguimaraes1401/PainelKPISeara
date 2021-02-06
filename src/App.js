
import React from 'react';
import { Chart } from 'primereact/chart';
import api from './api/api'
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Card from 'react-bootstrap/Card';
import Navbar from 'react-bootstrap/Navbar';
import Jumbotron from 'react-bootstrap/Jumbotron';
import Breadcrumb from 'react-bootstrap/Breadcrumb';
import { ProSidebar, Menu, MenuItem, SubMenu } from 'react-pro-sidebar';
import 'react-pro-sidebar/dist/css/styles.css';

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

let basicOptions = {
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

        <Container fluid style={{ paddingTop: 5 + 'rem' }}>
            <Navbar bg="dark" variant="dark" fixed="top" >
                <Navbar.Brand href="#home">
                    <img
                        alt=""
                        src="https://react-bootstrap.github.io/logo.svg"
                        width="30"
                        height="30"
                        className="d-inline-block align-top"
                    />{' '}
                React Bootstrap
                </Navbar.Brand>
                <Navbar.Toggle />
                <Navbar.Collapse className="justify-content-end">
                    <Navbar.Text>
                        Signed in as: <a href="#login">Guest</a>
                    </Navbar.Text>
                </Navbar.Collapse>
            </Navbar>
            <Navbar bg="dark" variant="dark" fixed="top" >
                <Navbar.Brand href="#home">
                    <img
                        alt=""
                        src="https://react-bootstrap.github.io/logo.svg"
                        width="30"
                        height="30"
                        className="d-inline-block align-top"
                    />{' '}
                React Bootstrap
                </Navbar.Brand>
                <Navbar.Toggle />
                <Navbar.Collapse className="justify-content-end">
                    <Navbar.Text>
                        Signed in as: <a href="#login">Guest</a>
                    </Navbar.Text>
                </Navbar.Collapse>
            </Navbar>

            <div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pb-2 mb-3 border-bottom">
                <h1 class="h2">
                    Dashboard
                    <br />
                    <small>Bootstrap template, demonstrating a set of Primereact Charts</small>
                </h1>
                <div class="btn-toolbar mb-2 mb-md-0">
                    <div class="btn-group mr-2">
                        <button class="btn btn-sm btn-outline-secondary" onClick={fetchData}>Get Data</button>
                        <button class="btn btn-sm btn-outline-secondary" disabled>Share</button>
                        <button class="btn btn-sm btn-outline-secondary" disabled>Export</button>
                    </div>
                    <button class="btn btn-sm btn-outline-secondary dropdown-toggle" disabled>
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-calendar"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect><line x1="16" y1="2" x2="16" y2="6"></line><line x1="8" y1="2" x2="8" y2="6"></line><line x1="3" y1="10" x2="21" y2="10"></line></svg>
                        This week
                    </button>
                </div>
            </div>
            <h3 className="mt-5">Bar Chart</h3>
            <hr />
            <Chart className="mt-3" type="bar" data={responseDataBarChart} options={lightOptions} />
            <h3 className="mt-5">line Chart</h3>
            <hr />
            <Chart type="Line" data={responseDataLineChart} options={lightOptions} />
        </Container>
    )
}

export default App;

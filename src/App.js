
import React from 'react';
import { Chart } from 'primereact/chart';
import { Button } from 'primereact/button';
import { Card } from 'primereact/card';
import { InputText } from 'primereact/inputtext';
import { Password } from 'primereact/password';
import { PanelMenu } from 'primereact/panelmenu';
import api from './api/api'
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Navbar from 'react-bootstrap/Navbar';
import 'react-pro-sidebar/dist/css/styles.css';
import './index.css';
import 'primereact/resources/themes/saga-blue/theme.css'
import 'primereact/resources/primereact.min.css'
import 'primeicons/primeicons.css'
import { ProgressBar } from 'primereact/progressbar';
import { Toast } from 'primereact/toast';

const itemsPanelMenu = [
    {
        label: 'File',
        icon: 'pi pi-fw pi-file',
        items: [
            {
                label: 'New',
                icon: 'pi pi-fw pi-plus',
                items: [
                    {
                        label: 'Bookmark',
                        icon: 'pi pi-fw pi-bookmark'
                    },
                    {
                        label: 'Video',
                        icon: 'pi pi-fw pi-video'
                    }
                ]
            },
            {
                label: 'Delete',
                icon: 'pi pi-fw pi-trash'
            },
            {
                label: 'Export',
                icon: 'pi pi-fw pi-external-link'
            }
        ]
    },
    {
        label: 'Edit',
        icon: 'pi pi-fw pi-pencil',
        items: [
            {
                label: 'Left',
                icon: 'pi pi-fw pi-align-left'
            },
            {
                label: 'Right',
                icon: 'pi pi-fw pi-align-right'
            },
            {
                label: 'Center',
                icon: 'pi pi-fw pi-align-center'
            },
            {
                label: 'Justify',
                icon: 'pi pi-fw pi-align-justify'
            },

        ]
    },
    {
        label: 'Users',
        icon: 'pi pi-fw pi-user',
        items: [
            {
                label: 'New',
                icon: 'pi pi-fw pi-user-plus'
            },
            {
                label: 'Delete',
                icon: 'pi pi-fw pi-user-minus'
            },
            {
                label: 'Search',
                icon: 'pi pi-fw pi-users',
                items: [
                    {
                        label: 'Filter',
                        icon: 'pi pi-fw pi-filter',
                        items: [
                            {
                                label: 'Print',
                                icon: 'pi pi-fw pi-print'
                            }
                        ]
                    },
                    {
                        icon: 'pi pi-fw pi-bars',
                        label: 'List'
                    }
                ]
            }
        ]
    },
    {
        label: 'Events',
        icon: 'pi pi-fw pi-calendar',
        items: [
            {
                label: 'Edit',
                icon: 'pi pi-fw pi-pencil',
                items: [
                    {
                        label: 'Save',
                        icon: 'pi pi-fw pi-calendar-plus'
                    },
                    {
                        label: 'Delete',
                        icon: 'pi pi-fw pi-calendar-minus'
                    }
                ]
            },
            {
                label: 'Archieve',
                icon: 'pi pi-fw pi-calendar-times',
                items: [
                    {
                        label: 'Remove',
                        icon: 'pi pi-fw pi-calendar-minus'
                    }
                ]
            }
        ]
    }
];

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

const colorsBars = ["#80F31F", "#A5DE0B", "#C7C101", "#E39E03", "#F6780F", "#FE5326", "#FB3244", "#ED1868", "#D5078E", "#B601B3", "#9106D3", "#6B16EC", "#472FFA", "#2850FE", "#1175F7", "#039BE5", "#01BECA", "#0ADCA8", "#1DF283", "#3AFD5D", "#5CFD3A", "#82F21E", "#A7DD0A", "#C9BF01", "#E49C03", "#F77610", "#FE5127", "#FB3046", "#EC166A", "#D40690", "#B401B5", "#8F06D5", "#6917ED", "#4531FB", "#2752FE", "#1077F6", "#039DE4", "#01C0C8", "#0BDEA6", "#1FF381", "#3BFD5B", "#5EFD39", "#84F11D", "#A9DB0A", "#CBBD01", "#E69A04", "#F77411", "#FE4F29", "#FA2E48", "#EB156D"]

const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December"
]

function App() {

     
    const userKpiDigitalTemp = { name: 'admin', pass: 'admin' }
    const footer = <span>
        <Button label="Entrar" onClick={(e) => handleLogin(e.target.value)} style={{ width: '100%', marginRight: '.25em' }} />
    </span>;

    let [responseDataLineChart, setResponseDataLineChart] = React.useState({})
    let [responseDataBarChart, setResponseDataBarChart] = React.useState({})
    const [username, setUsername] = React.useState("");
    const [password, setPassword] = React.useState("");
    const [user, setUser] = React.useState()

    const [crudeJsonResponseDataBarChart, setCrudeJsonResponseDataBarChart] = React.useState({})
    const [indicator1, setIndicator1] = React.useState(["Selecione..."])
    const [indicator2, setIndicator2] = React.useState(["Selecione..."])
    const [indicator3, setIndicator3] = React.useState(["Selecione..."])
    const AddIndicator1 = indicator1.map(Add => Add)
    const AddIndicator2 = indicator2.map(Add => Add)
    const AddIndicator3 = indicator3.map(Add => Add)
    const [selectedIndicator3, setSelectedIndicator3] = React.useState([])
    // const Indicators3Ul = selectedIndicator3.map(item => <div key={item}>
    //     <li>
    //         {item}
    //     </li>
    // </div>)
    const [selectedIndicator1, setSelectedIndicator1] = React.useState('')
    const [selectedIndicator2, setSelectedIndicator2] = React.useState('')
    const [isUpdatingData, setIsUpdatingData] = React.useState(false)

    const toast = React.useRef(null);

    React.useEffect(() => {
        const loggedInUser = localStorage.getItem("user");
        if (loggedInUser) {
            const foundUser = JSON.parse(loggedInUser);
            setUser(foundUser);
            fetchData();
        }
    }, []);

    
    const handleIndicator1TypeChange = (e) => {
        console.clear()
        console.log((indicator1[e.target.value]))
        setSelectedIndicator1(indicator1[e.target.value])
        setSelectedIndicator3([])
        setIndicator3(["Selecione..."])
    }

    const handleIndicator2TypeChange = (e) => {
        console.clear()
        console.log((indicator2[e.target.value]))
        setSelectedIndicator2(indicator2[e.target.value])
        let json = crudeJsonResponseDataBarChart

        let groupBy = function groupBy(list, keyGetter) {
            const map = new Map();
            list.forEach((item) => {
                const key = keyGetter(item);
                const collection = map.get(key);
                if (!collection) {
                    map.set(key, [item]);
                } else {
                    collection.push(item);
                }
            });
            return map;
        }
        let yaxis = Array.from(groupBy(json, x => x[indicator2[e.target.value]]), ([name, value]) => ({ name }));
        setSelectedIndicator3([])
        setIndicator3(yaxis.map(r => r.name))
    }

    const handleIndicator3TypeChange = (e) => {
        console.clear()
        console.log((indicator3[e.target.value]))
        let indicators = selectedIndicator3
        indicators.push(indicator3[e.target.value])
        console.log(indicators)
        setSelectedIndicator3(indicators)
    }


    const handleLogin = (e) => {
        console.log('handleLogin')
        if (username === userKpiDigitalTemp.name && password === userKpiDigitalTemp.pass) {
            setUser({ name: username, pass: password });
            localStorage.setItem('user', JSON.stringify({ name: username }));
        }
    }

    const handleLogout = (e) => {
        console.log('handleLogout')
        setUser({});
        setUsername("");
        setPassword("");
        localStorage.clear();
        window.location.reload(false);
    };

    const fetchDataTest = () => {
        console.log("fetchDataTest")
        if (selectedIndicator1 !== "" && selectedIndicator2 !== "" && selectedIndicator3 !== "") {
            setIsUpdatingData(true)
            let json = crudeJsonResponseDataBarChart
            let indicators = Object.keys(json[0]).map(key => key);

            let groupBy = function groupBy(list, keyGetter) {
                const map = new Map();
                list.forEach((item) => {
                    const key = keyGetter(item);
                    const collection = map.get(key);
                    if (!collection) {
                        map.set(key, [item]);
                    } else {
                        collection.push(item);
                    }
                });
                return map;
            }

            let xaxis = Array.from(groupBy(json, x => x[selectedIndicator1]), ([name, value]) => ({ name, value }));
            let yaxis = Array.from(groupBy(json, x => x[selectedIndicator2]), ([name, value]) => ({ name }));

            xaxis.forEach(x => {
                x['yaxis'] = Array.from(groupBy(x.value, x => x[selectedIndicator2]), ([name, value]) => ({ name, quantidade: value.length }));
            })

            let series = []
            yaxis.forEach((y, index) => {
                let dataset = xaxis.map(xx => {
                    let yaxysvalue = xx.yaxis.filter(r => r.name === y.name);
                    if (yaxysvalue.length)
                        return yaxysvalue[0].quantidade

                    return 0
                })

                let serie = {
                    type: "bar",
                    label: y.name,
                    backgroundColor: colorsBars[Math.floor(Math.random() * colorsBars.length)],
                    fill: false,
                    borderColor: "white",
                    borderWidth: 0,
                    data: dataset,
                }
                series.push(serie)
            })

            let seriesAdd = []
            selectedIndicator3.forEach(indicator => {
                series.filter(s => s.label === indicator).forEach(element => {
                    seriesAdd.push(element)
                });
            });

            const dashboardData = {
                labels: xaxis.map(r => r.name),
                datasets: seriesAdd,
                indicators
            };

            setResponseDataBarChart(dashboardData)
            setIsUpdatingData(false)
            // setIndicator1(dashboardData.indicators)
            // setIndicator3(dashboardData.indicators)
            // setIndicator2(dashboardData.indicators)
        }
    }

    const fetchData = () => {

        setIsUpdatingData(true)

        api.getSearaBaseRacBar().then((response) => {

            // Do whatever you want to transform the data
            let json = JSON.parse(response.data)

            let datasets = [];
            let indicators = Object.keys(json[0]).map(key => key);

            AddItensToJsonArray(json, 100000, "bar")
            setCrudeJsonResponseDataBarChart(json)

            console.time("ProcessResponseBarChart")
            let { dateField, field, ano } = SetParamsToQuery();

            SetDateInJsonArrayToQueryOverObjects(json, dateField);
            let problemas = GetIndicators(json, field);
            AddLineMockData(datasets);
            AddDataByFilters(problemas, json, ano, field, datasets, "bar");
            console.timeEnd("ProcessResponseBarChart")

            const dashboardData = {
                labels: months,
                datasets: datasets,
                indicators
            };

            setResponseDataBarChart(dashboardData)
            setIndicator1(dashboardData.indicators)
            setIndicator3(dashboardData.indicators)
            setIndicator2(dashboardData.indicators)
            console.log(dashboardData)
        });

        api.getSearaBaseRacLine().then((response) => {
            setResponseDataLineChart(response.data)
            setIsUpdatingData(false)
            console.log(response)
        });
    };

    const capitalize = (str) => {
        return str.charAt(0).toUpperCase() + str.slice(1);
    }

    if (!user) {
        return (
            <div className="global-container">
                <div className="card login-form">
                    <Card title="Bem vindo" subTitle="faça o login para acessar o sistema" className="card-body" style={{ width: '25em' }} footer={footer} >
                        <div className="pt-4 p-field p-grid">
                            {/* <h5>Usuário</h5>
                            <InputText id="username" style={{ width: '100%' }} value={username} onChange={(e) => setUsername(e.target.value)} /> */}
                            <span className="p-float-label">
                                <InputText id="username" style={{ width: '100%' }} value={username} onChange={(e) => setUsername(e.target.value)} />
                                <label htmlFor="username">Usuário</label>
                            </span>
                        </div>
                        <div className="pt-4 p-field p-grid">
                            {/* <h5>Senha</h5>
                            <Password value={password} style={{ width: '100%' }} onChange={(e) => setPassword(e.target.value)} feedback={false} toggleMask /> */}
                            <span className="p-float-label">
                                <Password value={password} style={{ width: '100%' }} onChange={(e) => setPassword(e.target.value)} feedback={false} toggleMask />
                                <label htmlhtmlFor="in">Senha</label>
                            </span>
                        </div>
                    </Card>
                </div>
            </div>
        )
    }

    return (
        <Container fluid>
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
                        Bem vindo: <a href="#">{capitalize(user.name)}</a>
                    </Navbar.Text>
                    &nbsp;
                    &nbsp;
                    <Navbar.Text>
                        <a href="#" onClick={(e) => handleLogout(e)}>
                            <span style={{ cursor: 'pointer', color: 'rgb(255 255 255 / 50%)' }}>
                                Logout &nbsp;
                                <i style={{ cursor: 'pointer', color: '#fff' }} className="pi pi-sign-out"></i>
                            </span>
                        </a>
                    </Navbar.Text>
                </Navbar.Collapse>
            </Navbar>
            <nav class="col-md-2 d-none d-md-block sidebar pl-0 pr-0">
                <div class="sidebar-sticky">
                    <PanelMenu model={itemsPanelMenu} />
                    <div style={{ position: 'absolute', bottom: '15px', right: '15px' }}>
                        <i style={{ 'fontSize': '1.4em', cursor: 'pointer', color: 'rgb(73 80 87)' }} className="pi pi-angle-double-left"></i>
                    </div>
                </div>
            </nav>

            <div className="main-content">
                <Row>
                    <Col>
                        {isUpdatingData ? (
                            <h1 className={'h2'}>
                                Atualizando dados
                                <br />
                                <small>O sistema esta atualizando a base de dados, isto pode levar alguns segundos</small>
                                <ProgressBar mode="indeterminate" style={{ height: '16px' }}></ProgressBar>
                            </h1>
                        ) : (
                                <h1 className={'h2'}>
                                    Dashboard
                                    <br />
                                    <small>Bootstrap template, demonstrating a set of Primereact Charts</small>
                                </h1>
                            )}
                        <div class="btn-toolbar mb-2 mb-md-0">
                            <div class="btn-group mr-2">
                                <button class="btn btn-sm btn-outline-secondary" onClick={fetchData}>Recaregar dados</button>
                                <button class="btn btn-sm btn-outline-secondary" disabled>Share</button>
                                <button class="btn btn-sm btn-outline-secondary" disabled>Export</button>
                            </div>
                            <button class="btn btn-sm btn-outline-secondary dropdown-toggle" disabled>
                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-calendar"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect><line x1="16" y1="2" x2="16" y2="6"></line><line x1="8" y1="2" x2="8" y2="6"></line><line x1="3" y1="10" x2="21" y2="10"></line></svg>
                                This week
                            </button>
                        </div>
                    </Col>
                </Row>
                <hr></hr>

                <Row>
                    <Col lg={4}>
                        <Card className="p-md-12">
                            <h1 class="h2">
                                Lorem ipsum dolor
                            <br />
                                <small>Lorem ipsum dolor</small>
                                <br />
                                <select onChange={e => handleIndicator1TypeChange(e)} className="browser-default custom-select" >
                                    {
                                        AddIndicator1.map((address, key) =>
                                            <option key={key} value={key}>{address}</option>)
                                    }
                                </select >
                            </h1>
                        </Card>
                    </Col>
                    <Col lg={4}>
                        <Card className="p-md-12">
                            <h1 class="h2">
                                Lorem ipsum dolor
                            <br />
                                <small>Lorem ipsum dolor</small>
                                <br />
                                <select onChange={e => handleIndicator2TypeChange(e)} className="browser-default custom-select" >
                                    {
                                        AddIndicator2.map((address, key) =>
                                            <option key={key} value={key}>{address}</option>)
                                    }
                                </select >
                            </h1>
                        </Card>
                    </Col>
                    <Col lg={4}>
                        <Card>
                            <h1 class="h2">
                                Lorem ipsum dolor
                            <br />
                                <small>Lorem ipsum dolor</small>
                                <br />
                                <select onChange={e => handleIndicator3TypeChange(e)} className="browser-default custom-select" >
                                    {
                                        AddIndicator3.map((address, key) =>
                                            <option key={key} value={key}>{address}</option>)
                                    }
                                </select >
                            </h1>
                        </Card>
                    </Col>
                </Row>
                <Row style={{ 'padding-right': '15px', 'padding-left': '15px' }}>
                    <button class="btn btn-sm btn-secondary" style={{ width: '100%' }} onClick={fetchDataTest}>Aplicar</button>
                </Row>
                <Row>
                    <Col>
                        <Card title="Bar Chart" subTitle="Lorem ipsum dolor" className="mt-5" >
                            <Chart type="bar" data={responseDataBarChart} options={lightOptions} />
                        </Card>
                        <Card title="Line Chart" subTitle="Lorem ipsum dolor" className="mt-5" >
                            <Chart type="Line" data={responseDataLineChart} options={lightOptions} />
                        </Card>
                    </Col>
                </Row>

            </div>
        </Container>
    )
}

export default App;

function AddItensToJsonArray(json, size, typechart) {
    console.time("AddItensToJsonArray" + typechart)
    const start = (Math.random(0, json.length) - 1)
    const limit = json.length
    let batch = Object.assign([], json.slice(start, limit));
    while (json.length < size) {
        batch.forEach(element => {
            json.push(element)
        });
    }
    console.timeEnd("AddItensToJsonArray" + typechart)
    console.log("json.length: " + json.length)
}

function GetIndicators(json, field) {
    return [...new Set(json.map(item => item[field]))].slice(0, 3);
}

function AddDataByFilters(problemas, json, ano, field, datasets, type) {
    problemas.forEach((element, i) => {
        let data = months.map((mes, index) => json
            .filter(r => r.year !== undefined && r.year === ano
                && r.mes !== undefined && r.mes === mes
                && r[field] !== undefined && r[field] === element)
            .length
        );
        if (type === "line") {
            datasets.push({
                type: type,
                label: element,
                borderColor: colorsBars[i],
                backgroundColor: "white",
                data: data,
                fill: false,
                borderWidth: 2
            });
        } else {
            datasets.push({
                type: type,
                label: element,
                backgroundColor: colorsBars[i],
                data: data,
                fill: false,
                borderColor: "white",
                borderWidth: 2
            });
        }
    });
}

function AddLineMockData(datasets) {
    datasets.push({
        type: "line",
        label: "Dataset 1",
        borderColor: 'red',
        backgroundColor: '#edc4c736',
        borderWidth: 2,
        fill: true,
        borderDash: [5, 5],
        data: [150, 125, 112, 148, 146, 346, 232, 210, 330, 320, 25, 340, 135]
    });
}

function SetParamsToQuery() {
    const ano = "2020";
    const dateField = "Data Fab.";
    const field = "Problema";
    return { dateField, field, ano };
}

function SetDateInJsonArrayToQueryOverObjects(json, dateField) {
    json.forEach(r => {
        let abc = r[dateField].replace(" 00:00:00", "").split("/");
        r['day'] = abc[0];
        r['month'] = abc[1];
        r['mes'] = months[(Math.floor(abc[1] - 1))];
        r['year'] = abc[2];
    });
}
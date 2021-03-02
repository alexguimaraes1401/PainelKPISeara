import React from 'react';
import { Chart } from 'primereact/chart';
import { Button } from 'primereact/button';
import { Card } from 'primereact/card';
import { InputText } from 'primereact/inputtext';
import { Password } from 'primereact/password';
import api from './api/api'
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import 'react-pro-sidebar/dist/css/styles.css';
import './index.css';
import './css/sidebar-desktop.css';
import './css/login.css';
import './css/charts.css';
import 'primereact/resources/themes/saga-blue/theme.css'
import 'primereact/resources/primereact.min.css'
import 'primeicons/primeicons.css'
import { ProgressBar } from 'primereact/progressbar';
import { months, colorsBars, lightOptions } from './domain/constants';
import {
    SetDateInJsonArrayToQueryOverObjects,
    SetParamsToQuery,
    AddLineMockData,
    AddDataByFilters,
    GetIndicators,
    AddItensToJsonArray,
} from './domain/kpiservice';

import { LoadingSkeletonSquare, LoadingSkeletonCard } from './components/skeletons';
import NavbarMobile from './components/navbarMobile';
import NavbarDesktop from './components/navbarDesktop';
import SidebarDesktop from './components/sidebarDesktop';
import { Toast } from 'primereact/toast';

function App() {

    const userKpiDigitalTemp = { name: 'admin', pass: 'admin' }
    const loginfooter = <span>
        <Button label="Entrar" onClick={(e) => handleLogin(e.target.value)} style={{ width: '100%', marginRight: '.25em' }} />
    </span>;

    let [responseDataLineChart, setResponseDataLineChart] = React.useState({})
    let [responseDataBarChart, setResponseDataBarChart] = React.useState({})
    const [username, setUsername] = React.useState("");
    const [password, setPassword] = React.useState("");
    const [user, setUser] = React.useState()

    const [crudeJsonResponseDataBarChart, setCrudeJsonResponseDataBarChart] = React.useState()
    const [indicator1, setIndicator1] = React.useState(["Select..."])
    const [indicator2, setIndicator2] = React.useState(["Select..."])
    const [indicator3, setIndicator3] = React.useState(["Select..."])
    const AddIndicator1 = indicator1.map(Add => Add)
    const AddIndicator2 = indicator2.map(Add => Add)
    const AddIndicator3 = indicator3.map(Add => Add)
    const [selectedIndicator3, setSelectedIndicator3] = React.useState([])
    const [selectedIndicator1, setSelectedIndicator1] = React.useState('')
    const [selectedIndicator2, setSelectedIndicator2] = React.useState('')
    const [isUpdatingData, setIsUpdatingData] = React.useState(false)
    const toast = React.useRef(null);

    //Handlers
    React.useEffect(() => {
        fetchData();
        const loggedInUser = localStorage.getItem("user");
        if (loggedInUser) {
            const foundUser = JSON.parse(loggedInUser);
            setUser(foundUser);
        }
    }, []);

    const handleIndicator1TypeChange = (e) => {
        console.clear()
        setSelectedIndicator1(indicator1[e.target.value])
        setSelectedIndicator3([])
        setIndicator3(["Selecione..."])
    }

    const handleIndicator2TypeChange = (e) => {
        console.clear()
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
        let indicators = selectedIndicator3
        indicators.push(indicator3[e.target.value])
        setSelectedIndicator3(indicators)
    }

    const handleLogin = (e) => {
        if (username.toLocaleLowerCase() === userKpiDigitalTemp.name.toLocaleLowerCase() && password === userKpiDigitalTemp.pass) {
            setUser({ name: username, pass: password });
            localStorage.setItem('user', JSON.stringify({ name: username }));
        }
    }

    const handleLogout = (e) => {
        setUser({});
        setUsername("");
        setPassword("");
        localStorage.clear();
        window.location.reload(false);
    };

    const fetchDataLocal = () => {
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
        }).catch(err => {
            // what now?
            console.log(err);
        });

        api.getSearaBaseRacLine().then((response) => {
            setResponseDataLineChart(response.data)
            setIsUpdatingData(false)
            // showSuccess('Database updated!')
        }).catch(err => {
            // what now?
            console.log(err);
            showError('Network Error', 'Could not fetch data')
        });
    };

    const showSuccess = (errorMessage, detailMessage) => {
        toast.current.show({severity: 'success', summary: errorMessage, detail: detailMessage});
    }

    const showError = (errorMessage, detailMessage) => {
        toast.current.show({severity: 'error', summary: errorMessage, detail: detailMessage, life: 6000});
    }

    /* Local Componentes */
    const Login = () => {
        return (
            <div className="global-container">
                <div className="card login-form">
                    <Card title="Bem vindo" subTitle="faça o login para acessar o sistema" className="card-body" footer={loginfooter} >
                        <div className="pt-4 p-field p-grid">
                            <span className="p-float-label">
                                <InputText id="username" style={{ width: '100%' }} value={username} onChange={(e) => setUsername(e.target.value)} />
                                <label htmlFor="username">Usuário</label>
                            </span>
                        </div>
                        <div className="pt-4 p-field p-grid">
                            <span className="p-float-label">
                                <Password value={password} style={{ width: '100%' }} onChange={(e) => setPassword(e.target.value)} feedback={false} toggleMask />
                                <label htmlFor="in">Senha</label>
                            </span>
                        </div>
                    </Card>
                </div>
            </div>
        )
    }

    const UpdatingDatabase = () => {
        return (
            <div>
                <h1 className={'h2'}>
                    Updating database
                    <br />
                    <small>this may take a while</small>
                    <br />
                </h1>
                <ProgressBar mode="indeterminate" style={{ height: '16px' }}></ProgressBar>
            </div>
        )
    }

    // Se nao esta logado exibe tela de login:
    if (!user) {
        return (<Login />)
    }

    // Se esta logado exibe tela do dashboard:
    return (
        <Container fluid>

            <NavbarMobile username={user.name} handleLogout={handleLogout} />
            <NavbarDesktop username={user.name} handleLogout={handleLogout} />
            <SidebarDesktop />
            <Toast ref={toast} position="bottom-right"></Toast>

            <div className="main-content">
                <Row>
                    <Col>
                        {isUpdatingData ? (<UpdatingDatabase />) : (
                            <div>
                                <h1 className={'h2'}>
                                    Dashboard
                                    <br />
                                    <small>Bootstrap template, demonstrating a set of Primereact Charts</small>
                                </h1>
                                <div className="btn-toolbar mb-2 mb-md-0">
                                    <div className="btn-group mr-2">
                                        <button className="btn btn-sm btn-outline-secondary" onClick={fetchData}>Reload data</button>
                                        <button className="btn btn-sm btn-outline-secondary" disabled>Share</button>
                                        <button className="btn btn-sm btn-outline-secondary" disabled>Export</button>
                                    </div>
                                    <button className="btn btn-sm btn-outline-secondary dropdown-toggle" disabled>
                                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="feather feather-calendar"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect><line x1="16" y1="2" x2="16" y2="6"></line><line x1="8" y1="2" x2="8" y2="6"></line><line x1="3" y1="10" x2="21" y2="10"></line></svg>
                                            This week
                                        </button>
                                </div>
                            </div>
                        )}
                    </Col>
                </Row>
                <hr></hr>

                {/* Drop down com indicadores */}
                {isUpdatingData ? (<Row><LoadingSkeletonSquare /></Row>) : (
                    <Row>
                        <Col lg={4}>
                            <Card className="p-md-12">
                                <h1 className="h2">
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
                                <h1 className="h2">
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
                                <h1 className="h2">
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
                )}

                {/* Botão aplicar */}
                {isUpdatingData ? (<div> </div>) : (
                    <Row style={{ paddingRight: '15px', paddingLeft: '15px' }}>
                        <button className="btn btn-sm btn-secondary" style={{ width: '100%' }} onClick={fetchDataLocal}>Apply</button>
                    </Row>
                )}

                {/* Graficos */}
                <Row>
                    <Col>
                        {isUpdatingData ? (<LoadingSkeletonCard />) : (
                            <Card title="Bar Chart" subTitle="Lorem ipsum dolor" className="mt-5" >
                                <Chart type="bar" data={responseDataBarChart} options={lightOptions} />
                            </Card>
                        )}
                        {isUpdatingData ? (<LoadingSkeletonCard />) : (
                            <Card title="Line Chart" subTitle="Lorem ipsum dolor" className="mt-5" >
                                <Chart type="Line" data={responseDataLineChart} options={lightOptions} />
                            </Card>
                        )}
                    </Col>
                </Row>

            </div>
        </Container>
    )
}

export default App;
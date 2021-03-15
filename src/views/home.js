import React, { useState, useEffect } from 'react';
import { Chart } from 'primereact/chart';
import { Button } from 'primereact/button';
import { Card } from 'primereact/card';
import { InputText } from 'primereact/inputtext';
import { Password } from 'primereact/password';
import api from '../api/api'
import axios from 'axios';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { ColumnGroup } from 'primereact/columngroup';

import { Ripple } from 'primereact/ripple';
import { Dropdown } from 'primereact/dropdown';

import classNames from 'classnames';


import 'react-pro-sidebar/dist/css/styles.css';
import '../index.css';
import '../css/sidebar-desktop.css';
import '../css/login.css';
import '../css/charts.css';
import 'primereact/resources/themes/saga-blue/theme.css'
import 'primereact/resources/primereact.min.css'
import 'primeicons/primeicons.css'

import { ProgressBar } from 'primereact/progressbar';
import { months, colorsBars, lightOptions } from '../domain/constants';
import {
    SetDateInJsonArrayToQueryOverObjects,
    SetParamsToQuery,
    AddLineMockData,
    AddDataByFilters,
    GetIndicators
} from '../domain/kpiservice';


import { LoadingSkeletonSquare, LoadingSkeletonCard } from '../components/skeletons';

var cors = require('cors'); // Already done “npm i cors --save-dev”

function Home() {

    let [responseDataLineChart, setResponseDataLineChart] = React.useState({})
    let [responseDataBarChart, setResponseDataBarChart] = React.useState({})

    const [crudeJsonResponseDataBarChart, setCrudeJsonResponseDataBarChart] = React.useState()
    const [indicator1, setIndicator1] = React.useState(["Select..."])
    const [indicator2, setIndicator2] = React.useState(["Select..."])
    const [indicator3, setIndicator3] = React.useState(["Select..."])

    const [indicator4, setIndicator4] = React.useState(["Select..."])
    const [indicator5, setIndicator5] = React.useState(["Select..."])
    const [indicator6, setIndicator6] = React.useState(["Select..."])

    const AddIndicator1 = indicator1.map(Add => Add)
    const AddIndicator2 = indicator2.map(Add => Add)
    const AddIndicator3 = indicator3.map(Add => Add)

    const AddIndicator4 = indicator4.map(Add => Add)
    const AddIndicator5 = indicator5.map(Add => Add)
    const AddIndicator6 = indicator6.map(Add => Add)

    const [selectedIndicator3, setSelectedIndicator3] = React.useState([])
    const [selectedIndicator1, setSelectedIndicator1] = React.useState('')
    const [selectedIndicator2, setSelectedIndicator2] = React.useState('')

    const [selectedIndicator4, setSelectedIndicator4] = React.useState([])
    const [selectedIndicator5, setSelectedIndicator5] = React.useState('')
    const [selectedIndicator6, setSelectedIndicator6] = React.useState('')

    const [isUpdatingData, setIsUpdatingData] = React.useState(false)
    const toast = React.useRef(null);

    //Handlers
    React.useEffect(() => {
        fetchData();
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
        setIndicator3(yaxis.filter(r => r.name !== "").map(r => r.name))
    }

    const handleIndicator3TypeChange = (e) => {
        console.clear()
        let indicators = selectedIndicator3
        indicators.push(indicator3[e.target.value])
        setSelectedIndicator3(indicators)
    }

    const handleCheckboxChangeIndicator3 = event => {
        console.clear()
        let indicators = selectedIndicator3
        if (event.target.checked) {
            indicators.push(event.target.value)
        }
        else {
            const index = indicators.indexOf(event.target.value)
            if (index > -1) {
                indicators.splice(index, 1)
            }
        }
        setSelectedIndicator3(indicators)
        aplicar();
    };


    const handleIndicator4TypeChange = (e) => {
        console.clear()
        setSelectedIndicator4(indicator1[e.target.value])
        setSelectedIndicator6([])
        setIndicator6(["Selecione..."])
    }

    const handleIndicator5TypeChange = (e) => {
        console.clear()
        setSelectedIndicator5(indicator2[e.target.value])
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
        let yaxis = Array.from(groupBy(json, x => x[indicator5[e.target.value]]), ([name, value]) => ({ name }));
        setSelectedIndicator6([])
        setIndicator6(yaxis.filter(r => r.name !== "").map(r => r.name))
    }

    const handleIndicator6TypeChange = (e) => {
        console.clear()
        let indicators = selectedIndicator6
        indicators.push(indicator6[e.target.value])
        setSelectedIndicator6(indicators)
    }

    const handleCheckboxChangeIndicator6 = event => {
        console.clear()
        let indicators = selectedIndicator6
        if (event.target.checked) {
            indicators.push(event.target.value)
        }
        else {
            const index = indicators.indexOf(event.target.value)
            if (index > -1) {
                indicators.splice(index, 1)
            }
        }
        setSelectedIndicator6(indicators)
        aplicar();
    };


    const somaX = function (vetor, name, campoName, valor) {
        let soma = 0
        vetor.value.forEach((element, i) => {
            if (element.[campoName] == name)
                soma += parseInt(element.[valor])
        });
        return soma

    }

    const fetchDataLocal = () => {
        //debugger
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

            xaxis.sort(function (a, b) {
                return parseFloat(a.name) - parseFloat(b.name);
            });

            xaxis.forEach(x => {


                x['yaxis'] = Array.from(groupBy(x.value, x => x[selectedIndicator2]), ([name, value]) => ({ name, quantidade: somaX(x, name, selectedIndicator2, "Quant") }));
            })

            let series = []
            yaxis.forEach((y, index) => {
                let dataset = xaxis.map(xx => {
                    let yaxysvalue = xx.yaxis.filter(r => r.name === y.name);
                    if (yaxysvalue.length)
                        return yaxysvalue[0].quantidade

                    return 0
                })

                let cor = colorsBars[Math.floor(Math.random() * colorsBars.length)]

                let serie = {
                    type: "line",
                    label: y.name,
                    backgroundColor: cor,
                    fill: false,
                    borderColor: cor,
                    borderWidth: 2,
                    data: dataset,
                }
                series.push(serie)
            })

            let seriesAdd = []
            if (selectedIndicator3.length == 0) {
                series.filter(s => s.label != null).forEach(element => {
                    seriesAdd.push(element)
                });
            } else {
                selectedIndicator3.forEach(indicator => {
                    series.filter(s => s.label === indicator).forEach(element => {
                        seriesAdd.push(element)
                    });
                });
            }

            const dashboardData = {
                labels: xaxis.map(r => r.name),
                datasets: seriesAdd,
                indicators
            };

            setResponseDataBarChart(dashboardData)
            setIsUpdatingData(false)
        }
    }

    const fetchDataLocalII = () => {

        if (selectedIndicator4 !== "" && selectedIndicator5 !== "" && selectedIndicator6 !== "") {
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

            let xaxis = Array.from(groupBy(json, x => x[selectedIndicator4]), ([name, value]) => ({ name, value }));
            let yaxis = Array.from(groupBy(json, x => x[selectedIndicator5]), ([name, value]) => ({ name }));

            xaxis.sort(function (a, b) {
                return parseFloat(a.name) - parseFloat(b.name);
            });

            xaxis.forEach(x => {

                x['yaxis'] = Array.from(groupBy(x.value, x => x[selectedIndicator5]), ([name, value]) => ({ name, quantidade: somaX(x, name, selectedIndicator5, "Quant") }));
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
            if (selectedIndicator6.length == 0) {
                series.filter(s => s.label != null).forEach(element => {
                    seriesAdd.push(element)
                });
            } else {
                selectedIndicator6.forEach(indicator => {
                    series.filter(s => s.label === indicator).forEach(element => {
                        seriesAdd.push(element)
                    });
                });
            }

            const dashboardData = {
                labels: xaxis.map(r => r.name),
                datasets: seriesAdd,
                indicators
            };

            setResponseDataLineChart(dashboardData)
            setIsUpdatingData(false)
        }
    }

    const DataTableColGroupDemo = () => {

        if (!crudeJsonResponseDataBarChart) return;

        debugger

        let json = []

        for (let i = 0; i < 100; i++) {
            json.push(crudeJsonResponseDataBarChart[i])
        }

        const sales = json

        return (
            <div>
                <div className="card">
                    <DataTable value={sales} sortMode="multiple">
                        <Column field="ANO" header="ANO" sortable filter filterPlaceholder="Filtro ANO"></Column>
                        <Column field="MES" header="MES" sortable filter filterPlaceholder="Filtro MES"></Column>
                        <Column field="ANO-MES" header="ANO-MES" sortable filter filterPlaceholder="Filtro ANO-MES"></Column>
                        <Column field="Filial" header="Filial" sortable filter filterPlaceholder="Filtro Filial"></Column>
                        <Column field="Negócio Planilha" header="Negócio" sortable filter filterPlaceholder="Filtro Negócio"></Column>
                        <Column field="Quant" header="Quantidade de Reclamações" sortable filter filterPlaceholder="Filtro Quantidade"></Column>
                    </DataTable>
                </div>
            </div>
        );

        //////////////////////////////////////////
    }

    function aplicar() {
        fetchDataLocalII()
        fetchDataLocal()
    }

    const fetchData = () => {

        setIsUpdatingData(true)

        //teste Gabriel
        let parametros = ['20210101', 'gabriel']

        api.getSearaBaseRacBar(parametros).then((response) => {
            // Do whatever you want to transform the data
            //debugger



            let json = JSON.parse(response.data)

            let datasets = [];
            let indicators = Object.keys(json[0]).map(key => key);

            //AddItensToJsonArray(json, 100000, "bar")
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
            setIndicator4(dashboardData.indicators)
            setIndicator5(dashboardData.indicators)
            setIndicator6(dashboardData.indicators)

            setIsUpdatingData(false)

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
        toast.current.show({ severity: 'success', summary: errorMessage, detail: detailMessage });
    }

    const showError = (errorMessage, detailMessage) => {
        toast.current.show({ severity: 'error', summary: errorMessage, detail: detailMessage, life: 6000 });
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

    // Se esta logado exibe tela do dashboard:
    return (
        <div>
            <Row>
                <Col lg={3}>
                    {isUpdatingData ? (<UpdatingDatabase />) : (
                        <div>
                            <h1 className={'h2'}>
                                KPI - RCA
                                    <br />
                                <small>Descrição do KPI</small>
                            </h1>
                            <div className="btn-toolbar mb-2 mb-md-0">
                                <div className="btn-group mr-2">
                                    <button className="btn btn-sm btn-outline-secondary" onClick={fetchData}>Atualizar</button>
                                </div>

                            </div>
                        </div>
                    )}
                </Col>
            </Row>

            <hr></hr>

            {/* Botão aplicar */}
            {isUpdatingData ? (<div> </div>) : (
                <Row style={{ paddingRight: '15px', paddingLeft: '15px' }}>
                    <button className="btn btn-sm btn-secondary" style={{ width: '100%' }} onClick={aplicar}>Aplicar</button>
                </Row>
            )}

            {/* Drop down com indicadores */}
            {isUpdatingData ? (<Row><LoadingSkeletonSquare /></Row>) : (
                <Row>
                    <Col lg={2}>
                        <Card className="p-md-12">
                            <h1 className="h6">
                                Categoria
                                        <br />
                                <small>Eixo X</small>
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
                    <Col lg={2}>
                        <Card className="p-md-12">
                            <h1 className="h6">
                                Séries
                                        <br />
                                <small>Séries</small>
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
                    <Col lg={2}>
                        <Card className="h6" style={{ "overflow-y": "auto", "max-height": "230px" }}>
                            {
                                AddIndicator3.map(item => (
                                    <div className="custom-control custom-checkbox " >
                                        <input type="checkbox" className="custom-control-input" id={item} value={item} onChange={e => handleCheckboxChangeIndicator3(e)} />
                                        <label className="custom-control-label" htmlFor={item}>{item}</label>
                                    </div>
                                ))
                            }
                        </Card>
                        <Card>
                            <h1 className="h6">
                                Agrupamento
                                        <br />
                                <small>Série</small>
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



                    <Col lg={2}>
                        <Card className="p-md-12">
                            <h1 className="h6">
                                Categoria
                                        <br />
                                <small>Eixo X</small>
                                <br />
                                <select onChange={e => handleIndicator4TypeChange(e)} className="browser-default custom-select" >
                                    {
                                        AddIndicator4.map((address, key) =>
                                            <option key={key} value={key}>{address}</option>)
                                    }
                                </select >
                            </h1>
                        </Card>
                    </Col>
                    <Col lg={2}>
                        <Card className="p-md-12">
                            <h1 className="h6">
                                Séries
                                        <br />
                                <small>Séries</small>
                                <br />
                                <select onChange={e => handleIndicator5TypeChange(e)} className="browser-default custom-select" >
                                    {
                                        AddIndicator5.map((address, key) =>
                                            <option key={key} value={key}>{address}</option>)
                                    }
                                </select >
                            </h1>
                        </Card>
                    </Col>
                    <Col lg={2}>
                        <Card className="h6" style={{ "overflow-y": "auto", "max-height": "230px" }}>
                            {
                                AddIndicator6.map(item => (
                                    <div className="custom-control custom-checkbox " >
                                        <input type="checkbox" className="custom-control-input" id={item} value={item} onChange={e => handleCheckboxChangeIndicator6(e)} />
                                        <label className="custom-control-label" htmlFor={item}>{item}</label>
                                    </div>
                                ))
                            }
                        </Card>
                        <Card>
                            <h1 className="h6">
                                Agrupamento
                                        <br />
                                <small>Série</small>
                                <br />
                                <select onChange={e => handleIndicator6TypeChange(e)} className="browser-default custom-select" >
                                    {
                                        AddIndicator6.map((address, key) =>
                                            <option key={key} value={key}>{address}</option>)
                                    }
                                </select >
                            </h1>
                        </Card>
                    </Col>


                </Row>
            )}

            {/* Graficos */}
            <Row>
                <Col>
                    {isUpdatingData ? (<LoadingSkeletonCard />) : (
                        <Card title="RAC" subTitle="Indicador de Reclamações" className="mt-5">
                            <Chart type="bar" data={responseDataBarChart} options={lightOptions} />
                        </Card>
                    )}
                </Col>
                <Col>
                    {isUpdatingData ? (<LoadingSkeletonCard />) : (
                        <Card title="RAC" subTitle="Indicador de Reclamações II" className="mt-5" >
                            <Chart type="Line" data={responseDataLineChart} options={lightOptions} />
                        </Card>
                    )}
                </Col>
            </Row>
            {/* Tabelas */}
            {/* {DataTableColGroupDemo()} */}
            {isUpdatingData ? (<LoadingSkeletonCard />) : (
                DataTableColGroupDemo()
            )}


        </div>
    )
}

export default Home;
import React, { useState, useEffect, useRef } from 'react';

import { Chart } from 'primereact/chart';
import ChartDataLabels from 'chartjs-plugin-datalabels';
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

import Pdf from "react-to-pdf";
const ref = React.createRef();
const options = {
    orientation: 'retrait',
    unit: 'px',
    format: [970,4000]
};

var cors = require('cors'); // Already done “npm i cors --save-dev”

function Home() {

    
    const [isUpdatingData, setIsUpdatingData] = React.useState(false)
    const toast = React.useRef(null);

    //chamadas
    const [TableRacME, setTableRacME] = React.useState()  

    const [GraficoRAC_Total, setGraficoRAC_Total] = React.useState()   
    const [GraficoRAC_Aves, setGraficoRAC_Aves] = React.useState() 
    const [GraficoRAC_Suinos, setGraficoRAC_Suinos] = React.useState() 
    const [GraficoRAC_Preparados, setGraficoRAC_Preparados] = React.useState() 
    const [GraficoRAC_Outros, setGraficoRAC_Outros] = React.useState() 
    const [GraficoNNCMP_Total, setGraficoNNCMP_Total] = React.useState() 
    const [GraficoNNCLog_Total, setGraficoNNCLog_Total] = React.useState() 
    const [GraficoCE_Total, setGraficoCE_Total] = React.useState() 
    
    let [responseGraficoRAC_Total, setresponseGraficoRAC_Total] = React.useState({})
    let [responseGraficoRAC_Aves, setresponseGraficoRAC_Aves] = React.useState({})
    let [responseGraficoRAC_Suinos, setresponseGraficoRAC_Suinos] = React.useState({})
    let [responseGraficoRAC_Preparados, setresponseGraficoRAC_Preparados] = React.useState({})
    let [responseGraficoRAC_Outros, setresponseGraficoRAC_Outros] = React.useState({})
    let [responseGraficoNNCMP_Total, setresponseGraficoNNCMP_Total] = React.useState({})
    let [responseGraficoNNCLog_Total, setresponseGraficoNNCLog_Total] = React.useState({})
    let [responseGraficoCE_Total, setresponseGraficoCE_Total] = React.useState({})

    //Handlers
    React.useEffect(() => {
        //debugger
        fetchData(GraficoRAC_Total, "GraficoRAC_Total");
        fetchData(GraficoRAC_Aves, "GraficoRAC_Aves");
        fetchData(GraficoRAC_Suinos, "GraficoRAC_Suinos");
        fetchData(GraficoRAC_Preparados, "GraficoRAC_Preparados");
        fetchData(GraficoRAC_Outros, "GraficoRAC_Outros");
        fetchData(GraficoNNCMP_Total, "GraficoNNCMP_Total");
        fetchData(GraficoNNCLog_Total, "GraficoNNCLog_Total");
        fetchData(GraficoCE_Total, "GraficoCE_Total");
    }, []);

    const GerarGrafico = (objeto, numGrafico) => {
        ////debugger
        //if (selectedIndicator1 !== "" && selectedIndicator2 !== "" && selectedIndicator3 !== "") {
            ////debugger
            setIsUpdatingData(true)
            let json = objeto; //GraficoRAC_Total , 2, 3.....
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

            // let xaxis = Array.from(groupBy(json, x => x[selectedIndicator1]), ([name, value]) => ({ name, value }));
            // let yaxis = Array.from(groupBy(json, x => x[selectedIndicator2]), ([name, value]) => ({ name }));

            let xaxis = Array.from(groupBy(json, x => x["Periodo"]), ([name, value]) => ({ name, value }));
            let yaxis = [{name:'Evolutivo 2020'},{name:'Evolutivo 2021'},{name:'Evolutivo Meta'},{name:'Meta'},{name:'2019'},{name:'2020'},{name: '2021'}];

            // xaxis.sort(function (a, b) {
            //     return parseFloat(a.name) - parseFloat(b.name);
            // });

            xaxis.forEach(x => {
                // x['yaxis'] = Array.from(groupBy(x.value, x => x[selectedIndicator2]), ([name, value]) => ({ name, quantidade: somaX(x, name, selectedIndicator2, "Quant") }));
                if (x.name == "2019"){
                    x['yaxis'] = [{name: "2019", value: x.value[0].Valor}]
                }else if (x.name == "2020"){
                    x['yaxis'] = [{name: "2020", value: x.value[0].Valor}]
                }else if(x.name == "Meta"){
                    x['yaxis'] = [{name: "Meta", value: x.value[0].Valor}]
                }else if(x.name == "2021"){
                    x['yaxis'] = [{name: "2021", value: x.value[0].Valor}]
                }else{
                    x['yaxis'] = [
                                    {name: "Evolutivo 2020", value: x.value[0].a2020},
                                    {name: "Evolutivo Meta", value: x.value[0].aMeta},
                                    {name: "Evolutivo 2021", value: x.value[0].a2021}
                                ]
                }
            })

            let series = []
            yaxis.forEach((y, index) => {
                let dataset = xaxis.map(xx => {
                    let yaxysvalue = xx.yaxis.filter(r => r.name === y.name);
                    if (yaxysvalue.length)
                        return yaxysvalue[0].value

                    return null
                })

                //let cor = colorsBars[Math.floor(Math.random() * colorsBars.length)]

                let tipo = 'line'
                let cor = '#bfbfbf'
                let corLabel = '#bfbfbf'
                let yAx = "B"
                let varborderDash = [0,0]

                switch (y.name){

                    case "2019": 
                                    tipo = "bar"
                                    cor = "#bfbfbf"
                                    corLabel = "#bfbfbf"
                                    yAx = "A"
                                    break
                    case "2020": 
                                    tipo = "bar"
                                    cor = "#bfbfbf"
                                    corLabel = "#bfbfbf"
                                    yAx = "A"
                                    break
                    case "Meta": 
                                    tipo = "bar"
                                    cor = "rgb(245,156,0)"
                                    corLabel = "rgb(245,156,0)"
                                    yAx = "A"
                                    break
                    case "2021": 
                                    tipo = "bar"
                                    cor = "#cccccc"
                                    corLabel = "#cccccc"
                                    yAx = "A"
                                    break
                    case "Evolutivo 2020": 
                                    tipo = "line"
                                    cor = "rgb(166, 166, 166)"
                                    corLabel = "rgb(166, 166, 166)"
                                    varborderDash = [10,5]
                                    yAx = "B"
                                    break
                    case "Evolutivo Meta": 
                                    tipo = "line"
                                    cor = "rgb(245,156,0)"
                                    corLabel = "rgb(245,156,0)"
                                    yAx = "B"
                                    break
                    case "Evolutivo 2021": 
                                    tipo = "line"
                                    cor = "rgb(89,89,89)"
                                    corLabel = "rgb(89,89,89)"
                                    yAx = "B"
                                    break
                                 
                    default:
                                    break


                }

                let serie = {
                    type: tipo,
                    yAxisID: yAx,
                    label: y.name,
                    backgroundColor: cor,
                    fill: false,
                    borderColor: cor,
                    borderWidth: 2,
                    pointRadius: 5,
                    pointBackgroundColor: "transparent",
                    pointBorderColor: "transparent",
                    borderDash: varborderDash, 
                    data: dataset,
                    datalabels: {
                    
                        align: "top",
                        anchor: "end",
                        offset: 10,
                        padding: -2,
                        color: corLabel,
                        //clip: true,
                        font: {
                            size: "10",
                        },
                        
                    }
                     
                }
                series.push(serie)
            })

            let seriesAdd = []
            
                series.filter(s => s.label != null).forEach(element => {
                    seriesAdd.push(element)
                });
           

            const dashboardData = {
                labels: xaxis.map(r => r.name),
                datasets: seriesAdd,
                indicators
                
            };
            //debugger
            switch (numGrafico){
                case "GraficoRAC_Total":
                    setresponseGraficoRAC_Total(dashboardData)
                    break
                case "GraficoRAC_Aves":
                    setresponseGraficoRAC_Aves(dashboardData)
                    break
                case "GraficoRAC_Suinos":
                    setresponseGraficoRAC_Suinos(dashboardData)
                    break
                case "GraficoRAC_Preparados":
                    setresponseGraficoRAC_Preparados(dashboardData)
                    break
                case "GraficoRAC_Outros":
                    setresponseGraficoRAC_Outros(dashboardData)
                    break
                case "GraficoNNCMP_Total":
                    setresponseGraficoNNCMP_Total(dashboardData)
                    break
                case "GraficoNNCLog_Total":
                    setresponseGraficoNNCLog_Total(dashboardData)
                    break
                case "GraficoCE_Total":
                    setresponseGraficoCE_Total(dashboardData)
                    break
                default:
                    break

            }

            setIsUpdatingData(false)
    }

    const DataTableColGroupDemo = () => {

        if (!GraficoRAC_Total) return;

        ////debugger

        let json = []

        for (let i = 0; i < GraficoRAC_Total.length; i++) {
            json.push(GraficoRAC_Total[i])
        }

        const sales = json

        return (
            <div>
                <div className="card">
                    <DataTable value={sales} sortMode="multiple">
                        <Column field="Periodo" header="Período" sortable></Column>
                        <Column field="Valor" header="Nº RAC Histórico" sortable ></Column>
                        <Column field="a2020" header="Nº RAC 2020 Mensal" sortable></Column>
                        <Column field="aMeta" header="Nº RAC Meta Mensal" sortable></Column>
                        <Column field="a2021" header="Nº RAC 2021 Mensal" sortable></Column>
                    </DataTable>
                </div>
            </div>
        );

        //////////////////////////////////////////
    }

    const DataTableRACME = () => {

        if (!TableRacME) return;

        ////debugger

        let json = []

        for (let i = 0; i < TableRacME.length; i++) {
            json.push(TableRacME[i])
        }

        const sales = json

        return (
            <div>
                <div className="card">
                    <DataTable value={sales} sortMode="multiple">
                        <Column field="Unidade" header="Unidade"></Column>
                        <Column field="Tipo do Problema" header="Tipo do Problema"></Column>
                        <Column field="Manifestante" header="Manifestante"></Column>
                        <Column field="Nº RAC" header="Nº RAC"></Column>
                    </DataTable>
                </div>
            </div>
        );

        //////////////////////////////////////////
    }

    function aplicar() {
        //debugger
        GerarGrafico(GraficoRAC_Total, "GraficoRAC_Total")
        GerarGrafico(GraficoRAC_Aves, "GraficoRAC_Aves")
        GerarGrafico(GraficoRAC_Suinos, "GraficoRAC_Suinos")
        GerarGrafico(GraficoRAC_Preparados, "GraficoRAC_Preparados")
        GerarGrafico(GraficoRAC_Outros, "GraficoRAC_Outros")
        GerarGrafico(GraficoNNCMP_Total, "GraficoNNCMP_Total")
        GerarGrafico(GraficoNNCLog_Total, "GraficoNNCLog_Total")
        GerarGrafico(GraficoCE_Total, "GraficoCE_Total")
    }

    const fetchData = (objeto, numGrafico) => {

        setIsUpdatingData(true)

        let parm = " ";

        api.getSearaBaseRacME(parm).then((response) => {

            let json = JSON.parse(response.data)
            setTableRacME(json)
        })

        if(numGrafico == "GraficoRAC_Total"){
            //debugger
            let parametros = ['where 1=1']
            api.getSearaBaseRacCEBar2(parametros).then((response) => {
                // Do whatever you want to transform the data
                //debugger

                let json = JSON.parse(response.data)
                let datasets = [];
                let indicators = Object.keys(json[0]).map(key => key);

                //AddItensToJsonArray(json, 100000, "bar")
                //debugger
                setGraficoRAC_Total(json)

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

                setresponseGraficoRAC_Total(dashboardData)

                setIsUpdatingData(false)

                //GerarGrafico(GraficoRAC_Total, "GraficoRAC_Total")

            }).catch(err => {
                // what now?
                console.log(err);

            });
        }else if (numGrafico == "GraficoRAC_Aves"){
            //debugger
            let parametros = ['WHERE Negócio=\'AVES\'']
            api.getSearaBaseRacBar2(parametros).then((response) => {
                // Do whatever you want to transform the data
                //debugger

                let json = JSON.parse(response.data)
                let datasets = [];
                let indicators = Object.keys(json[0]).map(key => key);

                //AddItensToJsonArray(json, 100000, "bar")
                //debugger
                setGraficoRAC_Aves(json)
              
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

                setresponseGraficoRAC_Aves(dashboardData)

                setIsUpdatingData(false)

                //GerarGrafico(GraficoRAC_Aves, "GraficoRAC_Aves")

            }).catch(err => {
                // what now?
                console.log(err);

            });

        }else if (numGrafico == "GraficoRAC_Suinos"){
            //debugger
            let parametros = ['WHERE Negócio=\'SUÍ\'']
            api.getSearaBaseRacBar2(parametros).then((response) => {
                // Do whatever you want to transform the data
                //debugger

                let json = JSON.parse(response.data)
                let datasets = [];
                let indicators = Object.keys(json[0]).map(key => key);

                //AddItensToJsonArray(json, 100000, "bar")
                //debugger
                setGraficoRAC_Suinos(json)
              
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

                setresponseGraficoRAC_Suinos(dashboardData)

                setIsUpdatingData(false)

                //GerarGrafico(GraficoRAC_Aves, "GraficoRAC_Aves")

            }).catch(err => {
                // what now?
                console.log(err);

            });

        }else if (numGrafico == "GraficoRAC_Preparados"){
            //debugger
            let parametros = ['WHERE Negócio=\'Preparados\'']
            api.getSearaBaseRacBar2(parametros).then((response) => {
                // Do whatever you want to transform the data
                //debugger

                let json = JSON.parse(response.data)
                let datasets = [];
                let indicators = Object.keys(json[0]).map(key => key);

                //AddItensToJsonArray(json, 100000, "bar")
                //debugger
                setGraficoRAC_Preparados(json)
              
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

                setresponseGraficoRAC_Preparados(dashboardData)

                setIsUpdatingData(false)

                //GerarGrafico(GraficoRAC_Aves, "GraficoRAC_Aves")

            }).catch(err => {
                // what now?
                console.log(err);

            });

        }else if (numGrafico == "GraficoRAC_Outros"){
            //debugger
            let parametros = ['WHERE Negócio=\'OUTROS\'']
            api.getSearaBaseRacBar2(parametros).then((response) => {
                // Do whatever you want to transform the data
                //debugger

                let json = JSON.parse(response.data)
                let datasets = [];
                let indicators = Object.keys(json[0]).map(key => key);

                //AddItensToJsonArray(json, 100000, "bar")
                //debugger
                setGraficoRAC_Outros(json)
              
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

                setresponseGraficoRAC_Outros(dashboardData)

                setIsUpdatingData(false)

                //GerarGrafico(GraficoRAC_Aves, "GraficoRAC_Aves")

            }).catch(err => {
                // what now?
                console.log(err);

            });

        }else if (numGrafico == "GraficoNNCMP_Total"){
            //debugger
            let parametros = ['WHERE 1=1 ']
            api.getSearaBaseNCCMPCEBar2(parametros).then((response) => {
                // Do whatever you want to transform the data
                //debugger

                let json = JSON.parse(response.data)
                let datasets = [];
                let indicators = Object.keys(json[0]).map(key => key);

                //AddItensToJsonArray(json, 100000, "bar")
                //debugger
                setGraficoNNCMP_Total(json)
              
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

                setresponseGraficoNNCMP_Total(dashboardData)

                setIsUpdatingData(false)

                //GerarGrafico(GraficoRAC_Aves, "GraficoRAC_Aves")

            }).catch(err => {
                // what now?
                console.log(err);

            });

        }else if (numGrafico == "GraficoNNCLog_Total"){
            //debugger
            let parametros = ['WHERE 1=1 ']
            api.getSearaBaseNCCLogBar2(parametros).then((response) => {
                // Do whatever you want to transform the data
                //debugger

                let json = JSON.parse(response.data)
                let datasets = [];
                let indicators = Object.keys(json[0]).map(key => key);

                //AddItensToJsonArray(json, 100000, "bar")
                //debugger
                setGraficoNNCLog_Total(json)
              
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

                setresponseGraficoNNCLog_Total(dashboardData)

                setIsUpdatingData(false)

                //GerarGrafico(GraficoRAC_Aves, "GraficoRAC_Aves")

            }).catch(err => {
                // what now?
                console.log(err);

            });

        }else if (numGrafico == "GraficoCE_Total"){
            //debugger
            let parametros = ['WHERE    Negócio =\'AVES LEVELS\' ']
            api.getSearaBaseCEBar2(parametros).then((response) => {
                // Do whatever you want to transform the data
                //debugger

                let json = JSON.parse(response.data)
                let datasets = [];
                let indicators = Object.keys(json[0]).map(key => key);

                //AddItensToJsonArray(json, 100000, "bar")
                //debugger
                setGraficoCE_Total(json)
              
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

                setresponseGraficoCE_Total(dashboardData)

                setIsUpdatingData(false)

                //GerarGrafico(GraficoRAC_Aves, "GraficoRAC_Aves")

            }).catch(err => {
                // what now?
                console.log(err);

            });

        }

        
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
                    Atualizando a base
                    <br />
                    <small>Puxando dados da RAC</small>
                    <br />
                </h1>
                <ProgressBar mode="indeterminate" style={{ height: '16px' }}></ProgressBar>
            </div>
        )
    }

    // Se esta logado exibe tela do dashboard:
    return (
        // <div style="width: 1220px !important;">
        <div> 
            <Row>
                <Col lg={12}>
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

                                <Pdf targetRef={ref} filename="rac.pdf" options={options} x={1} scale={0.8}>
                                    {({toPdf}) => (
                                        <button onClick={toPdf}>Gerar PDF</button>
                                    )}
                                </Pdf>

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

            

            {/* Graficos */}
            <div className="pad10" ref={ref}  >
                <Row>
                    <Col className="mt-5 col-12 ">
                        <h1>Relatório de Atendimento ao Consumidor (RAC)</h1>
                    </Col>
                    
                </Row>
                <Row>
                    <Col>
                        {isUpdatingData ? (<LoadingSkeletonCard />) : (
                            <Card title="Total Habilitador" subTitle="" className="mt-5">
                                <Chart type="bar" data={responseGraficoCE_Total} options={lightOptions} />
                            </Card>
                        )}
                    </Col>
                    <Col>
                        
                        {isUpdatingData ? (<LoadingSkeletonCard />) : (
                            <Card title="Total RAC" subTitle="RA" className="mt-5">
                                <Chart type="bar" data={responseGraficoRAC_Total} options={lightOptions}/>
                            </Card>
                        )}
  
                    </Col>
                    
                </Row>
                <Row>
                    <Col>
                                
                    </Col>
                    <Col>
                        {isUpdatingData ? (<LoadingSkeletonCard />) : (
                            <Card title="Total NNC Matéria-Prima" subTitle="" className="mt-5">
                                <Chart type="bar" data={responseGraficoNNCMP_Total} options={lightOptions} />
                            </Card>
                        )}
                    </Col>
                </Row>
                
                <Row>
                    <Col>
                        {isUpdatingData ? (<LoadingSkeletonCard />) : (
                            <Card title="Aves" subTitle="RAC" className="mt-5">
                                <Chart type="bar" data={responseGraficoRAC_Aves} options={lightOptions} />
                            </Card>
                        )}
                    </Col>
                    <Col>
                        {isUpdatingData ? (<LoadingSkeletonCard />) : (
                            <Card title="Suínos" subTitle="RAC" className="mt-5">
                                <Chart type="bar" data={responseGraficoRAC_Suinos} options={lightOptions} />
                            </Card>
                        )}
                    </Col>
                    
                </Row>
                <Row>
                    <Col>
                        {isUpdatingData ? (<LoadingSkeletonCard />) : (
                            <Card title="Preparados" subTitle="RAC" className="mt-5">
                                <Chart type="bar" data={responseGraficoRAC_Preparados} options={lightOptions} />
                            </Card>
                        )}
                    </Col>
                    <Col>
                        {isUpdatingData ? (<LoadingSkeletonCard />) : (
                            <Card title="Outros" subTitle="RAC" className="mt-5">
                                <Chart type="bar" data={responseGraficoRAC_Outros} options={lightOptions} />
                            </Card>
                        )}
                    </Col>
                </Row>
                
                {/* mercado externo */}
                <Row>
                    <Col>
                        {isUpdatingData ? (<LoadingSkeletonCard />) : (
                            <Card title="Corpos estranhos" subTitle="Corpo Estranho" className="mt-5">
                                <Chart type="bar" data={responseGraficoCE_Total} options={lightOptions} />
                            </Card>
                        )}
                    </Col>
                    <Col className="mt-5">
                        {isUpdatingData ? (<LoadingSkeletonCard />) : (
                            
                                DataTableRACME()
                            
                        )}
                    </Col>

                </Row>  

                {/* mercado interno */}
                <Row>
                    <Col>
                        {isUpdatingData ? (<LoadingSkeletonCard />) : (
                            <Card title="NNC Matérial Prima" subTitle="Total" className="mt-5">
                                <Chart type="bar" data={responseGraficoNNCMP_Total} options={lightOptions} />
                            </Card>
                        )}
                    </Col>
                    <Col>
                        
                    </Col>

                </Row>   

                {/* atendimento comercial */}
                <Row>
                    <Col>
                        {isUpdatingData ? (<LoadingSkeletonCard />) : (
                            <Card title="NNC Log" subTitle="Total" className="mt-5">
                                <Chart type="bar" data={responseGraficoNNCLog_Total} options={lightOptions} />
                            </Card>
                        )}
                    </Col>
                    <Col>
                        
                        
                    </Col>

                </Row>  

                        
            </div>

        </div>
    )
}

export default Home;
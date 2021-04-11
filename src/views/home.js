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

    var numeroChamados = []

    function percorreNumeroChamados(){
        
        for(var i=0; i < numeroChamados.length; i++){
            if(numeroChamados[i] == false){
                return false
            }
        }
        return true
    }



    //chamadas
    let [responseGrafico, setresponseGrafico] = React.useState({})
    let [Grafico_, setGrafico_] = React.useState()

    let [responseGrafico2, setresponseGrafico2] = React.useState({})
    let [Grafico_2, setGrafico_2] = React.useState()

    let [responseGrafico3, setresponseGrafico3] = React.useState({})
    let [Grafico_3, setGrafico_3] = React.useState()

    let [responseGrafico4, setresponseGrafico4] = React.useState({})
    let [Grafico_4, setGrafico_4] = React.useState()

    //Handlers
    React.useEffect(() => {
        chamarAPI("racCE",Grafico_, "Grafico_", [' where 1=1 '], setGrafico_, setresponseGrafico, 0)
        chamarAPI("rac",Grafico_2, "Grafico_2", [' where 1=1 '], setGrafico_2, setresponseGrafico2, 1)
        chamarAPI("NCCMP",Grafico_3, "Grafico_3", [' where 1=1 '], setGrafico_3, setresponseGrafico3, 2)
        chamarAPI("NCCLOG",Grafico_4, "Grafico_4", [' where 1=1 '], setGrafico_4, setresponseGrafico4, 3)

        numeroChamados = [false,false,false,false]

    }, []);

    function aplicar() {
        setTimeout(function(){
            GerarGraficoHistorico(Grafico_, setresponseGrafico)
            GerarGraficoHistorico(Grafico_2, setresponseGrafico2)
            GerarGraficoHistorico(Grafico_3, setresponseGrafico3)
            GerarGraficoHistorico(Grafico_4, setresponseGrafico4)
        }, 0)
        
    }

    const GerarGraficoHistorico = (objeto, funcao) => {
            
            setIsUpdatingData(true)
            let json = objeto; 
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

            let xaxis = Array.from(groupBy(json, x => x["Periodo"]), ([name, value]) => ({ name, value }));
            let yaxis = [{name:'Evolutivo 2020'},{name:'Evolutivo 2021'},{name:'Evolutivo Meta'},{name:'Meta'},{name:'2019'},{name:'2020'},{name: '2021'}];

            xaxis.forEach(x => {
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

            if(typeof(funcao)=="function"){
                funcao(dashboardData);
            }

            setIsUpdatingData(false)
    }

    

    function chamarAPI(apiNome, objeto, numGrafico, parametros, funcao, funcaoRetorno, numeroChamado){

        switch(apiNome){
            case 'racCE':
                
                api.getSearaBaseRacCE(parametros).then((response) => {
                    buscarDados(response, funcao, objeto, funcaoRetorno)
                    numeroChamados[numeroChamado] = true;
                    
                    if(percorreNumeroChamados()){
                        //aplicar()
                    }
                    return response
                }).catch(err => {
                    // what now?
                    console.log(err);       
                });
                break
            case 'rac':
                
                api.getSearaBaseRac(parametros).then((response) => {
                    buscarDados(response, funcao, objeto, funcaoRetorno)
                    numeroChamados[numeroChamado] = true;
                    
                    if(percorreNumeroChamados()){
                        //aplicar()
                    }
                    return response
                }).catch(err => {
                    // what now?
                    console.log(err);       
                });
                break
            case 'NCCMP':
                
                api.getSearaBaseNCCMP(parametros).then((response) => {
                    buscarDados(response, funcao, objeto, funcaoRetorno)
                    numeroChamados[numeroChamado] = true;
                    
                    if(percorreNumeroChamados()){
                        //aplicar()
                    }
                    return response
                }).catch(err => {
                    // what now?
                    console.log(err);       
                });
                break
            case 'NCCLOG':
                
                    api.getSearaBaseNCCLOG(parametros).then((response) => {
                        buscarDados(response, funcao, objeto, funcaoRetorno)
                        numeroChamados[numeroChamado] = true;
                        
                        if(percorreNumeroChamados()){
                            //aplicar()
                        }
                        return response
                    }).catch(err => {
                        // what now?
                        console.log(err);       
                    });
                    break  
            default:
                break    
            
        }

        return
    }

    const buscarDados = (response, funcao, graficoRetorno, funcaoRetorno ) => {
  
        setIsUpdatingData(true)

        let json = JSON.parse(response.data)
        let datasets = [];
        let indicators = Object.keys(json[0]).map(key => key);

        if(typeof(funcao)=="function"){
            funcao(json);
        }

        setIsUpdatingData(false)

        //GerarGraficoHistorico(graficoRetorno, funcaoRetorno)
  
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
                                {/* <div className="btn-group mr-2">
                                    <button className="btn btn-sm btn-outline-secondary" onClick={buscarDados}>Atualizar</button>
                                </div>   */}

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
                            <Card title="Total RAC" subTitle="RA" className="mt-5">
                                <Chart type="bar" data={responseGrafico} options={lightOptions}/>
                            </Card>
                        )}
                    </Col>
                    <Col>
                        {isUpdatingData ? (<LoadingSkeletonCard />) : (
                            <Card title="Total RAC CE" subTitle="RA" className="mt-5">
                                <Chart type="bar" data={responseGrafico2} options={lightOptions}/>
                            </Card>
                        )}
                    </Col>
                    
                </Row>

                <Row>
                    <Col>
                        {isUpdatingData ? (<LoadingSkeletonCard />) : (
                            <Card title="Total RAC" subTitle="RA" className="mt-5">
                                <Chart type="bar" data={responseGrafico3} options={lightOptions}/>
                            </Card>
                        )}
                    </Col>
                    <Col>
                        {isUpdatingData ? (<LoadingSkeletonCard />) : (
                            <Card title="Total RAC CE" subTitle="RA" className="mt-5">
                                <Chart type="bar" data={responseGrafico4} options={lightOptions}/>
                            </Card>
                        )}
                    </Col>
                    
                </Row>
                         
            </div>

        </div>
    )
}

export default Home;